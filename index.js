import express from 'express';
import path from 'path';
import bodyParser from "body-parser";
import pg from 'pg';
import dotenv from 'dotenv';

import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));


const PORT = 3000
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const tasks = [];

dotenv.config();

console.log(typeof(process.env.DB_PASSWORD));


const db = new pg.Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

db.connect()
    .then(() => {
    console.log('Connected to PostgreSQL database');
    })
    .catch(error => {
    console.error('Error connecting to PostgreSQL:', error);
    });




app.get("/", (req, res) => {
    res.render("index.ejs");
});




app.post("/add-task", async(req, res)    =>{
    const item = req.body.newTask.trim()
    console.log(item);

    await db.query('INSERT INTO tasks (task_name, status) VALUES ($1, false)', [item]);

    tasks.push(item);
    res.render("index.ejs", {tasks});
})

app.post("/update-task-status", async (req, res) => {
    try {
        const { taskCheckbox } = req.body;
        const taskId = taskCheckbox;

        console.log(req.body);
/*
        const isChecked = req.body[taskCheckbox] === 'on';

        // Update the task status in the database
        await client.query('UPDATE tasks SET status = $1 WHERE task_id = $2', [isChecked ? 'completed' : 'pending', taskId]);
*/
        res.redirect("/"); // Redirect to the home page or wherever you want to go after the update
    } catch (error) {
        console.error('Error updating task status in the database:', error);
        res.status(500).send('Internal Server Error');
    }
});


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
