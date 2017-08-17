import React, { Component } from 'react'
import PropTypes from 'prop-types'
import marked from 'marked'
import CheckList from '../CheckList'
import './Card.scss'
import { card, cardDefault } from '@/props'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { DragSource, DropTarget } from 'react-dnd'
import constants from '@/libs/constants'
import { Link } from 'react-router-dom'

const cardDragSpec = {
  beginDrag ({ id, status }) {
    return { id, status }
  },
  endDrag ({ cardCallbacks, id, status }) {
    cardCallbacks.persistCardDrag(id, status)
  }
}

const cardDropSpec = {
  hover ({ cardCallbacks, id }, monitor) {
    const draggedId = monitor.getItem().id
    cardCallbacks.updatePosition(draggedId, id)
  }
}

const collectDrag = ({ dragSource }, monitor) => ({
  connectDragSource: dragSource()
})

const collectDrop = ({ dropTarget }, monitor) => ({
  connectDropTarget: dropTarget()
})

@DragSource(constants.CARD, cardDragSpec, collectDrag)
@DropTarget(constants.CARD, cardDropSpec, collectDrop)
export default class Card extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      showDetails: false
    }
    this.toggleDetails = this::this.toggleDetails
    this.deleteCard = this::this.deleteCard
  }
  static propTypes = Object.assign(
    {
      connectDragSource: PropTypes.func.isRequired
    },
    card
  )
  static defaultProps = cardDefault
  toggleDetails () {
    const { showDetails } = this.state
    this.setState({showDetails: !showDetails})
  }
  deleteCard () {
    const { cardCallbacks, id } = this.props
    cardCallbacks.deleteCard(id)
  }
  render () {
    const { id, title, description, tasks, taskCallbacks,
      color, connectDragSource, connectDropTarget } = this.props
    const { showDetails } = this.state
    const sideColor = {
      position: 'absolute',
      zIndex: -1,
      top: 0,
      bottom: 0,
      left: 0,
      width: 7,
      backgroundColor: color
    }
    return connectDropTarget(connectDragSource(
      <div className='bd-card'>
        <div style={sideColor} />
        <div className='card-delete'>
          <a href='javascript:;' onClick={this.deleteCard}><i className='fa fa-times' /></a>
        </div>
        <div className='card-edit'>
          <Link to={`/edit/${id}`}><i className='fa fa-pencil' /></Link>
        </div>
        <div
          className={`title`}
          onClick={this.toggleDetails}
        ><i className={`fa fa-caret-${showDetails ? 'down' : 'right'}`} />&nbsp;{title}</div>
        <ReactCSSTransitionGroup
          transitionName='toggle'
          transitionEnterTimeout={250}
          transitionLeaveTimeout={250}
        >
          { showDetails &&
            <div className='details'>
              <span dangerouslySetInnerHTML={{__html: marked(description)}} />
              <CheckList
                cardId={id}
                tasks={tasks}
                taskCallbacks={taskCallbacks}
              />
            </div>
          }
        </ReactCSSTransitionGroup>
      </div>
    ))
  }
}
