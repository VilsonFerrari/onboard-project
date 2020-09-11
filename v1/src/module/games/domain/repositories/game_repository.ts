import { IGame } from "../entities";
import { GameError } from "../errors/errors";

export abstract class GameRepository {
    async list(): Promise<IGame[] | GameError> {
        return [];
    }
}