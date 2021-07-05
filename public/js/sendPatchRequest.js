// send patch request to change the user image
const sendChangeImgReq = async(e) => {

    //reset messages
    document.querySelector('.server-msg').innerHTML = ''
    document.querySelector('.error.image').innerHTML = ''

    //valid image formats
    const allowedExtensions =
        /(\.jpg|\.jpeg|\.png)$/i;

    //check that the image format is valid
    if (allowedExtensions.exec(e.target.value)) {
        //get the image 
        const file = e.target.files[0]
        const formData = new FormData
        formData.append("image", file)

        //send PATCH request
        const respone = await fetch(`/settings/profile/image`, {
            method: "PATCH",
            body: formData,
        })

        try {
            const { image, message } = await respone.json()

            const userImgElm = document.getElementById("user-avatar")

            //update the user image in the profile page without refreshing the page
            userImgElm.setAttribute("src", `data:image/png;base64,${image}`)

            //show success updating message to the user
            document.querySelector('.server-msg').innerHTML = `<p class= 'success-msg'><i class="fas fa-check-circle"></i> ${message}</p>`

        } catch (err) {
            //show message error
            document.querySelector('.error.image').innerHTML = `<p class = "err-message"><i class="fas fa-exclamation-circle"></i> an error happened, please try again</p>`;
        }
    }
    //if the file format is not valid
    else {
        //ignore the selected file
        e.target.value = ''
    }

}