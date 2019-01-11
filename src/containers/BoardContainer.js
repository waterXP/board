import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Board from '@/components/Board'
import NewCard from '@/components/NewCard'
import EditCard from '@/components/EditCard'
import { Route } from 'react-router-dom'
import { Container } from 'flux/utils'
import CardActionCreators from '../actions/CardActionCreators'
import CardStore from '../stores/CardStore'

class BoardContainer extends Component {
  static propTypes = {
    match: PropTypes.object
  }

  componentDidMount () {
    CardActionCreators.fetchCards()
  }

  render () {
    const { cards } = this.state
    return <Board
      cards={cards}
    >
      <Route
        path={`${this.props.match.url}new`}
        render={
          (props) =>
            <NewCard
              {...props}
              cards={cards}
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
            />
        }
      /> }
    </Board>
  }
}

BoardContainer.getStores = () => ([CardStore])
BoardContainer.calculateState = (prevState) => ({
  cards: CardStore.getState()
})

export default Container.create(BoardContainer)
