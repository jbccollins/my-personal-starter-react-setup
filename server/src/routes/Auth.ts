import bcrypt from 'bcrypt';
import { Request, Response, Router } from 'express';
import { BAD_REQUEST, OK, UNAUTHORIZED } from 'http-status-codes';
import { UserDao } from '@daos';
import { JwtCookieKey } from '@shared/constants/auth';
import {
	LOGIN,
	LOGOUT,
	SIGNUP,
} from "@shared/constants/urls";

import {
	paramMissingError,
	loginFailedErr,
	logger,
	jwtCookieProps,
	JwtService,
	userAlreadyExistsError,
	pwdSaltRounds,
} from '@common';
import { User as SharedUser, UserRoles } from '@shared/types/User';
import User from '@database/models/User';

const router = Router();
const jwtService = new JwtService();

/******************************************************************************
 *                      Login User - "POST /api/auth/login"
 ******************************************************************************/

router.post(LOGIN, async (req: Request, res: Response) => {
	try {
		// Check email and password present
		const { email, password } = req.body;
		if (!(email && password)) {
			return res.status(BAD_REQUEST).json({
				error: paramMissingError,
			});
		}
		// Fetch user
		const user = await User.findOne({ where: { email } })
		if (!user) {
			return res.status(UNAUTHORIZED).json({
				error: loginFailedErr,
			});
		}
		// Check password
		const pwdPassed = await bcrypt.compare(password, user.pwdHash);
		if (!pwdPassed) {
			return res.status(UNAUTHORIZED).json({
				error: loginFailedErr,
			});
		}
		// Setup Admin Cookie
		const jwt = await jwtService.getJwt(user);
		const { key, options } = jwtCookieProps;
		/* TODO: Properly use the 'set-cookie' header.
				I cannot get this to work on localhost. The 'set-cookie' header should modify document.cookie
				but it doesn't. We should be able to read this client-side but instead we have to pass it as json.
				For the related client TODO search for JWT_COOKIE_TODO
		*/
		res.cookie(key, jwt, options);
		// Return
		return res.status(OK).json({
			[JwtCookieKey]: jwt
		});
	} catch (err) {
		logger.error(err.message, err);
		return res.status(BAD_REQUEST).json({
			error: err.message,
		});
	}
});

/******************************************************************************
 *                      Login User - "POST /api/auth/signup"
 ******************************************************************************/

router.post(SIGNUP, async (req: Request, res: Response) => {
	try {
		// Check email and password present
		// TODO: Type this structure
		const { email, plaintextPassword, firstName, lastName } = req.body;
		if (!(email && plaintextPassword && firstName && lastName)) {
			return res.status(BAD_REQUEST).json({
				error: paramMissingError,
			});
		}
		// Fetch user
		const existingUser = await User.findOne({ where: { email } });
		if (existingUser) {
			return res.status(UNAUTHORIZED).json({
				error: userAlreadyExistsError,
			});
		}
		// Encrypt password
		const pwdHash = await bcrypt.hash(plaintextPassword, pwdSaltRounds);

		const user: User = User.build({
			firstName,
			lastName,
			email,
			pwdHash,
			role: UserRoles.Standard
		});

		// TODO: Remove the persistence here and have the user follow an email link to confirm signup
		// Persist to DB
		await user.save();

		// Setup Admin Cookie
		const jwt = await jwtService.getJwt(user);
		const { key, options } = jwtCookieProps;
		/* TODO: Properly use the 'set-cookie' header.
				I cannot get this to work on localhost. The 'set-cookie' header should modify document.cookie
				but it doesn't. We should be able to read this client-side but instead we have to pass it as json.
				For the related client TODO search for JWT_COOKIE_TODO
		*/
		res.cookie(key, jwt, options);
		// Return
		return res.status(OK).json({
			[JwtCookieKey]: jwt
		});
	} catch (err) {
		logger.error(err.message, err);
		return res.status(BAD_REQUEST).json({
			error: err.message,
		});
	}
})


/******************************************************************************
 *                      Logout - "GET /api/auth/logout"
 ******************************************************************************/

router.get(LOGOUT, async (req: Request, res: Response) => {
	try {
		const { key, options } = jwtCookieProps;
		res.clearCookie(key, options);
		return res.status(OK).end();
	} catch (err) {
		logger.error(err.message, err);
		return res.status(BAD_REQUEST).json({
			error: err.message,
		});
	}
});


/******************************************************************************
 *                                 Export Router
 ******************************************************************************/

export default router;
