
import React from 'react'
import '../styles/Store.css'
import { logoutRequest } from '../api'
import { useNavigate } from 'react-router-dom'
import { Routes, Route, Outlet } from 'react-router-dom'

function Store() {

    const navigate = useNavigate();

    function logout() {
        
        logoutRequest()
            .then(() => {
                navigate('/HomePage')
            })

    }

    return (
        <div>

            <header>
                <div className="storeHeaderDiv">

                    <span className="storeLink" onClick={logout}>🚪Log Out</span>
                    <span className="storeLink" onClick={ () => { navigate('/Store/Products') } }>🛍️Store</span>
                    <span className="storeLink" onClick={ () => { navigate('/Store/Cart') } }>🛒My Cart</span>
                    <span className="storeLink" onClick={ () => { navigate('/Store/Profile') } }>🧍Profile</span>
                    <span className="storeLink" onClick={ () => { navigate('/Store/Battle') } }>⚔️Battle</span>
                    
                </div>
            </header>

            <main>
                <Outlet />
            </main>

        </div>
        
    )
}

export default Store;
