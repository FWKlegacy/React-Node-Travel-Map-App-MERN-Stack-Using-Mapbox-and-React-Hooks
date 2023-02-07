const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const pinRoute = require('./routes/pins')
const userRoute = require('./routes/users')
const port = 3000;


dotenv.config();
app.use(express.json())

 mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("MongoDB connected!")
})
    .catch((err) =>
        console.log(err)
    );

app.use("/api/pins", pinRoute)
app.use("/api/users",userRoute)
app.listen(port, () => {
    console.log(`server started on port ${port}`)
})
    
