const Router = require('express-promise-router');
const db = require('../db');

const router = new Router();

const Controller = {
    getJournal: async (req, res) => {
        const { rows } = await db.query('SELECT * FROM journal');

        res.json({data: rows});
    },
};


router.get('/', Controller.getJournal);


module.exports = router;
