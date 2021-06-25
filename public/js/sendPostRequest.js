// send POST request to change the user image
const sendChangeImgReq = async(e) => {
    //get the image 
    const file = e.target.files[0]
    const formData = new FormData
    formData.append("image", file)

    //send POST request
    await fetch(`/image${location.pathname}`, {
        method: "POST",
        body: formData,
    })

    //reload the page after getting the response
    location.reload()
}