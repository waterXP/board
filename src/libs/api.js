import { fetchData } from '@/libs/base'

const asyncFetch = async function (action, params = {}) {
  try {
    return await fetchData(action, params)
  } catch (e) {
    console.error(e)
  }
}

const api = {
  fetchCards: () =>
    asyncFetch('get /api/cards'),
  addCard: (card) =>
    asyncFetch('post /api/cards', card),
  updateCard: (card, draftCard) =>
    asyncFetch(`put /api/edit/cards/${card.id}`, draftCard),
  persistCardDrag: (cardId, status, position) =>
    asyncFetch(`put /api/cards/${cardId}`, { status, position }),
  deleteCard: (card) =>
    asyncFetch(`delete /api/cards/${card.id}`),
  addTask: (cardId, task) =>
    asyncFetch(`post /api/cards/${cardId}/tasks`, task),
  deleteTask: (cardId, task) =>
    asyncFetch(`delete /api/cards/${cardId}/tasks/${task.id}`),
  toggleTask: (cardId, task) =>
    asyncFetch(
      `put /api/cards/${cardId}/tasks/${task.id}`,
      { done: !task.done }
    )
}

export default api
