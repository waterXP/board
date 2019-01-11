import AppDispatcher from '../libs/AppDispatcher'
import constants from '../libs/constants'
import { ReduceStore } from 'flux/utils'
import update from 'react-addons-update'

class CardStore extends ReduceStore {
  getInitialState () {
    return []
  }
  getCard (id) {
    return this._state.find((card) => card.id === id)
  }
  getCardIndex (id) {
    return this._state.findIndex((card) => card.id === id)
  }
  reduce (state, action) {
    let cardIndex = -1
    let taskIndex = -1
    switch (action.type) {
      case constants.FETCH_CARDS_SUCCESS:
        return action.payload.response
      case constants.CREATE_CARD:
        return update(this.getState(),
          { $push: [action.payload.card] }
        )
      case constants.CREATE_CARD_SUCCESS:
        cardIndex = this.getCardIndex(action.payload.card.id)
        return update(this.getState(), { [cardIndex]: {
          id: { $set: action.payload.response.id }
        }})
      case constants.CREATE_CARD_ERROR:
        cardIndex = this.getCardIndex(action.payload.card.id)
        return update(this.getState(), { $splice: [[cardIndex, 1]] })
      case constants.DELETE_CARD:
        cardIndex = this.getCardIndex(action.payload.card.id)
        return update(this.getState(), { $splice: [[cardIndex, 1]] })
      case constants.DELETE_CARD_ERROR:
        cardIndex = this.getCardIndex(action.payload.card.id)
        return update(this.getState(), {
          $splice: [[action.payload.cardIndex, 0, action.payload.card]]
        })
      case constants.UPDATE_CARD:
        cardIndex = this.getCardIndex(action.payload.card.id)
        return update(this.getState(), { [cardIndex]: {
          $set: action.payload.draftCard
        }})
      case constants.UPDATE_CARD_ERROR:
        cardIndex = this.getCardIndex(action.payload.card.id)
        return update(this.getState(), { [cardIndex]: {
          $set: action.payload.card
        }})
      case constants.UPDATE_CARD_POSITION:
        if (action.payload.cardId !== action.payload.afterId) {
          cardIndex = this.getCardIndex(action.payload.cardId)
          const card = this.getState()[cardIndex]
          const afterIndex = this.getCardIndex(action.payload.afterId)
          return update(this.getState(), { $splice: [
            [cardIndex, 1],
            [afterIndex, 0, card]
          ] })
        }
        break
      case constants.UPDATE_CARD_STATUS:
        cardIndex = this.getCardIndex(action.payload.cardId)
        return update(this.getState(), { [cardIndex]: {
          status: { $set: action.payload.listId }
        }})
      case constants.PERSIST_CARD_DRAG_ERROR:
        cardIndex = this.getCardIndex(action.payload.cardProps.id)
        return update(this.getState(), { [cardIndex]: {
          status: { $set: action.payload.cardProps.status }
        }})
      case constants.CREATE_TASK:
        cardIndex = this.getCardIndex(action.payload.cardId)
        return update(this.getState(), { [cardIndex]: {
          tasks: { $push: [action.payload.task] }
        }})
      case constants.CREATE_TASK_SUCCESS:
        cardIndex = this.getCardIndex(action.payload.cardId)
        taskIndex = this.getState()[cardIndex].tasks.findIndex((task) =>
          task.id === action.payload.task.id
        )
        return update(this.getState(), { [cardIndex]: { tasks: { [taskIndex]: {
          id: { $set: action.payload.response.id }
        }}}})
      case constants.CREATE_TASK_ERROR:
        cardIndex = this.getCardIndex(action.payload.cardId)
        taskIndex = this.getState()[cardIndex].tasks.findIndex((task) =>
          task.id === action.payload.task.id
        )
        return update(this.getState(), { [cardIndex]: {
          tasks: { $splice: [[taskIndex, 1]] }
        }})
      case constants.DELETE_TASK:
        cardIndex = this.getCardIndex(action.payload.cardId)
        return update(this.getState(), { [cardIndex]: {
          tasks: { $splice: [[action.payload.taskIndex, 1]] }
        }})
      case constants.DELETE_TASK_ERROR:
        cardIndex = this.getCardIndex(action.payload.cardId)
        return update(this.getState(), { [cardIndex]: { tasks: {
          $splice: [[action.payload.taskIndex, 0, action.payload.task]]
        }}})
      case constants.TOGGLE_TASK:
        cardIndex = this.getCardIndex(action.payload.cardId)
        return update(this.getState(), { [cardIndex]: { tasks: {
          [action.payload.taskIndex]: {
            done: { $apply: (done) => !done }
          }
        }}})
      case constants.TOGGLE_TASK_ERROR:
        cardIndex = this.getCardIndex(action.payload.cardId)
        return update(this.getState(), { [cardIndex]: { tasks: {
          [action.payload.taskIndex]: {
            done: { $apply: (done) => !done }
          }
        }}})
      case constants.TOGGLE_CARD_DETAILS:
        cardIndex = this.getCardIndex(action.payload.cardId)
        return update(this.getState(), { [cardIndex]: {
          showDetails: { $apply: (v) => !v }
        }})
      default:
        return state
    }
  }
}

export default new CardStore(AppDispatcher)
