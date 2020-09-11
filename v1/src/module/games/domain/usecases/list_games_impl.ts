import { GameRepository } from "../repositories";
import { ListGames } from "./list_games";
import { IGame } from "../entities";
import { GameError } from "../errors/errors";

export class ListGamesImpl extends ListGames {
    repository: GameRepository;

    constructor(repository: GameRepository) {
        super();
        this.repository = repository;
    }

    async list(): Promise<IGame[] | GameError> {
        return await this.repository.list();
    }
}