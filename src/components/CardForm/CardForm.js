import React, { Component } from 'react'
import { cardForm } from '@/props'
import './CardForm.scss'

class CardForm extends Component {
  static propTypes = cardForm
  constructor () {
    super(...arguments)
    this.handleChange = this::this.handleChange
    this.handleClose = this::this.handleClose
    this.handleSubmit = this::this.handleSubmit
  }
  handleChange (e) {
    const { name, value } = e.target
    this.props.handleChange(name, value)
  }
  handleClose () {
    this.props.handleClose()
  }
  handleSubmit (e) {
    this.props.handleSubmit(e)
  }

  render () {
    const { draftCard } = this.props
    return (
      <div className='bd-card-form'>
        <div className='card big'>
          <form onSubmit={this.handleSubmit}>
            <input
              type='text'
              name='title'
              value={draftCard.title}
              onChange={this.handleChange}
              placeholder='Title'
              required
              autoFocus
            />
            <textarea
              value={draftCard.description}
              name='description'
              onChange={this.handleChange}
              placeholder='Description'
              rows='3'
              required
            />
            <label htmlFor='status'>Status</label>
            <select
              id='status'
              name='status'
              value={draftCard.status}
              onChange={this.handleChange}
            >
              <option value='todo'>To Do</option>
              <option value='in-progress'>In Progress</option>
              <option value='done'>Done</option>
            </select>
            <br />
            <label htmlFor='color'>Color</label>
            <input
              id='color'
              name='color'
              value={draftCard.color || '#ff0000'}
              onChange={this.handleChange}
              type='color'
            />
            <div className='actions'>
              <button type='submit'>{ this.props.buttonLabel }</button>
            </div>
          </form>
        </div>
        <div
          className='overlay'
          onClick={this.handleClose}
        />
      </div>
    )
  }
}

export default CardForm
