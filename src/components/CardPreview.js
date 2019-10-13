import React from 'react'
import { destroyCard } from '../services/cardService'
import { CardForm } from './CardForm'

export function CardPreview({ onRemove, onUpdate, ...card }) {
  const { term, definition, id } = card
  const [isFront, setIsFront] = React.useState(true)
  const [isEditMode, setIsEditMode] = React.useState(false)

  function handleCardFlip() {
    setIsFront(current => !current)
  }

  function handleEditToggle() {
    setIsEditMode(current => !current)
  }

  function handleDelete() {
    const confirm = window.confirm('Are you sure?')
    if (confirm) {
      destroyCard(id).then(() => {
        onRemove && typeof onRemove === 'function' && onRemove(id)
      })
    }
  }

  return isEditMode ? (
    <CardForm card={card} onCancel={handleEditToggle} onSave={onUpdate} />
  ) : (
    <ReadView
      id={id}
      term={term}
      definition={definition}
      isFront={isFront}
      onFlip={handleCardFlip}
      onRemove={handleDelete}
      onEdit={handleEditToggle}
    />
  )
}

function ReadView({ id, term, definition, isFront, onFlip, onRemove, onEdit }) {
  return (
    <div className={`tile ${isFront ? '' : 'back'}`}>
      <h4 className="cardTerm">{isFront ? term : definition}</h4>
      <div className="cardButtons">
        <button type="button" className="tertiary" onClick={onFlip}>
          {isFront ? 'show back' : 'show front'}
        </button>
        <div>
          <button type="button" className="secondary" onClick={onEdit}>
            edit
          </button>
          <button type="button" className="secondary danger" onClick={onRemove}>
            delete
          </button>
        </div>
      </div>
    </div>
  )
}
