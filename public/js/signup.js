// select DOM elements
const formElm = document.querySelector("form")

formElm.addEventListener("submit", async function(e) {
    e.preventDefault()
    try {

        // create FormData object
        const formData = new FormData(this)

        //convert FormData object to reqular javascript object
        const plainFormData = Object.fromEntries(formData.entries());



        //send the user data to the server
        const response = await fetch('/signup', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(plainFormData)

        })

        const userData = await response.json()
        console.log(userData)
    } catch (err) {
        console.log(err)
    }
})