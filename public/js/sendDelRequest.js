//send logout request
const sendLogoutReq = async() => {
    await fetch('/settings/logout', { method: "delete" })

    location.reload()
}

//send delete  account request
const sendDelAccReq = async() => {
    await fetch(`/settings/deleteAccount`, {
        method: "delete"
    })

    location.reload()
}