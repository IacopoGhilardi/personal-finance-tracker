

export function getTokenFromBearer(token) {
    let splittedToken = token.split(' ');

    return splittedToken[1];
}