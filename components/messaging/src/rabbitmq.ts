import { IResult } from "@koksmat/core";
import { Connection, Channel, connect, ConsumeMessage } from "amqplib";
import { v4 as uuidv4 } from "uuid";
import { IMessage, ISendOptions, IEnvelope } from "./IMessage";


function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export class Messaging {
  private static _instance: Messaging;

  private _connectionString: string;
  constructor(connectionString: string) {
    console.log("Messaging");
    this._connectionString = connectionString;
  }
  public static async getInstance(connectionString: string) {
    // open for connection pooling based on connectiong string differences
    if (!this._instance) {
      this._instance = new Messaging(connectionString);
    }
    return this._instance;
  }

  send(queueName: string, message: IMessage,options? :ISendOptions) : Promise<IResult<any>> {
    
    return new Promise(async (resolve, reject) => {
    const result : IResult<any> = {
      hasError: false
    }
    const connection = await connect(this._connectionString);
    const correlationId = uuidv4()
    var envelope: IEnvelope = {
      correlationId,
      route: message.route,
      method : message.method,
      payload: message.payload
    };

    // return a GUID

    const channel = await connection.createChannel();
    try {
      await channel.assertQueue(queueName, {
        durable: true,
      });
      const responseQueue = await channel.assertQueue("",{  exclusive: true})
      await channel.sendToQueue(
        queueName,
        Buffer.from(JSON.stringify(envelope)),
        {
          correlationId: correlationId,
          replyTo: responseQueue.queue }
      );


      await channel.consume(responseQueue.queue, function(msg : any) {
        if (msg.properties.correlationId == correlationId) {
          console.log(' [.] Got %s', msg.content.toString());
          result.data = msg.content.toString()
          resolve(result)
        }
      }, {

        noAck: true
      });
      const timeout = (options?.timeoutSeconds ? options.timeoutSeconds : 30) * 1000 
      setTimeout(async function() {
        result.hasError = true
        result.errorMessage = "Timeout after " +timeout+ " seconds"
        await connection.close();
        resolve(result)
      }, timeout);
      
    } catch (error : any) {
      result.hasError = true
      result.errorMessage = error.message
      await connection.close();
      resolve(result)
    } 
    
  });
  }

  async receive(queueName: string, processMessage: (message: any) => Promise<any>) {
    console.log("connect");
    const connection = await connect(this._connectionString);
    const channel = await connection.createChannel();
    try {
      await channel.assertQueue(queueName, {
        durable: true,
      });
      console.log("consuming messages from queue: ", queueName);
      let counter = 0;
      while (true) {
        await channel.prefetch(1);
        await channel.consume(queueName, async (msgRaw) => {
          if ((msgRaw as ConsumeMessage)?.content) {
            const msg = msgRaw as ConsumeMessage;
            console.log("Received message: ", msg.content.toString());
            const msgDecoded : IMessage = JSON.parse(msg.content.toString())
            const result = await processMessage(msgDecoded);
            if (msg?.properties.replyTo){
            await channel.sendToQueue(msg.properties.replyTo,
              Buffer.from(JSON.stringify(result)), {
                correlationId: msg.properties.correlationId
              });
            }
            channel.ack(msg);
          }
        });
        await sleep(100);
        counter++;
        if (counter > 100) {
          console.log("Waiting for message");
          counter = 0;
        }
      }
    } catch (error) {
    } finally {
      await connection.close();
    }
  }
  hookup() {
    console.log("hookup");
  }
}
