import React from 'react'
import { Link } from '@reach/router'

export class Practice extends React.Component {
  state = {
    currentIndex: 0,
    isFront: true
  }

  handlePrevCard = () => {
    const { cards } = this.props
    this.setState(state => ({
      isFront: true,
      /**
       * 4 goes to 3, plus length gets you 8, mod 5 would result in 3
       * 3 goes to 2, plus length gets you 7, mod 5 would result in 2
       * 2 goes to 1, plus length gets you 6, mod 5 would result in 1
       * 1 goes to 0, plus length gets you 5, mod 5 would result in 0
       * 0 goes to -1, plus length gets you the last index (4) the mod length gives it right back to you
       * So you need plus length for the 0 to -1 case, and without the mod, the rest break by being too high
       */
      currentIndex: (state.currentIndex - 1 + cards.length) % cards.length
    }))
  }

  handleNextCard = () => {
    const { cards } = this.props
    this.setState(state => ({
      isFront: true,
      /**
       * This works because length is either larger than or equal to the index + 1
       * If the length is larger, it does not go into the index + 1 ever, and you get that
       * integer value back. When you hit the last item, you divide the number by itself and
       * end up with a remainder of 0
       */
      currentIndex: (state.currentIndex + 1) % cards.length
    }))
  }

  handleCardFlip = () => {
    this.setState(state => ({ isFront: !state.isFront }))
  }

  render() {
    const { cards } = this.props
    const { isFront, currentIndex } = this.state
    const { term = '', definition = '' } =
      cards && cards.length > 0 && cards[currentIndex]
    return (
      <div className="practiceContainer">
        <h3>Practice</h3>
        <div className="progress">
          {currentIndex + 1}/{cards.length}
        </div>
        <div className="card">
          <div className="practiceTerm">{isFront ? term : definition}</div>
          <div className="practiceButtons">
            <button
              type="button"
              className="tertiary"
              onClick={this.handleCardFlip}
            >
              show back
            </button>
            <div>
              <button
                type="button"
                className="secondary"
                onClick={this.handlePrevCard}
              >
                previous
              </button>
              <button
                type="button"
                className="primary"
                onClick={this.handleNextCard}
              >
                next
              </button>
            </div>
          </div>
        </div>
        <Link to="/">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M5.41 11H21a1 1 0 0 1 0 2H5.41l5.3 5.3a1 1 0 0 1-1.42 1.4l-7-7a1 1 0 0 1 0-1.4l7-7a1 1 0 0 1 1.42 1.4L5.4 11z" />
          </svg>
          Back to deck
        </Link>
      </div>
    )
  }
}
