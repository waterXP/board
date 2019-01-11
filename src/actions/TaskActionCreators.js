import AppDispatcher from '../libs/AppDispatcher'
import constants from '../libs/constants'
import api from '../libs/api'

const TaskActionCreators = {
  addTask (cardId, task) {
    AppDispatcher.dispatchAsync(api.addTask(cardId, task), {
      request: constants.CREATE_TASK,
      success: constants.CREATE_TASK_SUCCESS,
      failure: constants.CREATE_TASK_ERROR
    }, { cardId, task })
  },
  deleteTask (cardId, task, taskIndex) {
    AppDispatcher.dispatchAsync(api.deleteTask(cardId, task), {
      request: constants.DELETE_TASK,
      success: constants.DELETE_TASK_SUCCESS,
      failure: constants.DELETE_TASK_ERROR
    }, { cardId, task, taskIndex })
  },
  toggleTask (cardId, task, taskIndex) {
    AppDispatcher.dispatchAsync(api.toggleTask(cardId, task), {
      request: constants.TOGGLE_TASK,
      success: constants.TOGGLE_TASK_SUCCESS,
      failure: constants.TOGGLE_TASK_ERROR
    }, { cardId, task, taskIndex })
  }
}

export default TaskActionCreators
