import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CardForm from '../CardForm'

class NewCard extends Component {
  static propTypes = {
    cardCallbacks: PropTypes.object,
    history: PropTypes.object
  }

  constructor () {
    super(...arguments)
    this.handleChange = this::this.handleChange
    this.handleClose = this::this.handleClose
    this.handleSubmit = this::this.handleSubmit
  }
  componentWillMount () {
    this.setState({
      id: Date.now(),
      title: '',
      description: '',
      status: 'todo',
      color: '#c9c9c9',
      tasks: []
    })
  }

  handleChange (field, value) {
    this.setState({ [field]: value })
  }
  handleSubmit (e) {
    const { cardCallbacks, history } = this.props
    e.preventDefault()
    cardCallbacks.addCard(this.state)
    history.push('/')
  }
  handleClose () {
    this.props.history.push('/')
  }

  render () {
    return (
      <CardForm
        draftCard={this.state}
        buttonLabel='Create Card'
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        handleClose={this.handleClose}
      />
    )
  }
}

export default NewCard
