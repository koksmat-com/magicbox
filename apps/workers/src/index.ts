import { Worker } from "./Worker";

async function run() {
  const worker = new Worker();
  console.log("testing exchange");
  const result = await worker.run()
  console.log("got", result);
  console.log("starting");
  await worker.run();
}

run();
