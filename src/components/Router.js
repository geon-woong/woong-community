import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Auth from '../routes/Auth';
import Home from '../routes/Home';
import Profile from '../routes/Profile';
import Navigation from './Navigation';

const AppRouter = ( { isLogIn,userObj } ) => {
    return(
        <Router>
            {isLogIn && <Navigation userObj={userObj}/>}
            <Switch>
                { 
                    isLogIn ? (
                        <>
                            <Route exact path="/">
                                <Home userObj={userObj}></Home>
                            </Route>
                            <Route exact path="/profile">
                                <Profile userObj={userObj}></Profile>
                            </Route>
                            <Redirect from="*" to="/" />
                        </>
                    ) : (
                        <>

                            <Route exact path="/">
                                <Auth></Auth>
                            </Route>
                        </>
                    )
                }
            </Switch>
        </Router>
        )
    }

export default AppRouter