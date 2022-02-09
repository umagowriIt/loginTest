import React from "react";

const formError = ( { errors } : any ) => {

    return (
        <>
            {
                errors && errors.length > 0 ?
                errors.map( (err : string, index: number) => <span key={index} className="error">{err}</span>)
                :
                <>
                </>
            }
        </>
    )

}

export default formError;