import { Worker } from "./Worker";

async function run() {
  const worker = new Worker();
 
  const result = await worker.run()
  console.log("got", result);
 
 
}

run();
