# Workers
## Local docker
Ensure you have a running instance of RabbitMQ.

This can be done by running the following command:

```bash
docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq
```

Connnect to the terminal of the running container:

```bash
rabbitmq-plugins enable rabbitmq_management
```

http://localhost:15672/#/

username `guest` password `guest`

