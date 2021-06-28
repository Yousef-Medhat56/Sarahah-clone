//send logout request
const sendLogoutReq = async() => {
    const response = await fetch('/settings/logout', { method: "delete" })
    const data = await response.json()
    location.assign(data.redirect)
}

//send delete  account request
const sendDelAccReq = async() => {
    const response = await fetch(`/settings/deleteAccount`, {
        method: "delete"
    })
    const data = await response.json()
    location.assign(data.redirect)
}