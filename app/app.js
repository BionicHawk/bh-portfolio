import express from 'express';
import ejs from 'ejs';
import path from 'path';

const app = express();
const port = 8080;

app.get('/', async (_, res) => {
    const template = await ejs.renderFile('./views/app/app.ejs');
    res.send(template);
});

app.get('/about', async (_, res) => {
    const template = await ejs.renderFile('./views/about/about.ejs');
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

app.listen(port, () => {
    console.log(`Server is listening at ${port}`);
})