//handle user errors during authentication
const handleErrors = (errorsObj, errMsgObj, errorCode = null) => {


    /*errMessagesObj = {
        key : the error location (for example : the username field)
        value : the error message
    } */

    //check if the email is already registered (not unique)
    if (errorCode) errMsgObj["email"] = "This email is already registered"

    //if the email is registered but there are other errors
    else if (errorsObj) {
        // convert the errors object to array
        const errorsArr = Object.values(errorsObj)
        errorsArr.forEach(({ properties }) => { //destructing the properties object 

            /*assign the error message to the error location
            for example:
            errMessagesObj[email] = "This email is already registered"*/
            errMsgObj[properties.path] = properties.message
        })
    }

    return errMsgObj
}
module.exports = handleErrors