import React,{ useState, useEffect} from 'react'
import { firebaeDb, fireStorage } from '../firebase';
import {
    ref,
    uploadBytesResumable,
    getDownloadURL,
    uploadString
  } from "firebase/storage";
import { 
    collection,
    addDoc,
    serverTimestamp,
    query,
    onSnapshot,
    orderBy,
                   } from "firebase/firestore";
import {v4 as uuid, v4} from "uuid"
import Posts from '../components/Posts';

const Home = ({userObj})=>{ 

    const [content, setcontent] = useState("")
    const [posts, setPosts] = useState([]);
    const [attachment,setAttachment] = useState("");

    useEffect(() => {

        const q = query(
            collection(firebaeDb, "contents"),
            orderBy("createdAt", "desc")
            );
            onSnapshot(q, (snapshot) => {
            const postArr = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            }));
            setPosts(postArr);
            });
    }, []);

    const onChange =({ target: { value } }) => {

                        setcontent(value);
                    };

    const onFileChnage = (event)=>{
        const {
             target : {files} 
        } = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) =>{
                const {
                     currentTarget : {result} 
                    } = finishedEvent
                setAttachment(result)
            };
            reader.readAsDataURL(theFile);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        let attachmentUrl = "";
        if (attachment !== "") {
            //파일 경로 참조 만들기
            const fileRef = ref(fireStorage, `${userObj.uid}/${v4()}`);
            //storage 참조 경로로 파일 업로드 하기
            const uploadFile = await uploadString(fileRef, attachment, "data_url");
            console.log(uploadFile);
            //storage에 있는 파일 URL로 다운로드 받기
            attachmentUrl = await getDownloadURL(uploadFile.ref);
        }
        const nweetPosting = {
            content,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl,
            };
            await addDoc(collection(firebaeDb, "contents"), nweetPosting);
            setcontent("");
            setAttachment("");
    }
  
   
    
    const onResetAttachment = ()=>{
        setAttachment(null)
    }

    return(
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" value={content} onChange={onChange} placeholder="입력하세요"  maxLength={120}/>
                <input type="file" accept="image/*" onChange={onFileChnage}  />
                <img src={attachment} alt="" className="src" width="200" height="100" />
                {
                    attachment && 
                    <button onClick={onResetAttachment}>사진 치워</button>
                }
                <input type="submit" value="등록" />

            </form>
            <div>
                {
                    posts.map(content => (
                        <Posts key={content.id}
                                postObj={content}
                                isOwner={content.creatorId === userObj.uid}
                                >
                        </Posts>
                    ))
                }
            </div>
        </div>
        )
};

export default Home