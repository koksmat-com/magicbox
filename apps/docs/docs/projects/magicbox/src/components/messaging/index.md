# Messaging
For messaging to work you need to have a service or a cluster of services running. The following messaging service are supported


## Service
- RabbitMQ

### RabbitMQ
Run a RabbitMQ container with the management plugin enabled:

On your local machine start a instance of RabbitMQ 
```bash
docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq   
```

Connect to the terminal of the container and enable the management plugin
```bash
rabbitmq-plugins enable rabbitmq_management
```

The connect to [http://localhost:15672/](http://localhost:15672/) with the default credentials (guest/guest)

## How to use

### References

https://blog.tericcabrel.com/rabbitmq-pub-sub-nodejs/

https://www.rabbitmq.com/tutorials/tutorial-two-javascript.html