import React from 'react'
import LogOutBtn from '../components/LogOutBtn'
import { useEffect } from 'react'
import { collection, getDocs, query, where } from "@firebase/firestore";

import { firebaeDb } from '../firebase';

const Profile= ({userObj})=>{

    const getMyPosts = async () => {
        const q = query(
        collection(firebaeDb, "contents"),
        where("creatorId", "==", `${userObj.uid}`)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        });
        };

    useEffect(() => {
        getMyPosts()
    }, [])

    return (
        <div className="centerPosition">
            <h3>Profile Page</h3>
        </div>
    )
}

export default Profile