export class FindProblemExampleResponse {
    problemExampleInfos: ProblemExampleInfo[]
}

class ProblemExampleInfo {
    id: number
    inputValue: string
    outputValue: string
}