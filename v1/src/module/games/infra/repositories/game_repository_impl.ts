import { GameRepository } from "../../domain/repositories";
import { GameError, GameConnectionError } from "../../domain/errors/errors";
import { IGame } from "../../domain/entities";
import { GameDatasource } from "../datasources";

export class GameRepositoryImpl implements GameRepository {
    datasource: GameDatasource;

    constructor(datasource: GameDatasource) {
        this.datasource = datasource;
    }

    async list(): Promise<IGame[] | GameError> {
        try {
            return await this.datasource.list();
        } catch(err) {
            throw new GameConnectionError();
        }
    }

}