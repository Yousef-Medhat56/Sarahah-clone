const showMsgs = () => {
    const container = document.querySelector(".messages-container");
    const boxIcon = document.querySelector(".msg-heading i");
    container.classList.toggle("full-container");
    boxIcon.classList.toggle("box-icon-clicked");
};