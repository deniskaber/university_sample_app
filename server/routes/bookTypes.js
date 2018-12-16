const Router = require('express-promise-router');
const db = require('../db');

const router = new Router();

const Controller = {
    getBookTypes: async (req, res) => {
        const {rows} = await db.query('SELECT * FROM book_types');
        res.json({
            success: true,
            data: rows,
        });
    },
};


router.get('/', Controller.getBookTypes);


module.exports = router;
