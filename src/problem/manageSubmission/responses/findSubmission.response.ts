export class FindSubmissionResponse {
    submissionInfos: SubmissionInfo[]
}

export class SubmissionInfo {
    id: number


    timeMilisecond: number

    memoryKb: number

    verdict: string


    language: string

    code: string


    sentAt: Date

    judgedAt: Date


    problemId: number
}
