const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

router.get('/animals', (req, res) => {
    console.log('Getting animals from DB');
    const queryText = `SELECT s.id, s.species_name, c.class_name FROM "species" as s
                        JOIN "class" as c on s.class_id = c.id;`;
    
    pool.query(queryText).then(result => {
        console.log('Retrieved animals successfully');
        res.send(result.rows).status(200);
    }).catch(err => {
        console.log('Error in Get', err);
        res.sendStatus(500);
    });
});

router.get('/classes', (req, res) => {
    console.log('retrieving classes');
    const queryText = `SELECT * FROM "class";`;

    pool.query(queryText).then(result => {
        console.log('Retrived classes successfully');
        res.send(result.rows).status(200);
    }).catch(err => {
        console.log('Error in getting classes', err);
        res.sendStatus(500);
    });
});

router.post('/animals', (req, res) => {
    console.log('Adding animal to DB');
    const queryText = `INSERT INTO "species" ("species_name", "class_id")
                        VALUES ($1, $2);`
    
    pool.query(queryText, [req.body.name, req.body.class]).then(() => {
        console.log('Animal added successfully');
        res.sendStatus(201);
    }).catch(err => {
        console.log('Error in post', err);
        res.sendStatus(500);
    });
});

router.post('/classes', (req, res) => {
    console.log('Adding class to DB');
    const queryText = `INSERT INTO "class" ("class_name")
                        VALUES ($1);`

                        console.log(req.body)
    
    pool.query(queryText, [req.body.newClass]).then(() => {
        console.log('Class added successfully');
        res.sendStatus(201);
    }).catch(err => {
        console.log('Error in post', err);
        res.sendStatus(500);
    });
});

module.exports = router;