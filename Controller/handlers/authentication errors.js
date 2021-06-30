//handle user errors during authentication
const handleErrors = (errorsObj, errMsgObj) => {


    /*errMessagesObj = {
        key : the error location (for example : the username field)
        value : the error message
    } */

    //check if the username or the email are already registered (not unique)
    if (errorsObj.code) {
        const key = Object.keys(errorsObj.keyValue)[0] //username or email

        errMsgObj[key] = `This ${key} is already registered` //error message
    }


    //if the email is registered but there are other errors
    else if (errorsObj) {
        // convert the errors object to array
        const errorsArr = Object.values(errorsObj.errors)
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