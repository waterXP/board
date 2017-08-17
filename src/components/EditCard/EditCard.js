import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CardForm from '../CardForm'

class EditCard extends Component {
  static propTypes = {
    cards: PropTypes.array,
    match: PropTypes.object,
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
    const { cards, match } = this.props
    let card = cards.find((v) => v.id === +match.params.cardId)
    if (!card) {
      this.handleClose()
    }
    this.setState({...card})
  }

  handleChange (field, value) {
    this.setState({ [field]: value })
  }
  handleSubmit (e) {
    const { cardCallbacks, history } = this.props
    e.preventDefault()
    cardCallbacks.updateCard(this.state)
    history.push('/')
  }
  handleClose () {
    this.props.history.push('/')
  }

  render () {
    return (
      <CardForm
        draftCard={this.state}
        buttonLabel='Edit Card'
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        handleClose={this.handleClose}
      />
    )
  }
}

export default EditCard
