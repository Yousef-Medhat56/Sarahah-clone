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

//send delete message request
const sendDelMsReq = async(e) => {

    //select delete message buttons
    const delMsgBtns = Array.from(document.getElementsByClassName(e.target.className)).reverse()


    const response = await fetch(`/settings/deleteMessage`, {
        method: "delete",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        //deleted message index
        body: JSON.stringify({ 'msgIndex': delMsgBtns.indexOf(e.target) })

    })
    const { messages } = await response.json()
    displayMessages(messages.reverse()) //display messages after delete a message

}


//display messages after delete a message
const displayMessages = (messages) => {
        //get the theme mode
        const theme = localStorage.getItem('dark') ? 'dark' : 'light'

        //select the messages container element
        const msgContainerElm = document.getElementById("messages-container")
        msgContainerElm.innerHTML = '' //reset the messages container element content 
        if (!messages.length) { //if there are no messages
            msgContainerElm.innerHTML = `
        <div class="empty-container background-${theme} ${theme}-text">
        <p>No messages yet, share your link with friends</p>
    </div>`
        } else {
            messages.forEach((msgObj, index) => {
                        //show messages
                        msgContainerElm.innerHTML +=

                            ` <!--message container-->
            <div class="message-container background-${theme}">
                <!--message content-->
                <!--check if the message is public-->
                <div class="msg-top">
                <!--add globe icon before the public message-->
                   ${msgObj.isPublic ? `<i class="fas fa-globe-americas public-icon"><p>public message</p></i>`:`<p></p>`}
                        
                <button onclick="sendDelMsReq(event)" class="del-msg ${theme}-text">
                    <i class="fas fa-times"></i></button>
                </div>
                <div class="message">
                    <p class = "message-content"></p>
                        <!--message date-->
                        <div class="message-date">
                            
                        </div>
                </div>
            </div>`

        //check the theme mode
        darkMode()
       //show thw message content
       document.getElementsByClassName("message-content")[index].textContent = msgObj.message
       //show thw message date
       document.getElementsByClassName("message-date")[index].textContent = msgObj.date
    })
    }

}