import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CardForm from '../CardForm'
import DraftStore from '../../stores/DraftStore'
import { Container } from 'flux/utils'
import CardActionCreators from '../../actions/CardActionCreators'

class NewCard extends Component {
  static propTypes = {
    history: PropTypes.object
  }

  constructor () {
    super(...arguments)
    this.handleChange = this::this.handleChange
    this.handleClose = this::this.handleClose
    this.handleSubmit = this::this.handleSubmit
  }
  componentWillMount () {
    setTimeout(() => CardActionCreators.createDraft())
  }

  handleChange (field, value) {
    CardActionCreators.updateDraft(field, value)
  }
  handleSubmit (e) {
    const { history } = this.props
    e.preventDefault()
    CardActionCreators.addCard(this.state.draft)
    history.push('/')
  }
  handleClose () {
    this.props.history.push('/')
  }

  render () {
    return (
      <CardForm
        draftCard={this.state.draft}
        buttonLabel='Create Card'
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        handleClose={this.handleClose}
      />
    )
  }
}

NewCard.getStores = () => ([DraftStore])
NewCard.calculateState = (prevState) => ({
  draft: DraftStore.getState()
})

export default Container.create(NewCard)
