import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './FloatButton.scss'
import { DragSource } from 'react-dnd'
import constants from '@/libs/constants'

const floatButtonDragSpec = {
  beginDrag ({ left, top }, monitor, component) {
    return { left, top }
  }
}

const collectDrag = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

@DragSource(constants.FLOAT_BUTTON, floatButtonDragSpec, collectDrag)
export default class FloatButton extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    left: PropTypes.number,
    top: PropTypes.number
  }

  render () {
    const { connectDragSource, isDragging, left, top } = this.props
    if (isDragging) {
      return null
    }
    return connectDragSource(
      <div className='float-button' style={{left, top}}>
        <Link to='/new'>+</Link>
      </div>
    )
  }
}
