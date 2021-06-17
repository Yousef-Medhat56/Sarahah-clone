//GET the login page
const login_get = (req, res) => {
    //send the login page
    res.render('login', { title: "Log in" })
}

module.exports = { login_get }