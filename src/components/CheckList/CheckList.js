import React, { Component } from 'react'
import './CheckList.scss'
import { checkList, checkListDefault } from '@/props'

class CheckList extends Component {
  constructor () {
    super(...arguments)
    this.checkInputKeyPress = this::this.checkInputKeyPress
    this.handleBlur = this::this.handleBlur
  }
  checkInputKeyPress (e) {
    if (e.target.value) {
      const { cardId, taskCallbacks } = this.props
      if (e.key === 'Enter') {
        taskCallbacks.add(cardId, e.target.value)
        e.target.value = ''
      }
    }
  }
  handleBlur (e) {
    if (e.target.value) {
      const { cardId, taskCallbacks } = this.props
      taskCallbacks.add(cardId, e.target.value)
      e.target.value = ''
    }
  }
  handleChange = (cardId, id, i) =>
    this.props.taskCallbacks.toggle.bind(this, cardId, id, i)
  handleClick = (cardId, id, i) =>
    this.props.taskCallbacks.delete.bind(this, cardId, id, i)

  render () {
    const { cardId, tasks } = this.props
    const list = tasks.map((v, i) =>
      <li key={v.id} className={`task${v.done ? ' fin' : ''}`}>
        <input
          type='checkbox'
          defaultChecked={v.done}
          onChange={this.handleChange(cardId, v.id, i)}
        />
        {v.name}
        <a
          href='javascript:;'
          className='remove'
          onClick={this.handleClick(cardId, v.id, i)}
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
          onBlur={this.handleBlur}
        />
      </div>
    )
  }
}

CheckList.propTypes = checkList
CheckList.defaultProps = checkListDefault

export default CheckList
