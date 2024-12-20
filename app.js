

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config(); 
const userRoutes = require('./routes/userRoutes'); 
const transactionRoutes = require('./routes/transactionRoutes'); 
const rateLimit = require('express-rate-limit');


const app = express();


app.use(cors()); 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Database connected successfully'))
    .catch(err => console.log('Database connection failed:', err));

    const limiter = rateLimit({
        windowMs: 60 * 60 * 1000, 
        max: 100, 
        message: 'Too many requests from this IP, please try again later.'
    });
    
    app.use(limiter);


app.use('/api/users', userRoutes); 
app.use('/api/transactions', transactionRoutes); 


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
