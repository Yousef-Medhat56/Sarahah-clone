// control any request from FORM tags(sign up, login, update username, update password)
async function sendFormReq(e, path, method = "POST") {
    e.preventDefault()

    //select the form element
    const formElm = e.target
    try {

        // create FormData object
        const formData = new FormData(formElm);

        //convert FormData object to reqular javascript object
        const plainFormData = Object.fromEntries(formData.entries());

        //send the user data to the server
        const response = await fetch(path, {
            method: method,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(plainFormData),
        });

        const data = await response.json();

        //if the user input invalid data (make bad request)
        if (response.status === 400) throw data; //throw the errors object as error

        if (data.redirect) { //if the server redirect to another page
            location.assign(data.redirect)
        } else { //if the server send data to the page
            return new Promise((resolve, reject) => resolve(data))
        }

    } catch (err) {
        //create array for errors location
        const errKeysArr = Object.keys(err); //["username","email","password","confirmPassword"]

        let x = 0; // to control the numbers of shown errors to the user
        for (let errKey of errKeysArr) {
            formElm.querySelector(`.error.${errKey}`).innerHTML = ""; //reset all the error messages after each sumbit

            //show the first error only in the error object
            if (x < 1 && err[errKey]) {
                formElm.querySelector(`.error.${errKey}`).innerHTML = `<p class = "err-message"><i class="fas fa-exclamation-circle"></i> ${err[errKey]}</p>`; //write the error message
                x++; //to prevent any other error message from appearance in case there are more than one error
            }
        }
    }


}