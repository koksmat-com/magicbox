import { IResult } from "@koksmat/core";
import { Queue,Worker } from 'bullmq';
import { v4 as uuidv4 } from "uuid";
import { IMessage, ISendOptions, IEnvelope } from "./IMessage";
import IORedis from "ioredis"

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function connect(){
return {connection:new IORedis({username:"default",password:"MRIQpvqAJh"})}
}
export class Messaging {
  private static _instance: Messaging;
 
 
 
  public static async getInstance(connectionString: string) {
    // open for connection pooling based on connectiong string differences
    if (!this._instance) {
      this._instance = new Messaging();
    }
    return this._instance;
  }

  send(queueName: string, message: IMessage,options? :ISendOptions) : Promise<IResult<any>> {
    
    return new Promise(async (resolve, reject) => {
    const result : IResult<any> = {
      hasError: false
    }
    const queue = new Queue(queueName,connect() )
    const correlationId = uuidv4()
    var envelope: IEnvelope = {
      correlationId,
      route: message.route,
      method : message.method,
      payload: message.payload
    };

    // return a GUID
    queue.add('queueName', message);
    
    try {
      const worker = new Worker(queueName, async job => {
        if (job.name === correlationId) {
          result.hasError = false
          result.data = job.data
          await queue.close();
          resolve(result)
        }
      },connect() );
      const timeout = (options?.timeoutSeconds ? options.timeoutSeconds : 30) * 1000 

      setTimeout(async function() {
        result.hasError = true
        result.errorMessage = "Timeout after " +timeout+ " seconds"
        await queue.close();
        resolve(result)
      }, timeout);
      
    } catch (error : any) {
      result.hasError = true
      result.errorMessage = error.message
      await queue.close();
      resolve(result)
    } 
    
  });
  }

  async receive(queueName: string, processMessage: (message: any) => Promise<any>) {
    console.log("connect");
    
   
    try {
     
      console.log("consuming messages from queue: ", queueName);
      let counter = 0;
      while (true) {
        const worker = new Worker(queueName, async job => {
     
              console.log("Received message: ", job.data);
              const msgDecoded : IMessage = JSON.parse(job.data.content.toString())
              const result = await processMessage(msgDecoded);
        },connect() );

        await sleep(100);
        counter++;
        if (counter > 100) {
          console.log("Waiting for message");
          counter = 0;
        }
      }
    } catch (error) {
    } finally {
      
    }
  }
  hookup() {
    console.log("hookup");
  }
}
