require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const bodyParser = require('body-parser'); 
app.use(bodyParser.json()); 
app.use(cors());

const db = require('./db');
const userRoutes = require('./routes/userRoutes');
 const blogRoutes = require('./routes/blogRoutes');



const PORT = process.env.PORT || 8000;

app.use('/api/auth', userRoutes);
 app.use('/api', blogRoutes);


app.get('/', (req, res) =>{
    res.json({
        message: 'Blog application API is working!'
    })
});

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});