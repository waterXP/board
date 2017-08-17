import React from 'react'
import Card from '../Card'
import './List.scss'
import { cardlist, cardListDefault } from '@/props'
import { DropTarget } from 'react-dnd'
import constants from '@/libs/constants'

const listTargetSpec = {
  hover ({ id, cardCallbacks }, monitor) {
    const draggedId = monitor.getItem().id
    cardCallbacks.updateStatus(draggedId, id)
  }
}

function collect ({ dropTarget }, monitor) {
  return {
    connectDropTarget: dropTarget()
  }
}

const List = ({ cards, title, taskCallbacks,
  cardCallbacks, connectDropTarget }) => {
  const list = cards.map((v) =>
    <Card
      key={v.id}
      taskCallbacks={taskCallbacks}
      cardCallbacks={cardCallbacks}
      {...v}
    />
  )
  return connectDropTarget(
    <div className='bd-list'>
      <h1>{title}</h1>
      <div className='list'>{list}</div>
    </div>
  )
}

List.propTypes = cardlist
List.defaultProps = cardListDefault

export default DropTarget(constants.CARD, listTargetSpec, collect)(List)
