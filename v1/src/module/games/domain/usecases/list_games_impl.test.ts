import { ListGamesImpl } from './list_games_impl';
import { GameModel } from "../../infra/models";
import { mock, when, instance } from 'ts-mockito';
import { GameConnectionError } from '../errors/errors';
import { GameRepository } from '../repositories';

let game = new GameModel({
    backgroundImage: "",
    id: 123,
    metacritic: 123,
    name: "",
    rating: 123,
    released: new Date(),
});

let repository = mock(GameRepository);

describe('list_game_impl', () => {
    it('should returns empty IGame[]', async () => {
        when(repository.list()).thenResolve([]);
        let result = await (new ListGamesImpl(instance(repository))).list();
        expect(result).toEqual([]);
    });
    
    it('should returns IGame[]', async () => {
        when(repository.list()).thenResolve([game]);
        let result = await (new ListGamesImpl(instance(repository))).list();
        expect(result).toEqual([game]);
    });

    it('should throw GameConnectionError', async () => {
        when(repository.list()).thenReject(new GameConnectionError());

        try {
            await (new ListGamesImpl(instance(repository))).list();
        } catch(err) {
            expect(err).toEqual(new GameConnectionError());
        }
    });
});
