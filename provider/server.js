const express = require('express')
const amqplib = require('amqplib');
const PORT = process.env.PORT || 5000;
var connection, channel;

(async()=>{
    connection = await amqplib.connect("amqp://localhost:5672")
    channel = await connection.createChannel();

    await channel.assertQueue("create-user");
})()

const sendMessage = async (data) => {
    await channel.sendToQueue("create-user",Buffer.from(JSON.stringify(data)))
}

const app = express()

app.use(express.json())


app.post("/create-user", async(req, res) => {
    const {fullName,lastName,email,phone,password} = req.body;
    
    await sendMessage({
        fullName,lastName,email,phone,password
    })
    
    res.status(201).send({
        message: "User Created"
    })
})

app.listen(PORT,()=> console.log("Provider running at port " + PORT));