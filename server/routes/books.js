const Router = require('express-promise-router');
const db = require('../db');
const helpers = require('../helpers');

const router = new Router();

const Controller = {
    getBooks: async (req, res) => {
        const {rows} = await db.query('SELECT * FROM books');
        res.json({
            success: true,
            data: rows,
        });
    },

    addBook: async (req, res) => {
        const {
            name,
            count,
            type_id,
        } = req.body;

        let result;

        try {
            result = await db.query(`
                INSERT INTO books(name, count, type_id)
                VALUES($1, $2, $3)
                RETURNING *
                `,
                [name, count, type_id],
            );
        } catch (error) {
            helpers.setResponseError(res, error.message);
            return;
        }

        const {rows} = result;

        res.json({
            success: true,
            data: rows,
        });
    },

    updateBook: async (req, res) => {
        const {
            id,
            name,
            count,
            type_id,
        } = req.body;

        let result;

        try {
            result = await db.query(`
                UPDATE books
                set name = $2,
                    count = $3,
                    type_id = $4
                WHERE id = $1
                RETURNING *
                `,
                [id, name, count, type_id],
            );
        } catch (error) {
            helpers.setResponseError(res, error.message);
            return;
        }

        const {rows} = result;

        res.json({
            success: true,
            data: rows[0],
        });
    },

    deleteBook: async (req, res) => {
        const id = req.params.id;

        try {
            await db.query(`
                DELETE FROM books WHERE id = $1`,
                [id],
            );
        } catch (error) {
            helpers.setResponseError(res, error.message);
            return;
        }

        res.json({
            success: true,
        });
    }
};


router.get('/', Controller.getBooks);
router.put('/', Controller.addBook);
router.post('/:id', Controller.updateBook);
router.delete('/:id', Controller.deleteBook);


module.exports = router;
