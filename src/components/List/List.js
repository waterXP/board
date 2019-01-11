import React from 'react'
import Card from '../Card'
import './List.scss'
import { cardlist, cardListDefault } from '@/props'
import { DropTarget } from 'react-dnd'
import constants from '@/libs/constants'
import CardActionCreators from '../../actions/CardActionCreators'

const listTargetSpec = {
  hover ({ id }, monitor) {
    const draggedId = monitor.getItem().id
    CardActionCreators.updateCardStatus(draggedId, id)
  }
}

function collect ({ dropTarget }, monitor) {
  return {
    connectDropTarget: dropTarget()
  }
}

const List = ({ cards, title, connectDropTarget }) => {
  const list = cards.map((v) => <Card key={v.id} {...v} />)
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
