
import React from 'react'
import '../styles/Store.css'
import { logoutRequest } from '../api'
import { useNavigate } from 'react-router-dom'

function Store() {

    const navigate = useNavigate();

    function logout() {
        
        logoutRequest()
            .then(() => {
                navigate('/')
            })

    }






    return (
        <div>
            <header>
                <div className="storeHeaderDiv">

                    <span className="logOutSpan" onClick={logout}>🚪Log Out</span>
                    <span className="logOutSpan" onClick={logout}>🛒My Cart</span>
                    <span className="logOutSpan" onClick={logout}>💸Charge</span>
                    <span className="logOutSpan" onClick={logout}>🧍Profile</span>
                    <span className="logOutSpan" onClick={logout}>⚔️Battle</span>

                </div>
            </header>
            
        </div>
        
    )
}

export default Store;
