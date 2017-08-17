import PropTypes from 'prop-types'

export const cardTitle = (props, propName, componentName) => {
  if (props[propName]) {
    const v = props[propName]
    if (typeof v !== 'string' || v.length > 80) {
      return new Error(
        `${propName} in ${componentName} is longer than 80 characters`
      )
    }
  }
}

export const cardTask = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string,
  done: PropTypes.bool
}

export const taskCallbacks = PropTypes.objectOf(PropTypes.func)
export const cardCallbacks = PropTypes.objectOf(PropTypes.func)
export const taskCallbacksDefault = {}
export const cardCallbacksDefault = {}

export const card = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  color: PropTypes.string,
  tasks: PropTypes.arrayOf(PropTypes.shape(cardTask)),
  taskCallbacks,
  cardCallbacks
}
export const cardDefault = {
  title: 'unnamed',
  description: '',
  tasks: [],
  taskCallbacks: taskCallbacksDefault,
  cardCallbacks: cardCallbacksDefault
}

export const cards = PropTypes.arrayOf(PropTypes.shape(card))
export const cardsDefault = []

export const board = {
  cards,
  taskCallbacks,
  cardCallbacks
}
export const boardDefault = {
  cardsDefault,
  taskCallbacks: taskCallbacksDefault,
  cardCallbacks: cardCallbacksDefault
}

export const checkList = {
  cardId: PropTypes.number.isRequired,
  tasks: PropTypes.arrayOf(PropTypes.shape(cardTask)),
  taskCallbacks
}
export const checkListDefault = {
  tasks: [],
  taskCallbacks: taskCallbacksDefault
}

export const cardlist = {
  cards,
  taskCallbacks,
  cardCallbacks,
  connectDropTarget: PropTypes.func.isRequired,
  title: PropTypes.string
}
export const cardListDefault = {
  cards: cardsDefault,
  taskCallbacks: taskCallbacksDefault,
  cardCallbacks: cardCallbacksDefault,
  title: 'unnamed'
}

const draftCard = PropTypes.shape({
  title: PropTypes.string,
  description: PropTypes.string,
  status: PropTypes.string,
  color: PropTypes.string
}).isRequired
export const cardForm = {
  buttonLabel: PropTypes.string.isRequired,
  draftCard,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired
}
