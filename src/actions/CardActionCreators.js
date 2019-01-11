import AppDispatcher from '../libs/AppDispatcher'
import constants from '../libs/constants'
import api from '../libs/api'
import { throttle } from '../libs/base'
import CardStore from '../stores/CardStore'

const CardActionCreators = {
  fetchCards () {
    AppDispatcher.dispatchAsync(api.fetchCards(), {
      request: constants.FETCH_CARDS,
      success: constants.FETCH_CARDS_SUCCESS,
      failure: constants.FETCH_CARDS_ERROR
    })
  },
  toggleCardDetails (cardId) {
    AppDispatcher.dispatch({
      type: constants.TOGGLE_CARD_DETAILS,
      payload: { cardId }
    })
  },
  addCard (card) {
    AppDispatcher.dispatchAsync(api.addCard(card), {
      request: constants.CREATE_CARD,
      success: constants.CREATE_CARD_SUCCESS,
      failure: constants.CREATE_CARD_ERROR
    }, { card })
  },
  deleteCard (card) {
    AppDispatcher.dispatchAsync(api.deleteCard(card), {
      request: constants.DELETE_CARD,
      success: constants.DELETE_CARD_SUCCESS,
      failure: constants.DELETE_CARD_ERROR
    }, { card })
  },
  updateCard (card, draftCard) {
    AppDispatcher.dispatchAsync(api.updateCard(card, draftCard), {
      request: constants.UPDATE_CARD,
      success: constants.UPDATE_CARD_SUCCESS,
      failure: constants.UPDATE_CARD_ERROR
    }, { card, draftCard })
  },
  updateCardStatus: throttle((cardId, listId) => {
    AppDispatcher.dispatch({
      type: constants.UPDATE_CARD_STATUS,
      payload: { cardId, listId }
    })
  }),
  updateCardPosition: throttle((cardId, afterId) => {
    AppDispatcher.dispatch({
      type: constants.UPDATE_CARD_POSITION,
      payload: { cardId, afterId }
    })
  }, 500),
  persistCardDrag (cardProps) {
    const card = CardStore.getCard(cardProps.id)
    const cardIndex = CardStore.getCardIndex(cardProps.id)
    AppDispatcher.dispatchAsync(api.persistCardDrag(
      card.id, card.status, cardIndex), {
      request: constants.PERSIST_CARD_DRAG,
      success: constants.PERSIST_CARD_DRAG_SUCCESS,
      failure: constants.PERSIST_CARD_DRAG_ERROR
    }, { cardProps })
  },
  createDraft (card) {
    AppDispatcher.dispatch({
      type: constants.CREATE_DRAFT,
      payload: { card }
    })
  },
  updateDraft (field, value) {
    AppDispatcher.dispatch({
      type: constants.UPDATE_DRAFT,
      payload: { field, value }
    })
  }
}

export default CardActionCreators
