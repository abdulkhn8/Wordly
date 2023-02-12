import { IGameData } from "../../types";

export interface INavigationService {
    navigateToHome(): void;
    navigateToPuzzle(gameData:IGameData): void;
    navigateToResult(gameData:IGameData): void;
    navigateToLeadersBoard(): void;
    shareScoreWithOthers(score: number): Promise<void>
}