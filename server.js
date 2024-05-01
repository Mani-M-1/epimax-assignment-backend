const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const connectDB = require('./connectDB');


const userRoute = require('./routes/user');
const taskRoute = require('./routes/task');


dotenv.config();

const app = express(); 

const port = process.env.PORT || 8080;

// middlewares 
app.use(cors());
app.use(express.json());

// connecting to database 
connectDB();


// routes

// app.get('/', async (req, res) => {
//     res.send('Backend Working properly!')
// })

app.use('/user', userRoute);
app.use('/task', taskRoute);



app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
})