import cookieParser from 'cookie-parser';
import express from 'express';
import logger from 'morgan';
import path from 'path';
import BaseRouter from './routes';
import { sequelize } from './database/sequelize';
import User from './database/models/User';
import { UserRoles } from "@shared/types/User";

import { Request, Response } from 'express';
import { jwtCookieProps } from '@common';

// Init express
const app = express();


// Add middleware/settings/routes to express.
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use('/api', BaseRouter);

const initDB = async () => {
	try {
		await sequelize.authenticate();
		console.log('Connection has been established successfully.');
		await sequelize.sync({ force: true });
		console.log('Database has been synced');
		const james: User = User.build({
			firstName: "James",
			lastName: "Collins",
			email: "derp2@derp.com",
			pwdHash: "sdkfjdlsfj02349ru5240t9u23409q3049r58oqejg-w0j98j",
			role: UserRoles.Standard
		});
		console.log(
			james.firstName,
			james.lastName,
			james.email,
			james.pwdHash,
		);
		await james.save();
		console.log('James was saved');
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
}

initDB();

/**
 * Serve front-end content.
 */
// const viewsDir = path.join(__dirname, 'views');
// app.set('views', viewsDir);

// const staticDir = path.join(__dirname, 'public');
// app.use(express.static(staticDir));

// app.get('/', (req: Request, res: Response) => {
//     const jwt = req.signedCookies[jwtCookieProps.key];
//     if (!jwt) {
//         res.redirect(301, '/login')
//     } else {
//         res.sendFile(path.join(__dirname + '../../../client/build/index.html'));
//     }
// });

// app.get('/users', (req: Request, res: Response) => {
//     const jwt = req.signedCookies[jwtCookieProps.key];
//     if (!jwt) {
//         res.redirect(301, '/login');
//     } else {
//         res.sendFile('users.html', {root: viewsDir});
//     }
// });

// app.get('/anotherpage', (req: Request, res: Response) => {
//     const jwt = req.signedCookies[jwtCookieProps.key];
//     if (!jwt) {
//         res.redirect(301, '/login');
//     } else {
//         res.sendFile('anotherpage.html', {root: viewsDir});
//     }
// });

// app.get('/login', (req: Request, res: Response) => {
//     const jwt = req.signedCookies[jwtCookieProps.key];
//     if (!jwt) {
//         res.sendFile('login.html', {root: viewsDir});
//     } else {
//         res.sendFile(path.join(__dirname + '../../../client/build/index.html'));
//     }
// });
/** END SERVE CONTENT */

app.use(express.static(__dirname + '../../../client/build'));

app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname + '../../../client/build/index.html'));
});

// Export express instance
export default app;
