import React, { Component } from 'react'
import './CheckList.scss'
import { checkList, checkListDefault } from '@/props'
import TaskActionCreators from '../../actions/TaskActionCreators'

class CheckList extends Component {
  constructor () {
    super(...arguments)
    this.checkInputKeyPress = this::this.checkInputKeyPress
    this.addTask = this::this.addTask
  }
  checkInputKeyPress (e) {
    if (e.key === 'Enter') {
      this.addTask(e)
    }
  }
  addTask (e) {
    if (e.target.value) {
      const { cardId } = this.props
      TaskActionCreators.addTask(cardId, e.target.value)
      e.target.value = ''
    }
  }
  handleChange = (cardId, v, i) =>
    TaskActionCreators.toggleTask.bind(this, cardId, v, i)
  handleClick = (cardId, v, i) =>
    TaskActionCreators.deleteTask.bind(this, cardId, v, i)

  render () {
    const { cardId, tasks } = this.props
    const list = tasks.map((v, i) =>
      <li key={v.id} className={`task${v.done ? ' fin' : ''}`}>
        <input
          type='checkbox'
          defaultChecked={v.done}
          onChange={this.handleChange(cardId, v, i)}
        />
        {v.name}
        <a
          href='javascript:;'
          className='remove'
          onClick={this.handleClick(cardId, v, i)}
        >
          <i className='fa fa-times' />
        </a>
      </li>
    )
    return (
      <div className='bd-check-list'>
        <ul className='tasks'>{list}</ul>
        <input
          className='add-task'
          type='text'
          placeholder='Type then hit Enter to add a task'
          onKeyPress={this.checkInputKeyPress}
          onBlur={this.addTask}
        />
      </div>
    )
  }
}

CheckList.propTypes = checkList
CheckList.defaultProps = checkListDefault

export default CheckList
