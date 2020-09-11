export interface GameError extends Error {
    message: string
}

export class GameConnectionError implements GameError {
    message: string;
    name: string;
    stack?: string | undefined;

    constructor() {
        this.name = "GameConnectionError";
        this.message = "list games failed";
    }
}