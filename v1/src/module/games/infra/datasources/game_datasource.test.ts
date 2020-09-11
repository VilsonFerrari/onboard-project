import { mock, when, instance } from "ts-mockito";
import { GameDatasource } from "./game_datasource";
import { GameModel } from "../models";
import { GameConnectionError } from "../../domain/errors/errors";

let datasource = mock(GameDatasource);

let game = new GameModel({
    backgroundImage: "",
    id: 123,
    metacritic: 123,
    name: "",
    rating: 123,
    released: new Date(),
});

describe("game_datasource", () => {
    it("should return empty IGame[]", async () => {
        when(datasource.list()).thenResolve([]);
        let result = await (instance(datasource)).list();
        expect(result).toEqual([]);
    });

    it("should return IGame[]", async () => {
        when(datasource.list()).thenResolve([game]);
        let result = await (instance(datasource)).list();
        expect(result).toEqual([game]);
    });

    it("should throw GameConnectionError", async () => {
        when(datasource.list()).thenReject(new GameConnectionError());

        try {
            await (instance(datasource)).list();
        } catch(err) {
            expect(err).toEqual(new GameConnectionError());
        }
    });
});