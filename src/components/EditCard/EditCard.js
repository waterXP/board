import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CardForm from '../CardForm'
import CardStore from '../../stores/CardStore'
import DraftStore from '../../stores/DraftStore'
import { Container } from 'flux/utils'
import CardActionCreators from '../../actions/CardActionCreators'

class EditCard extends Component {
  static propTypes = {
    match: PropTypes.object,
    history: PropTypes.object
  }
  constructor () {
    super(...arguments)
    this.handleChange = this::this.handleChange
    this.handleClose = this::this.handleClose
    this.handleSubmit = this::this.handleSubmit
  }
  componentDidMount () {
    const { match } = this.props
    const card = CardStore.getCard(+match.params.cardId)
    if (!card) {
      this.handleClose()
    }
    setTimeout(() => CardActionCreators.createDraft(card))
  }

  handleChange (field, value) {
    CardActionCreators.updateDraft(field, value)
  }
  handleSubmit (e) {
    const { match, history } = this.props
    e.preventDefault()
    CardActionCreators.updateCard(
      CardStore.getCard(+match.params.cardId),
      this.state.draft
    )
    history.push('/')
  }
  handleClose () {
    this.props.history.push('/')
  }

  render () {
    return (
      <CardForm
        draftCard={this.state.draft}
        buttonLabel='Edit Card'
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        handleClose={this.handleClose}
      />
    )
  }
}

EditCard.getStores = () => ([DraftStore])
EditCard.calculateState = (prevState) => ({
  draft: DraftStore.getState()
})

export default Container.create(EditCard)
