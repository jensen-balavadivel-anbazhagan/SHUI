const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 8081;

// middlewares 

app.use(cors());
app.use(express.json());

//routes
const addUserRoutes = require('./routes/userRoute');
const streamsRoutes = require('./routes/streamsRoute')

app.use('/user', addUserRoutes);
app.use('/streams', streamsRoutes);


app.listen(PORT, "0.0.0.0", () =>
    console.log(`Server up and running on port: ${PORT}`)
);