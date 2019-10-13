import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { CardPreview } from './CardPreview'

it('Renders the expected term', () => {
  const expectedTerm = 'This is a test'
  const { getByText } = render(<CardPreview term={expectedTerm} />)
  expect(getByText(expectedTerm)).toBeInTheDocument()
})

it('Flips the card to reveal the definition', () => {
  const expectedTerm = 'Question'
  const expectedDef = 'Answer'
  const { getByText, queryByText } = render(
    <CardPreview term={expectedTerm} definition={expectedDef} />
  )

  expect(getByText(expectedTerm)).toBeInTheDocument()

  const flipButton = getByText(/show/i)
  fireEvent.click(flipButton)

  expect(getByText(expectedDef)).toBeInTheDocument()
  expect(queryByText(expectedTerm)).not.toBeInTheDocument()
})
