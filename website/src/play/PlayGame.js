import React from 'react'

const PlayGame = ({ match: { params: { gameId } }}) => {

  return (
    <div>
      <h1>Playing Game: {gameId}</h1>
    </div>
  )
}

export default PlayGame
