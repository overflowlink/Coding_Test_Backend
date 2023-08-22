export class FindSubmissionResponse {
    submissionInfos: SubmissionInfo[]
}

export class SubmissionInfo {
    id: number


    timeSecond: number

    memoryMb: number

    verdict: string


    language: string

    code: string


    sentAt: Date

    judgedAt: Date


    problemId: number
}
