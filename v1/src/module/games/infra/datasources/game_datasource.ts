import { IGame } from "../../domain/entities";

export abstract class GameDatasource {
    async list(): Promise<IGame[]> {
        return [];
    }
}