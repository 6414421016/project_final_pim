import React from 'react'
import '../Navbar/navbar.css'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <>
    <div>
        <div className='navbar-container'>
            <ul>
                <Link to='/' style={{margin: "0 1rem", color: "white", textDecoration: "none" }}>Home</Link>
                <Link to='/chat' style={{margin: "0 1rem", color: "white", textDecoration: "none" }}>Chat</Link>
                <Link to='/form' style={{margin: "0 1rem", color: "white", textDecoration: "none" }}>AddData</Link>
                <Link to='/admin' style={{margin: "0 1rem", color: "white", textDecoration: "none" }}>Admin</Link>
            </ul>
        </div>
    </div>
    </>
  )
}
