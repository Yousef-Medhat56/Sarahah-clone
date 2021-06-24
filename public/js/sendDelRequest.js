//send logout request
const sendLogoutReq = async() => {
    const response = await fetch('/logout', { method: "delete" })
    const data = await response.json()
    location.assign(data.redirect)
}

//send delete  account request
const sendDelAccReq = async() => {
    const response = await fetch(`/delete-account${location.pathname}`, {
        method: "delete"
    })
    const data = await response.json()
    location.assign(data.redirect)
}