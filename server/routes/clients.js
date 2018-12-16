const Router = require('express-promise-router');
const db = require('../db');
const helpers = require('../helpers');

const router = new Router();

const Controller = {
    getClients: async (req, res) => {
        const {rows} = await db.query('SELECT * FROM clients');
        res.json({
            success: true,
            data: rows,
        });
    },

    createClient: async (req, res) => {
        const {
            first_name,
            last_name,
            pather_name,
            passport_seria,
            passport_num,
        } = req.body;

        let result;

        try {
            result = await db.query(`
                INSERT INTO clients(first_name, last_name, pather_name, passport_seria, passport_num)
                VALUES($1, $2, $3, $4, $5)
                RETURNING *
                `,
                [first_name, last_name, pather_name, passport_seria, passport_num],
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

    updateClient: async (req, res) => {
        const {
            id,
            first_name,
            last_name,
            pather_name,
            passport_seria,
            passport_num,
        } = req.body;

        let result;

        try {
            result = await db.query(`
                UPDATE clients
                set first_name = $2,
                    last_name = $3,
                    pather_name = $4,
                    passport_seria = $5,
                    passport_num = $6
                WHERE id = $1
                RETURNING *
                `,
                [id, first_name, last_name, pather_name, passport_seria, passport_num],
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

    deleteClient: async (req, res) => {
        const id = req.params.id;

        try {
            await db.query(`
                DELETE FROM clients WHERE id = $1`,
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


router.get('/', Controller.getClients);
router.put('/', Controller.createClient);
router.post('/:id', Controller.updateClient);
router.delete('/:id', Controller.deleteClient);


module.exports = router;
