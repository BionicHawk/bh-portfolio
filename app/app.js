import express from 'express';
import ejs from 'ejs';
import path from 'path';

/**
 * @typedef Tecnology
 * @property {string} image
 * @property {string} name
 */

const app = express();
const ip = '192.168.1.142';
const port = 8080;

app.get('/', async (_, res) => {
    const template = await ejs.renderFile('./views/app/app.ejs');
    res.send(template);
});

app.get('/about', async (_, res) => {
    const frameworks = [
        {
            image: '/images/frameworks/aspnet.png',
            name: 'ASP.NET'
        },
        {
            image: '/images/frameworks/react.jpeg',
            name: 'React'
        },
        {
            image: '/images/frameworks/react.jpeg',
            name: 'React Native'
        },
        {
            image: '/images/frameworks/flutter.png',
            name: 'Flutter'
        },
        {
            image: '/images/frameworks/fastapi.jpeg',
            name: 'FastApi'
        },
        {
            image: '/images/frameworks/express.jpeg',
            name: 'Express JS'
        }
    ];
    
    /** @type Tecnology[] */
    const programmingLanguages = [
        {
            image: '/images/programming-languages/csharp.png',
            name: 'C#'
        },
        {
            image: '/images/programming-languages/js.png',
            name: 'Javascript'
        },
        {
            image: '/images/programming-languages/ts.png',
            name: 'Typescript'
        },
        {
            image: '/images/programming-languages/python.jpeg',
            name: 'Python'
        }
    ];

    /** @type Tecnology[] */
    const dbManagers = [
        {
            image: '/images/db/postgresql.png',
            name: 'Postgresql'
        },
        {
            image: '/images/db/sqlserver.jpg',
            name: 'MS SQL Server'
        }
    ];
    
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