import { ListGames } from "./list_games";
import { mock, when, instance } from "ts-mockito";
import { GameModel } from "../../infra/models";
import { GameConnectionError } from "../errors/errors";

let usecase = mock(ListGames);
let game = new GameModel({
    backgroundImage: "",
    id: 123,
    metacritic: 123,
    name: "",
    rating: 123,
    released: new Date(),
});

describe('list_games', () => {
    it('should return empty IGame[]', async () => {
        when(usecase.list()).thenResolve([]);
        let result = await (instance(usecase)).list();
        expect(result).toEqual([]);
    });

    it('should return IGame[]', async () => {
        when(usecase.list()).thenResolve([game]);
        let result = await (instance(usecase)).list();
        expect(result).toEqual([game]);
    });

    it('should throw GameConnectionError', async () => {
        when(usecase.list()).thenReject(new GameConnectionError());
        try {
            await (instance(usecase)).list();
        } catch(err) {
            expect(err).toEqual(new GameConnectionError());
        }
    });
});