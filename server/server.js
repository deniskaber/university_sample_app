require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const clientsRouter = require('./routes/clients');
const booksRouter = require('./routes/books');
const bookTypesRouter = require('./routes/bookTypes');
const journalRouter = require('./routes/journal');

const app = express();
const port = 3001;

app.use(bodyParser.json());

// add CORS headers for local development
app.use('/', (req, res, next) => {
    res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
    });

    next();
});

app.use('/api/clients', clientsRouter);
app.use('/api/books', booksRouter);
app.use('/api/bookTypes', bookTypesRouter);
app.use('/api/journal', journalRouter);

app.listen(port, () => console.log(`Server is listening on port ${port}!`));
