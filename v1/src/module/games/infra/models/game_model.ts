import { IGame } from "../../domain/entities"

export class GameModel implements IGame {
    id: number;
    name: string;
    released: Date;
    backgroundImage: string;
    rating: number;
    metacritic: number;

    constructor(game: IGame) {
        this.id = game.id;
        this.name = game.name;
        this.released = game.released;
        this.backgroundImage = game.backgroundImage;
        this.rating = game.rating;
        this.metacritic = game.metacritic
    }
}