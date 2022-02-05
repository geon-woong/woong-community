import React from 'react'
import { Link } from 'react-router-dom'
import MainTitle from './MainTitle'
const Navigation = ({userObj})=>{
    return(
        <>
            <MainTitle></MainTitle>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/profile">{userObj.displayName}Profile</Link>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Navigation;