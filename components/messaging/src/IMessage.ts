import { Method } from "@koksmat/powerpacks";

// https://www.rabbitmq.com/direct-reply-to.html


export interface IProcessMessage {
  call(message: any): Promise<any>;
}

export interface IReplyToMessage {
  call(message: any): Promise<any>;
}

export interface IEnvelope {
  correlationId: string;
  route: string;
  method: string;
  context?: any;
  payload: object;
}


export interface IMessage {
  method: Method;
  route: string;
  payload: object;
}
export interface ISendOptions {
  timeoutSeconds?: number;


}
