const getCookie = (name) => {
    const cookieArr = document.cookie.split(";");
    for (let i = 0; i < cookieArr.length; i++) {
        const cookiePair = cookieArr[i].split("=");
        if (name === cookiePair[0].trim()) {
            return JSON.parse(decodeURIComponent(cookiePair[1]));
        }
    }
    return null;
}

const updateCookie = (cookieName, value) => {
    const cookieValue = getCookie(cookieName)
    if (cookieValue) {
        document.cookie = `${cookieName}=${JSON.stringify([...cookieValue, value])};max-age=${14*24*3600}`;
    } else {
        document.cookie = `${cookieName}=${JSON.stringify([value])};max-age=${14*24*3600}`;
    }
}
