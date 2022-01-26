import React from 'react'
import { useState } from 'react'
import { authService } from '../firebase'
import {createUserWithEmailAndPassword, signInWithEmailAndPassword,signInWithPopup,GoogleAuthProvider } from 'firebase/auth';

const Auth = () => {
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [newAccount, setnewAccount] = useState(true)
    const [error, seterror] = useState("")
    const onChange = (event) => {
        let {
            target : {name,value},
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
        <div>
            <form onSubmit={onSubmit}>
                <input onChange={onChange} value={email} name="email" type="text" placeholder="Email" required />
                <input onChange={onChange} value={password} name="password" type="password" placeholder="password" required autoComplete="on"/>
                <input type="submit" value={ newAccount ? "Create Account" : "Log In"} />
                { error }
            </form>
            <span onClick={toggleAccount}>{newAccount ? "Log In" : "Sign In"}</span>
            <div>
                <button onClick={onSocialClick} name="google">Continue with Google</button>
            </div>
        </div>
    );

}


export default Auth