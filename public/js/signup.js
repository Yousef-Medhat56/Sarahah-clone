// select DOM elements
const formElm = document.querySelector("form");

formElm.addEventListener("submit", async function (e) {
  e.preventDefault();
  try {
    // create FormData object
    const formData = new FormData(this);

    //convert FormData object to reqular javascript object
    const plainFormData = Object.fromEntries(formData.entries());

    //send the user data to the server
    const response = await fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(plainFormData),
    });

    const data = await response.json();

    //if the user input invalid data (make bad request)
    if (response.status === 400) throw data; //throw the errors object as error

    console.log(data);
  } catch (err) {
    //create array for errors location
    const errKeysArr = Object.keys(err); //["username","email","password","confirmPassword"]

    let x = 0; // to control the numbers of shown errors to the user
    for (let errKey of errKeysArr) {
      this.querySelector(`.error.${errKey}`).textContent = ""; //reset all the error messages after each sumbit

      //show the first error only in the error object
      if (x < 1 && err[errKey]) {
        this.querySelector(`.error.${errKey}`).textContent = err[errKey]; //write the error message
        x++; //to prevent any other error message from appearance in case there are more than one error
      }
    }
  }
});
