import { GameRepository } from "./game_repository";
import { mock, when, instance } from "ts-mockito";
import { GameModel } from "../../infra/models";
import { GameConnectionError } from "../errors/errors";

let repository = mock(GameRepository);

let game = new GameModel({
    backgroundImage: "",
    id: 123,
    metacritic: 123,
    name: "",
    rating: 123,
    released: new Date(),
});

describe("game_repository", () => {
    it('should return empty IGame[]', async () => {
        when(repository.list()).thenResolve([]);
        let result = await (instance(repository)).list();
        expect(result).toEqual([]);
    });

    it('should return IGame[]', async () => {
        when(repository.list()).thenResolve([game]);
        let result = await (instance(repository)).list();
        expect(result).toEqual([game]);
    });

    it('should throw GameConnectionError', async () => {
        when(repository.list()).thenReject(new GameConnectionError());

        try {
            await (instance(repository)).list();
        } catch(err) {
            expect(err).toEqual(new GameConnectionError());
        }
    });
});