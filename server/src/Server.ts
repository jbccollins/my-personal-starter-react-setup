import cookieParser from 'cookie-parser';
import express from 'express';
import logger from 'morgan';
import path from 'path';
import BaseRouter from './routes';

import { Request, Response } from 'express';
import { jwtCookieProps } from '@common';
import { IExampleData } from '@shared/types/ExampleData';
const derp: IExampleData = { id: "asdf" };

// Init express
const app = express();


// Add middleware/settings/routes to express.
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use('/api', BaseRouter);


/**
 * Serve front-end content.
 */
const viewsDir = path.join(__dirname, 'views');
app.set('views', viewsDir);

const staticDir = path.join(__dirname, 'public');
app.use(express.static(staticDir));

app.get('/', (req: Request, res: Response) => {
    res.redirect(301, '/login')
});

app.get('/users', (req: Request, res: Response) => {
    const jwt = req.signedCookies[jwtCookieProps.key];
    if (!jwt) {
        res.redirect(301, '/login');
    } else {
        res.sendFile('users.html', {root: viewsDir});
    }
});

app.get('/anotherpage', (req: Request, res: Response) => {
    const jwt = req.signedCookies[jwtCookieProps.key];
    if (!jwt) {
        res.redirect(301, '/login');
    } else {
        res.sendFile('anotherpage.html', {root: viewsDir});
    }
});

app.get('/login', (req: Request, res: Response) => {
    console.log(derp);
    res.sendFile('login.html', {root: viewsDir});
});

// app.use(express.static(__dirname + '../../../client/build'));

// app.get('/*', (req, res) => {
//     res.sendFile(path.join(__dirname + '../../../client/build/index.html'));
// });

// Export express instance
export default app;
