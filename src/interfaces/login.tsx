
export interface loginField {
    value: string,
    errors?  : string[],
    isTouched? : boolean
}

export interface loginInterface {
    email : loginField,
    password: loginField,
}

export interface loginDataInterface {
    email : string ,
    password: string
}