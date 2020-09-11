import React from 'react'
import { GameDatasourceImpl } from '../../../external/datasources/game_datasource_impl';
import { GameModel } from '../../../infra/models';
import GameCard from '../components/game-card';


type state = {
    games: GameModel[],
}

class GamesView extends React.Component<{}, state> {
    constructor(props: any) {
        super(props);
        
        this.state = {
            games: [],
        };
    }
    
    componentDidMount() {
        this.fetch();
    }

    async fetch() {
        let datasource = new GameDatasourceImpl();
        let games = await datasource.list();

        this.setState({
            games
        });
    }

    render() {
        return (
            <ul>
                {this.state.games.map((game, idx) => (
                    <li key={idx}>
                        <GameCard title={game.name}></GameCard>
                    </li>
                ))}
            </ul>
        )
    }
}

export default GamesView;