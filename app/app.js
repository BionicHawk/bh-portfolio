// @ts-check

import express from 'express';
import ejs from 'ejs';
import path from 'path';
import { dbManagers, frameworks, programmingLanguages } from './data/stack.js';

const app = express();
/** @type {string} */
const ip = process.env.IP ?? '127.0.0.1';
/** @type {number} */
const port = parseInt(process.env.PORT ?? '3000');
/** @type {string | undefined} */
const email = process.env.EMAIL

console.log(email)

app.get('/', async (_, res) => {

    const template = await ejs.renderFile('./views/app/app.ejs', {
        frameworks,
        programmingLanguages,
        dbManagers
    });

    res.send(template);
});

app.get('/about', async (_, res) => {
    
    const template = await ejs.renderFile('./views/about/about.ejs', {
        frameworks,
        programmingLanguages,
        dbManagers
    });
    res.send(template);
});

app.get('/projects', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
   const template = await ejs.renderFile('./views/projects/projects.ejs');
   res.send(template); 
});

app.get('/contact', async (_, res) => {
    const template = await ejs.renderFile('./views/contact/contact.ejs', {
        data: {
            email
        }
    });
    res.send(template);
})

app.use(express.static(path.resolve('./public')));

app.listen(port, ip, () => {
    console.log(`Server is listening at http://${ip}:${port}`);
})