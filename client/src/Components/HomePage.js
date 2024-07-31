
import React from 'react'
import '../App.css'
import { loginRequest, signupRequest, enterStoreRequest } from '../api'
import { useNavigate } from 'react-router-dom'

function HomePage() {

    React.useEffect(() => {

        enterStoreRequest()
            .then(respond => respond.data)
            .then(data => {

                if (data.status) {
                    navigate('/Store')
                }

            })

    })

    const navigate = useNavigate();

    const [usernameError, setUsernameError] = React.useState('')
    const [passwordError, setPasswordError] = React.useState('')
    const [genericError, setGenericError] = React.useState('')

    const [isLogin, setIsLogin] = React.useState(true)

    const hour = new Date().getHours();
    const greeting = {
        prompt: '',
        emoji: '',
    }
    if (hour >= 5 && hour < 12) {
        greeting.prompt = 'Good Morning'
        greeting.emoji = '☀️'
    }
    else if (hour >= 12 && hour < 18) {
        greeting.prompt = 'Good Afternoon'
        greeting.emoji = '🌤️'
    }
    else if (hour >= 18 && hour < 22) {
        greeting.prompt = 'Good Evening'
        greeting.emoji = '⭐'
    }
    else {
        greeting.prompt = 'Good Night'
        greeting.emoji = '🌙'
    }

    // Checks validation of 
    function login() {

        resetErrors()

        let username = document.getElementById("usernameInput").value
        let password = document.getElementById("passwordInput").value

        let check = emptyFieldsCheck(username, password)
        if (check > 0) { return } // Failed

        loginRequest(username, password)
            .then(respond => respond.data)
            .then(data => {

                if (data.status) { // Username added succesfully
                    navigate('/Store')
                } else { // Username already exists!
                    setGenericError('User Name Or Password Are Incorrect!')
                }

            })

    }

    function signup() {

        resetErrors()

        const usernameRegex = /^[a-zA-Z0-9]+$/;
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        let username = document.getElementById("usernameInput").value
        let password = document.getElementById("passwordInput").value

        let check = emptyFieldsCheck(username, password)
        if (check > 0) { return } // Failed

        if (!usernameRegex.test(username)) { // Checks user name validity
            setUsernameError('User Name Can Contain Only English Letters And Numbers')
            check++
        }
        if (!passwordRegex.test(password)) { // Checks user name validity
            setPasswordError('password Needs To Contain At Least One Upper Case Letter, One Lower Case Letter, One Number, One Special Sign And At Least 8 Characters!')
            check++
        }

        if (check > 0) { return } // Failed

        signupRequest(username, password)
            .then(respond => respond.data)
            .then(data => {

                if (data.status) { // Username added succesfully
                    navigate('/Store')
                } else { // Username already exists!
                    setUsernameError('User Name Is Already Exists!')
                }

            })

    }

    function emptyFieldsCheck(username, password) {

        let check = 0

        if (username == "") { // Checks if user entered a username
            setUsernameError("You Must Enter A User Name!")
            check++
        }
        if (password == "") { // Checks if user entered a username
            setPasswordError("You Must Enter A Password!")
            check++
        }

        return check

    }

    function resetErrors() {
        
        setUsernameError("")
        setPasswordError("")
        setGenericError("")

    }

    return (
        <div className="CenterDiv">

            <h2>{isLogin ? `${greeting.prompt}, User! ${greeting.emoji}` : `New here? Make a User! 😄`}</h2>

            <span>User Name</span>
            <br />
            {
                usernameError && 
                <div>
                    <span className="ErrorUsernameSpan">{usernameError}</span>
                    <br />
                </div>
            }
            <input id="usernameInput" type="text" />
            <br />
            <span>Password</span>
            <br />
            {
                passwordError && 
                <div>
                    <span className="ErrorUsernameSpan">{passwordError}</span>
                    <br />
                </div>
            }
            <input id="passwordInput" type="text" />
            <br />
            {
                genericError &&
                <div>
                    <span className="ErrorUsernameSpan">{genericError}</span>
                </div>
            }
            <button className="HomePageButton" onClick={() => {

                    setIsLogin(!isLogin)
                    resetErrors()

                } }>{isLogin ? "Sign Up" : "Login"}</button>
            <button className="HomePageButton" onClick={isLogin ? login : signup}>Enter</button>

        </div>
    )
}

export default HomePage;
