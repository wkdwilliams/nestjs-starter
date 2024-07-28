import { OnQueueActive, OnQueueCompleted } from "@nestjs/bull";
import { Logger } from "@nestjs/common";
import { Job } from "bull";

export abstract class AbstractProcessor {

    protected logger: Logger;

    constructor() {
        this.logger = new Logger(this.constructor.name);
    }

    @OnQueueActive()
    onActive(job: Job) {
        new Logger(this.constructor.name).debug(`Processing job ${job.id} of type ${job.name}`)
    }

    @OnQueueCompleted()
    onCompleted() {
        new Logger(this.constructor.name).debug('Job complete')
    }
}