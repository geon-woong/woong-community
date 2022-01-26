import React,{ useState, useEffect} from 'react'
import { firebaeDb } from '../firebase';
import { 
    collection,
    addDoc,
    serverTimestamp,
    query,
    onSnapshot,
    orderBy,
    
                 } from "firebase/firestore";
import Posts from '../components/Posts';

const Home = ({userObj})=>{ 

    const [content, setcontent] = useState("")

    const [posts, setPosts] = useState([]);

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


    const onSubmit = async(event)=>{
        event.preventDefault();
        const {target : { value }} = event; // event 안에 있는 target value 를 할당
        try{
            const docRef = await addDoc(collection(firebaeDb,"contents"),{
                content,
                createdAt: serverTimestamp(),
                creatorId: userObj.uid,

            });
        }
        catch(error){console.log(error)}
        setcontent("");
    };

    const onChange =({ target: { value } }) => {
                        setcontent(value);
                    };

    

    return(
        <div>
            <form onSubmit={onSubmit}>
                <input value={content} onChange={onChange} type="text" placeholder="입력하세요"  maxLength={120}/>
                <input type="submit" value="content" />
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