import AppDispatcher from '../libs/AppDispatcher'
import constants from '../libs/constants'
import { ReduceStore } from 'flux/utils'

class CardStore extends ReduceStore {
  getInitialState () {
    return []
  }
  reduce (state, action) {
    switch (action.type) {
      default:
        return state
    }
  }
}

export default new CardStore(AppDispatcher)
