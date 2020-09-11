import { IGame } from "../entities";
import { GameError } from "../errors/errors";

export abstract class ListGames {
    async list(): Promise<IGame[] | GameError> {
        return [];
    }
}