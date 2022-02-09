import React, { useState } from 'react';
import { validators } from '../../constants/validations';
import { loginUser } from '../../services/login';
import Errors from './formError';
import './Login.scss';
import { loginDataInterface, loginInterface } from '../../interfaces/login';
import { validateLoginObj } from '../../common/validators';

const Login = () => {

    const initFormData : loginInterface= { email: { value : "", errors : [] } , password: { value : "", errors : [] }};

    const [formObj, setFormObj ] = useState(initFormData);
    const [ formErr, setFormErr] = useState([] as string[]);
    const [ loading , setLoading ] = useState(false);
    
    const [rememberMe, setRememberMe ] = useState(false);

    
    // handles the state change when user inputs the form
    // type --> "email | password"
    // e --> event fired
    const handleChange = (type : string, e : any) => {

        setFormErr([])

        const curval = e.target.value;

        switch(type) {
           case "email" :
                const emailErrors : string[] = validateLoginObj(curval, [validators.VALIDATE_BLANK, validators.VALIDATE_EMAIL])

                setFormObj({...formObj, email : {value : curval, errors: emailErrors, isTouched : true }})
               
           break;

           case "password" :
                const pwErrors : string[] = validateLoginObj(curval, [validators.VALIDATE_BLANK])
                setFormObj({...formObj, password : { value: curval, errors : pwErrors , isTouched : true}})
               
           break;

       }

    };


    const handleRememberChange = () => {
        setRememberMe(!rememberMe);
    }

    // checks to see if the form button is disabled or not
    const isSubmitDisabled = () : boolean => {

        if(loading) {
            return true;
        }

        const { email, password} = formObj;

        if ( (email && email.isTouched && email.errors && email.errors.length === 0) && 
         (password && password.isTouched && password.errors && password.errors.length === 0)
        ) {
            return false;
        } else {
            return true;
        }
    }

    // handles form submit when clicked on the submit button
    // e --> event fired object
    const handleFormSubmit = async (e : any) => {
        e.preventDefault();
        setLoading(true);

        let loginData : any = {} ;
       
        for (const [key, value] of Object.entries(formObj)) {
            loginData[key] = value.value;
        }
        

        loginUserApi(loginData);

    }

    // handles the state change when user inputs the form
    // loginData -->  { email : "", password : ""}
    const loginUserApi = async(loginData : loginDataInterface) => {
        try {
            const formSubmit = await loginUser(loginData);
            setLoading(false);
        } catch (err : any) {
            setLoading(false);
            setFormErr(["An error occured while trying to save the form"]);
        }
    }

    const submitText = loading ? "Loading..." : "Sign In";
 
    return (
        <>
            <div className='loginWrap'>
                <h3>Sign In</h3>
                <form onSubmit={handleFormSubmit}>
                    <fieldset>
                        <label>Email</label>
                        <input autoComplete='off' type="text" value={formObj.email.value} onChange={(e) => handleChange("email", e) }  />
                        <Errors errors = {formObj.email.errors} />
                    </fieldset>

                    <fieldset>
                        <label>Password</label>
                        <input autoComplete='off' type="password" value={formObj.password.value}  onChange={(e) => handleChange("password", e) } />
                        <Errors errors = {formObj.password.errors} />
                    </fieldset>

                    <fieldset className='row'>
                        <input type="checkbox" onChange={handleRememberChange} />
                        <label>Remember me?</label>
                    </fieldset>
                    <Errors errors = {formErr} />                    

                    <input disabled={isSubmitDisabled()} className='btn' type="submit"  value={submitText} />

                </form>

                <p><a href="#">Forgot your password?</a></p>
                <p>Don't have an account? <a href="#">Sign up</a></p>
                <p><a href="#">Resend email confirmation</a></p>
            </div>
        </>
    )
};

export default Login; 