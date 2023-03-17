export function isEmail(pEmail: string) {
    let validRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi;

    if (pEmail.endsWith('.')){
        return false;
    }

    if (pEmail.match(validRegex)) {
        return true;
    } else {
        return false;
    }
}