// https://medium.com/@SilentHackz/simple-way-to-secure-react-apps-using-jwt-and-react-router-2b4a05d780a3
import Cookies from 'js-cookie';
// For the related server TODO search for JWT_COOKIE_TODO
//
export const getSession = (jwt: string) => {
	// const jwt = Cookies.get('JwtCookieKey'); // TODO: Read from the cookie instead of from the parameter
	let session
	try {
		if (jwt) {
			const base64Url = jwt.split('.')[1]
			const base64 = base64Url.replace('-', '+').replace('_', '/')
			// what is window.atob ?
			// https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/atob
			session = JSON.parse(window.atob(base64))
		}
	} catch (error) {
			console.log(error)
	}
	return session
}

export const logOut = () => {
	Cookies.remove('JwtCookieKey')
}