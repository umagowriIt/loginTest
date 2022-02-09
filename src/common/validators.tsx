import { validators } from "../constants/validations";

// validates the required form fields
// curval --> value entered by user
// validatorsList --> validators.VALIDATE_BLANK | validators.VALIDATE_EMAIL
export const validateLoginObj = (curVal : string, validatorsList : string[]) : string[] => {
    let result : string[] = [];
    validatorsList.forEach( validatorItm => {
        switch(validatorItm) {
            case validators.VALIDATE_BLANK :
                if(!curVal || curVal.trim() === "") {
                    result.push("Field cannot be empty")
                }
            break;

            case validators.VALIDATE_EMAIL :
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

                if(!emailRegex.test(curVal) ) {
                    result.push("Email should be valid")
                }
            break;
        }
    });

    return result;
}