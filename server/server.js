const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    credentials:true,
    origin:'http://localhost:3000'
    })
);
-
require('dotenv').config();
require('./config/mongoose.config');
const ReviewRoutes = require('./routes/review.routes');
ReviewRoutes(app)

app.listen(8000, ()=> {
    console.log(`Server is running on port ${PORT}`)
})