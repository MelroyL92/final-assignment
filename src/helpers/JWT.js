import jwt_decode from 'jwt-decode';

export function validateToken(token) {
    try {
        const decodedToken = jwt_decode(token);

        if (decodedToken.exp * 1000 < Date.now()) {
            return { isValid: false, decodedToken: null };
        } else {
            return { isValid: true, decodedToken };
        }
    } catch (error) {
        console.error(error);
        return { isValid: false, decodedToken: null };
    }
}


