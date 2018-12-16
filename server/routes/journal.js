const Router = require('express-promise-router');
const db = require('../db');
const helpers = require('../helpers');

const router = new Router();

const Controller = {
    getJournal: async (req, res) => {
        const { rows } = await db.query('SELECT * FROM journal');

        res.json({data: rows});
    },

    takeBook: async (req, res) => {
        const {
            client_id,
            book_id,
        } = req.body;

        try {
            await db.query(
                `SELECT public.take_book($1, $2)`,
                [book_id, client_id],
            );
        } catch (error) {
            helpers.setResponseError(res, error.message);
            return;
        }

        res.json({
            success: true,
        });
    },

    returnBook: async (req, res) => {
        const {
            id,
        } = req.body;

        try {
            await db.query(`
                UPDATE journal
                set date_ret = NOW()
                WHERE id = $1
                RETURNING *
                `,
                [id],
            );
        } catch (error) {
            helpers.setResponseError(res, error.message);
            return;
        }

        res.json({
            success: true,
        });
    },
};


router.get('/', Controller.getJournal);
router.put('/take', Controller.takeBook);
router.post('/return', Controller.returnBook);


module.exports = router;
