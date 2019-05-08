const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors')

const dbConfig = require('./config/secret')

const app = express();

const PORT = 3000;
const host = `http://localhost:${PORT}`;

/**
 * middleware
 */

app.use(cors());

app.use((req, res, next) => {
    res.header('Access-Control-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET', 'POST', 'DELETE', 'PUT', 'OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-requested-with, Contrent-Type, Accept, Authorization');
    next();
})


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser());

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, { useNewUrlParser: true});

const auth = require('./routes/authRoutes');
const posts = require('./routes/postRoutes');

app.use('/api/website', auth);
app.use('/api/website', posts);

app.listen(PORT, () => {
    console.log(`Running on ${host}`)
})