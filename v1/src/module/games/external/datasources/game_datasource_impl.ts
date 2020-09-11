import { GameDatasource } from "../../infra/datasources";
import { IGame } from "../../domain/entities";
import { GameModel } from "../../infra/models/game_model"
import axios from 'axios';

export class GameDatasourceImpl implements GameDatasource {
    async list(): Promise<IGame[]> {
        let {results} = (await axios.get("https://api.rawg.io/api/games")).data;

        let games: GameModel[] = [];

        for(let idx in results) {
            let game = new GameModel({
                id: results[idx].id,
                name: results[idx].name,
                released: new Date(results[idx].released),
                backgroundImage: results[idx].background_image,
                rating: results[idx].rating,
                metacritic: results[idx].metacritic,
            });

            games.push(game);
        }

        return games;
    }
}