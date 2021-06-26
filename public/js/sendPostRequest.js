// send POST request to change the user image
const sendChangeImgReq = async(e) => {

    //valid image formats
    const allowedExtensions =
        /(\.jpg|\.jpeg|\.png)$/i;

    //check that the image format is valid
    if (allowedExtensions.exec(e.target.value)) {
        //get the image 
        const file = e.target.files[0]
        const formData = new FormData
        formData.append("image", file)

        //send POST request
        await fetch(`/settings/profile/image`, {
            method: "POST",
            body: formData,
        })

        //reload the page after getting the response
        location.reload()
    }
    //if the file format is not valid
    else {
        //ignore the selected file
        e.target.value = ''
    }

}