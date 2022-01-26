import React,{useState} from 'react'
import { firebaeDb } from '../firebase'
import {
    deleteDoc,
    doc,
    updateDoc,
} from "firebase/firestore"


const Posts = ({postObj,isOwner}) => {

const [editing, setediting] = useState(false)
const [newPost, setNewPost] = useState(postObj.content);

    const onDelete = async()=>{
        const ok = window.confirm("삭제할거에요?")
        if(ok){
            await deleteDoc(doc(firebaeDb,'contents',`${postObj.id}`))
        }
    }

    const toggleEditing = ()=>{
        setediting((prev) => ! prev);

    }
    const onChange = (e)=>{
        const {
            target : {value},
         } = e;
        setNewPost(value);
    }
    const onSubmit = async(e)=>{
        e.preventDefault();
        console.log(postObj,newPost);
        // await updateDoc(doc(firebaeDb,'contents',`${postObj.id}`))
        const updateRef = doc(firebaeDb , "contents", `${postObj.id}`)
        await updateDoc(updateRef,{content:newPost});
        setediting(false)
    }
    return(
        <div>
            {
                editing ?
                    <>
                        <form onSubmit={onSubmit}>
                            <input type="text" onChange={onChange} value={newPost} required />
                            <input type="submit" value="수정" />
                        </form>
                        <button onClick={toggleEditing} type="text" placeholder="수정하세요" >취소</button>
                    </>
                    :
                    <>
                        <p>{postObj.content}</p>
                        {
                            isOwner && (
                                <>
                                    <button onClick={onDelete}>삭제</button>
                                    <button onClick={toggleEditing}>수정</button>
                                </>

                            )}
                    </>
            }
        </div>

    )
}

export default Posts