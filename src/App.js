import AppRouter from "./components/Router";
import { useState,useEffect } from 'react'
import { authService } from './firebase'
function App() {
  const [init, setinit] = useState(false)
  const [isLogIn, setisLogIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user)=>{
      if(user){
        setisLogIn(true);
        setUserObj(user);
      }else{
        setisLogIn(false)
      }
      setinit(true);
    });
  }, [])
  return (

    <div>
      {init ? <AppRouter isLogIn={isLogIn} userObj={userObj}></AppRouter> : "Initializing..."}
      {/* <footer>&copy;{new Date().getFullYear()}WoongMunity </footer> */}
    </div>
  )
}

export default App;
