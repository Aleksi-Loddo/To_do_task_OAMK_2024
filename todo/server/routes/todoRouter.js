import { pool } from '../helpers/db.js';
import { Router } from 'express';
import { emptyOrRows } from '../helpers/utils.js';
import { auth } from '../helpers/auth.js';

const router = Router();

router.get('/', (req, res, next) => {
    pool.query('SELECT * FROM task', (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).json(emptyOrRows(result));
    })
});

router.post('/create', auth, (req, res, next) => {
    pool.query('INSERT INTO task (description) VALUES ($1) returning *', 
        [req.body.description], 
        (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).json({ id: result.rows[0].id }); //{description: result.rows[0].description}
    });
});

router.delete('/delete/:id', (req, res) => {
    const id = req.params.id;

    pool.query('DELETE FROM task WHERE id = $1', 
        [id], 
        (error, result) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        return res.status(200).json({ id: id });
    });
});

export default router;
