import React from 'react'
import { useState } from 'react'
import { authService } from '../firebase'
import {createUserWithEmailAndPassword, signInWithEmailAndPassword,signInWithPopup,GoogleAuthProvider } from 'firebase/auth';
import '../config/App.scss'
const Auth = () => {
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [newAccount, setnewAccount] = useState(false)
    const [error, seterror] = useState("")


    const onChange = (event) => {
        let {
            target : {name, value},
        } = event;
        if(name === "email") {
            setemail(value);
        } else if (name === "password"){
            setpassword(value);
        };
    };
    const onSubmit = async(event) => {
        event.preventDefault();
        try{
            let data;
            if(newAccount){
                data = await createUserWithEmailAndPassword(
                    authService,
                    email,
                    password
                    );
            }else{
                data = await signInWithEmailAndPassword(
                    authService,
                    email,
                    password
                    );
            }
        } catch(error){
            seterror(error.message)
        }
    };

    const toggleAccount = ()=>{
        setnewAccount(prev=> !prev);
    }
    const onSocialClick = async(e)=> {
        const {target : { name },}= e;
        let provider;
        if(name==="google"){
            provider = new GoogleAuthProvider();
            const result = await signInWithPopup(authService, provider);
        }
    }

    return (
            <div className="logIn">
                    <h5>
                        {
                            newAccount ? "회원가입" : " "
                        }
                    </h5>
                    <div>
                        <form onSubmit={onSubmit}>
                            <input onChange={onChange} value={email} name="email" type="text" placeholder="Email" required />
                            <input onChange={onChange} value={password} name="password" type="password" placeholder="Password" required autoComplete="on" />
                            <input type="submit" value={newAccount ? "가입하기" : "로그인"} className="btn-login" />
                            {error}
                        </form>
                    </div>
                    <span name="toggle" onClick={toggleAccount}>{newAccount ? "로그인하기 " : "계정이 없으신가요?"}</span>
                    <span onClick={onSocialClick} name="google">Google Login</span>
            </div>
            
    );

}


export default Auth