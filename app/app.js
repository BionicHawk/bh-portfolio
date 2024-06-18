import express from 'express';
import ejs from 'ejs';
import path from 'path';
import { dbManagers, frameworks, programmingLanguages } from './data/stack.js';

/**
 * @typedef Tecnology
 * @property {string} image
 * @property {string} name
 */

const app = express();
const ip = '192.168.1.142';
const port = 8080;

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

app.get('/projects', async (_, res) => {
   const template = await ejs.renderFile('./views/projects/projects.ejs');
   res.send(template); 
});

app.get('/contact', async (_, res) => {
    const template = await ejs.renderFile('./views/contact/contact.ejs');
    res.send(template);
})

app.use(express.static(path.resolve('./public')));

app.listen(port, ip, () => {
    console.log(`Server is listening at http://${ip}:${port}`);
})