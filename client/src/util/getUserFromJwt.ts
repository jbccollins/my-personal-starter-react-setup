// https://medium.com/@SilentHackz/simple-way-to-secure-react-apps-using-jwt-and-react-router-2b4a05d780a3
//import Cookies from 'js-cookie';
import { User } from 'shared/types/User';
// For the related server TODO search for JWT_COOKIE_TODO
//
export const getUserFromJwt = (jwt: string) => {
	// const jwt = Cookies.get('JwtCookieKey'); // TODO: Read from the cookie instead of from the parameter
	let user: User | null = null;
	try {
		if (jwt) {
			const base64Url = jwt.split('.')[1]
			const base64 = base64Url.replace('-', '+').replace('_', '/')
			// what is window.atob ?
			// https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/atob
			user = User.fromJSON(JSON.parse(window.atob(base64)));
		}
	} catch (error) {
			console.log(error)
	}
	return user
}