import React from 'react'
import { IGame } from '../../../domain/entities';
import { GameModel } from '../../../infra/models';
import ReactWebComponent from 'react-web-component'

type props = {
    title?: string
}

const GameCard = ({title}: props) => (
    <div>
        <h1>Titulo: {title}</h1>
    </div>
)

ReactWebComponent.create(<GameCard />, 'game-card');
export default GameCard;