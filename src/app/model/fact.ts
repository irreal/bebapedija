export class Fact {
    constructor(
        public Category: string,
        public Action: string,
        public steps: string[],
        public ToDo: boolean
    ) { }
}
