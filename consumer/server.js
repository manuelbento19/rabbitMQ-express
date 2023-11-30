const express = require('express')
const amqplib = require('amqplib');
const PORT = process.env.PORT || 3000;
var connection, channel;

const app = express();

(async()=>{
    connection = await amqplib.connect("amqp://localhost:5672")
    channel = await connection.createChannel()

    await channel.assertQueue("create-user")

    channel.consume("create-user",(msg)=>{
        const data = JSON.parse(msg.content.toString())
        console.log(data)
        channel.ack(msg)
    })
})()

app.listen(PORT,()=> console.log("Consumer running at port " + PORT));