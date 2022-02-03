import React from 'react'

import { useHistory } from 'react-router-dom'
import { authService } from '../firebase'
const LogOutBtn = () => {
    const history = useHistory();
    const onLogOutClick = ()=>{
        authService.signOut();
        history.push('/')
    }
    return <button className="logOutBtn" onClick={onLogOutClick}>Log Out</button>
}

export default LogOutBtn;
