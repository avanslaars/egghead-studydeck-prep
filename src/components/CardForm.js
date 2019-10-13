import React from 'react'
import { saveCard } from '../services/cardService'

export function CardForm({ onSave, onCancel, card }) {
  const id = card && card.id ? card.id : undefined

  const [term, setTerm] = React.useState(id ? card.term : '')
  const [definition, setDefinition] = React.useState(id ? card.definition : '')

  function handleTermChange(event) {
    const { value } = event.target
    setTerm(value)
  }

  function handleDefinitionChange(event) {
    const { value } = event.target
    setDefinition(value)
  }

  function clearForm() {
    setTerm('')
    setDefinition('')
    onCancel && typeof onCancel === 'function' && onCancel()
  }

  function handleSubmit(event) {
    event.preventDefault()
    // Save to API
    saveCard({ term, definition, id }).then(card => {
      // Clear form
      clearForm()
      // Notify the App component that an item has been inserted
      onSave && typeof onSave === 'function' && onSave(card)
    })
  }

  return (
    <div className="tile">
      <h4>Add a card</h4>
      <form onReset={clearForm} onSubmit={handleSubmit}>
        <div>
          <label htmlFor={`card_term_${id ? id : 'new'}`}>term</label>
          <textarea
            id={`card_term_${id ? id : 'new'}`}
            value={term}
            onChange={handleTermChange}
          />
        </div>
        <div>
          <label htmlFor={`card_def_${id ? id : 'new'}`}>definition</label>
          <textarea
            id={`card_def_${id ? id : 'new'}`}
            value={definition}
            onChange={handleDefinitionChange}
          />
        </div>
        <div className="buttons">
          <button className="primary" type="submit">
            save
          </button>
          <button className="secondary" type="reset">
            cancel
          </button>
        </div>
      </form>
    </div>
  )
}
