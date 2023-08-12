export class FindProblemTestcaseResponse {
    problemTestcaseInfos: ProblemTestcaseInfo[]
}

class ProblemTestcaseInfo {
    id: number
    inputValue: string
    outputValue: string
}