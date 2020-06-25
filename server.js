if (process.env.NODE_ENV !== 'production') {

    require('dotenv').config();
}

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');


const indexRouter = require('./routes/index');
const authorRouter = require('./routes/authors');

app.set('view engine', 'ejs');
//tell your express application where your views are coming from
app.set('views', __dirname + '/views');
//tell your express application where your layout is coming from
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
//public folder will hold all the files such as javascript image rendering
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, { useUnifiedTopology: true, useNewUrlParser: true });

//Just for checking purpose if we are connected to database or not.
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to mongoose!!'));


//Here, it is saying that to control our root page, indexRouter will be used.
app.use('/', indexRouter);
//Here, it says that every route in author route file (authors.js) is gonna be padded by the authors/
app.use('/authors', authorRouter);

//when we will deoloy our app then the server will tell us the port it is listening to not us.
app.listen(process.env.PORT || 3000);