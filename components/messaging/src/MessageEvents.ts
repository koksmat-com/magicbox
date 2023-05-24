import { Job, QueueEvents, QueueEventsOptions } from "bullmq";
import debug from "debug";


type eventSubscriber = {
  jobId: string;
  callBack: (job: Job) => void;

};
export class MessageEvents {
  private _subscribers: eventSubscriber[] = [];

  subscribe(jobId: string, callBack: (job: any) => void) {
    this._subscribers.push({ jobId, callBack });
  }
  unsubscribe(jobId: string) {
    this._subscribers = this._subscribers.filter(x => x.jobId != jobId);
  }

  emit(job: any) {

    this._subscribers.forEach(x => {
      if (x.jobId == job.jobId) {
        x.callBack(job);
      }
    });
  }

  async receive(connection: QueueEventsOptions) {
    const log = debug("magicbox.messagingevens.receive");
    const queueEvents = new QueueEvents("test", connection);
    queueEvents.on('waiting', (job) => {
      log("waiting", job);
    });
    queueEvents.on('active', (job) => {
      log("active", job);
      // Job started
    });
    queueEvents.on('stalled', (job) => {
      log("stalled", job);
      // Job stalled
    });


    queueEvents.on('failed', (job, err) => {
      log("failed", job);
      // Job failed with reason err!
    });


    queueEvents.on('progress', (job) => {
      log("progress", job);
      // Job is waiting to be processed.
    });
    queueEvents.on('error', (err) => {
      log("error", err);
      queueEvents.close();

      // Job is waiting to be processed.
    });
    queueEvents.on("completed", (job) => {
      log("completed", job);
      this.emit(job);

    });
  }
}
