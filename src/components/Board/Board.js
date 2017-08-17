import React, { Component } from 'react'
import List from '../List'
import './Board.scss'
import { board, boardDefault } from '@/props'
import { DragDropContext, DropTarget } from 'react-dnd'
import constants from '@/libs/constants'
import HTML5Backend from 'react-dnd-html5-backend'
import FloatButton from '../FloatButton'

const floatButtonDropSpec = {
  drop (props, monitor, component) {
    const { x, y } = monitor.getSourceClientOffset()
    const { innerHeight, innerWidth } = window
    if (x < 0 || y < 0 || x + 70 > innerWidth || y + 70 > innerHeight) {
      return
    }
    component.setPos(x, y)
  }
}

const collectDrop = ({ dropTarget }, monitor) => ({
  connectDropTarget: dropTarget()
})

@DropTarget(constants.FLOAT_BUTTON, floatButtonDropSpec, collectDrop)
class Board extends Component {
  static propTypes = board
  static defaultProps = boardDefault

  constructor () {
    super(...arguments)
    this.state = {
      left: null,
      top: null
    }
  }

  setPos (x, y) {
    this.setState({
      left: x,
      top: y
    })
  }

  render () {
    const { cards, taskCallbacks, cardCallbacks,
      children, connectDropTarget } = this.props
    const { left, top } = this.state
    return connectDropTarget(
      <div className='bd-board'>
        <FloatButton left={left} top={top} />
        <List
          id='todo'
          title='To Do'
          taskCallbacks={taskCallbacks}
          cardCallbacks={cardCallbacks}
          cards={cards.filter((card) => card.status === 'todo')}
        />
        <List
          id='in-progress'
          title='In Progress'
          taskCallbacks={taskCallbacks}
          cardCallbacks={cardCallbacks}
          cards={cards.filter((card) => card.status === 'in-progress')}
        />
        <List
          id='done'
          title='Done'
          taskCallbacks={taskCallbacks}
          cardCallbacks={cardCallbacks}
          cards={cards.filter((card) => card.status === 'done')}
        />
        { children }
      </div>
    )
  }
}

export default DragDropContext(HTML5Backend)(Board)
