import * as amqp from "amqplib"


export class Messaging {
    private static _instance: Messaging;
    private _messageServer : any
    private _connection : any
    private _channel : any
     constructor (){
        console.log("Messaging")
        this._messageServer = "http://localhost:3000"
    }
    public static async getInstance(){
        if(!this._instance){
            this._instance = new Messaging();
            await this._instance.connect()
        }
        return this._instance;
    }

    private async connect (){
        console.log("connect")
        this._connection = await amqp.connect("amqp://localhost:5672");
        this._channel    = await this._connection.createChannel()
            
       await this._channel.assertQueue("test-queue2")
    
    }
    hookup(){
        console.log("hookup")
    }

}