## RabbitMQ Express

- Run rabbitmq (using docker)
```
docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:latest
```
or
```
docker compose up
```
- Run the provider
```
cd provider
```
```
npm i
```
```
node server.js
```


- Run the consumer
```
cd consumer
```
```
npm i
```
```
node server.js
```

- GET request to http://localhost:5000/create-user


A message is sent from provider to Queue(names 'create-user').
The message is read by consumer and logged.