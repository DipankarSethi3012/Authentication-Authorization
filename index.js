const express = require('express'); //importing express
const app = express(); //creating an instance for express
const cookieParser = require('cookie-parser');
// const cookiearserOne=require('cookie-parser');
require('dotenv').config(); //putting all stuff of env into process object

const PORT = process.env.PORT || 9000; //defining local host port number


app.use(express.json()); //using middleware
app.use(cookieParser);

const authRoutes = require('./routes/auth');
app.use("/api/v1", authRoutes);

app.get("/", (req, res) => {
    res.send("<h1>Learning Auth and Authr</h1>");
});

app.listen(PORT, () => {
    console.log(`server has successfully started at port ${PORT}`);
})

const dbConnect = require('./config/database');
// const auth = require('./models/auth');
// const cookieParser = require('cookie-parser');
dbConnect();