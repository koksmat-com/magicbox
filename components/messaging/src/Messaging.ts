import { Connection, Channel, connect, ConsumeMessage } from "amqplib";

// https://www.rabbitmq.com/direct-reply-to.html

export interface IProcessMessage {
  call(message: any): Promise<any>;
}

export interface IReplyToMessage {
  call(message: any): Promise<any>;
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

   async send(exchange_name : string,exchange_type : string,queueName:string, message:string) {
    const connection = await connect(this._connectionString);
    const channel = await connection.createChannel();
    // https://amqp-node.github.io/amqplib/channel_api.html#channel_assertExchange
    await channel.assertExchange(exchange_name, exchange_type, {
        durable: false
    })
    return await channel.publish(
        exchange_name,
        queueName, 
        Buffer.from(message)
    );

    
  }


  private async receive(queueName: string, processMessage: IProcessMessage) {
    console.log("connect");
    const connection = await connect(this._connectionString);
    const channel = await connection.createChannel();

    const exchange_name = "test-exchange";
    const exchange_type = "fanout";
    const queue_name = "test-queue1";

    // binding the queue
    const binding_key = "";

    // https://amqp-node.github.io/amqplib/channel_api.html#channel_assertExchange
    await channel.assertExchange(exchange_name, exchange_type, {
      durable: false,
    });

    const q = await channel.assertQueue(queueName);
    channel.bindQueue(q.queue, exchange_name, binding_key);
    console.log("consuming messages from queue: ", q.queue);
    channel.consume(q.queue,async (msgRaw) => {
      if ((msgRaw as ConsumeMessage)?.content) {
        const msg = msgRaw as ConsumeMessage;
        console.log("Received message: ", msg.content.toString());
 
        await processMessage.call(msg.content.toString())
        
        channel.ack(msg);
      }
    });
  }
  hookup() {
    console.log("hookup");
  }
}
