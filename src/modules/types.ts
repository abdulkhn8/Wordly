export interface IGameData {
    data: IData[],
    index: number,
    score: number,
}

export interface IData {
    question: string,
    answer: string,
    score: number,
}