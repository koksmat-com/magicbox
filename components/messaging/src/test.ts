import { Messaging } from "./bullmq";
import { IMessage } from "./IMessage";

// write your tests here


console.log("test 123");
Messaging.getInstance("test").then((messaging) => {
    const msg  : IMessage= {
      route: "testRoute",
      method: "post",
      payload: {"test":"test"}
    }
    messaging.send("test",msg).then((result) => {
      console.log(result);
    }) 
    
  })
