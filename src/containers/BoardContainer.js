import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Board from '@/components/Board'
import { fetchData, asyncFetch, throttle } from '@/libs/base'
import update from 'react-addons-update'
import NewCard from '@/components/NewCard'
import EditCard from '@/components/EditCard'
import { Route } from 'react-router-dom'

class BoardContainer extends Component {
  static propTypes = {
    match: PropTypes.object
  }
  constructor () {
    super(...arguments)
    this.state = {
      cards: []
    }
    this.addCard = this::this.addCard
    this.updateCard = this::this.updateCard
    this.deleteCard = this::this.deleteCard
    this.addTask = this::this.addTask
    this.deleteTask = this::this.deleteTask
    this.toggleTask = this::this.toggleTask
    this.updateCardStatus = throttle(this::this.updateCardStatus)
    this.updateCardPosition = throttle(this::this.updateCardPosition, 500)
    this.persistCardDrag = this::this.persistCardDrag
  }

  async componentWillMount () {
    const d = await fetchData('get /api/cards')
    if (d) {
      this.setState({
        cards: d
      })
    }
  }

  addTask (cardId, taskName) {
    const prevState = this.state
    const { cards } = this.state
    const cardIndex = cards.findIndex((v) => v.id === cardId)
    let newTask = {
      id: Date.now(),
      name: taskName,
      done: false
    }
    const nextState = update(cards, {
      [cardIndex]: {
        tasks: { $push: [newTask] }
      }
    })
    this.setState({ cards: nextState })
    asyncFetch(
      `post /api/cards/${cardId}/tasks/`,
      newTask,
      (d) => {
        newTask.id = d.id
        this.setState({ cards: nextState })
      },
      () => this.setState(prevState)
    )
  }
  async deleteTask (cardId, taskId, taskIndex) {
    const prevState = this.state
    const { cards } = this.state
    const cardIndex = cards.findIndex((v) => v.id === cardId)
    const nextState = update(cards, {
      [cardIndex]: {
        tasks: { $splice: [[taskIndex, 1]] }
      }
    })
    this.setState({ cards: nextState })
    asyncFetch(
      `delete /api/cards/${cardId}/tasks/${taskId}`,
      null,
      () => this.setState(prevState)
    )
  }
  async toggleTask (cardId, taskId, taskIndex) {
    const prevState = this.state
    const { cards } = this.state
    const cardIndex = cards.findIndex((v) => v.id === cardId)
    let done
    const nextState = update(cards, {
      [cardIndex]: {
        tasks: {
          [taskIndex]: {
            done: { $apply: (v) => (done = !v) }
          }
        }
      }
    })
    this.setState({ cards: nextState })
    asyncFetch(
      `put /api/cards/${cardId}/tasks/${taskId}`,
      { done },
      null,
      () => this.setState(prevState)
    )
  }

  updateCardStatus (cardId, listId) {
    const { cards } = this.state
    const cardIndex = cards.findIndex((v) => v.id === cardId)
    const card = cards[cardIndex]
    if (card.status !== listId) {
      this.setState(update(this.state, {
        cards: {
          [cardIndex]: {
            status: { $set: listId }
          }
        }
      }))
    }
  }
  updateCardPosition (cardId, afterId) {
    if (cardId !== afterId) {
      const { cards } = this.state
      const cardIndex = cards.findIndex((v) => v.id === cardId)
      const card = cards[cardIndex]
      const afterIndex = cards.findIndex((v) => v.id === afterId)
      this.setState(update(this.state, {
        cards: {
          $splice: [
            [cardIndex, 1],
            [afterIndex, 0, card]
          ]
        }
      }))
    }
  }

  persistCardDrag (cardId, status) {
    const { cards } = this.state
    const cardIndex = cards.findIndex((v) => v.id === cardId)
    const card = cards[cardIndex]
    asyncFetch(
      `put /api/cards/${cardId}`,
      {
        status: card.status,
        position: cardIndex
      },
      null,
      () => this.setState(
        update(this.state, {
          cards: {
            [cardIndex]: {
              status: { $set: status }
            }
          }
        })
      )
    )
  }

  addCard (card) {
    const prevState = this.state
    let _card = card
    if (card.id === null) {
      _card = Object.assign({ id: Date.now() }, card)
    }
    const nextState = update(this.state.cards, { $push: [_card] })
    this.setState({ cards: nextState })
    asyncFetch(
      'post /api/cards',
      _card,
      (d) => {
        _card.id = d.id
        this.setState({ cards: nextState })
      },
      () => this.setState(prevState)
    )
  }
  async deleteCard (cardId) {
    const prevState = this.state
    const { cards } = this.state
    const cardIndex = cards.findIndex((v) => v.id === cardId)
    const nextState = update(cards, {
      $splice: [[cardIndex, 1]]
    })
    this.setState({ cards: nextState })
    asyncFetch(
      `delete /api/cards/${cardId}`,
      null,
      () => this.setState(prevState)
    )
  }
  updateCard (card) {
    const prevState = this.state
    const cardIndex = this.state.cards.findIndex((v) => v.id === card.id)
    const nextState = update(
      this.state.cards, {
        [cardIndex]: { $set: card }
      }
    )
    this.setState({ cards: nextState })
    asyncFetch(
      `put /api/edit/cards/${card.id}`,
      card,
      null,
      () => this.setState(prevState)
    )
  }

  render () {
    const taskCallbacks = {
      toggle: this.toggleTask,
      delete: this.deleteTask,
      add: this.addTask
    }
    const cardCallbacks = {
      addCard: this.addCard,
      updateCard: this.updateCard,
      deleteCard: this.deleteCard,
      updateStatus: this.updateCardStatus,
      updatePosition: this.updateCardPosition,
      persistCardDrag: this.persistCardDrag
    }
    const { cards } = this.state
    return <Board
      cards={cards}
      taskCallbacks={taskCallbacks}
      cardCallbacks={cardCallbacks}
    >
      <Route
        path={`${this.props.match.url}new`}
        render={
          (props) =>
            <NewCard
              {...props}
              cards={cards}
              taskCallbacks={taskCallbacks}
              cardCallbacks={cardCallbacks}
            />
        }
      />
      { cards.length > 0 && <Route
        path={`${this.props.match.url}edit/:cardId`}
        render={
          (props) =>
            <EditCard
              {...props}
              cards={cards}
              taskCallbacks={taskCallbacks}
              cardCallbacks={cardCallbacks}
            />
        }
      /> }
    </Board>
  }
}
export default BoardContainer
