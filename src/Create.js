import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Create = () => {
    const[title,setTitle]=useState('');
    const[body,setBody]=useState('');
    const[author,setAuthor]=useState('Select Author');
    const[isPending,setIsPending]=useState(false);
    const history=useHistory();

    const handleSubmit=(e)=>{
        e.preventDefault();
        const blog={ title, body, author};
        setIsPending(true);
         setTimeout(()=>{
            fetch('http://localhost:8000/blogs/', {
            method:'POST',
            headers:{ "Content-Type": "application/json"},
            body: JSON.stringify(blog)
        }).then(() =>{
            console.log("New Blog Added");
            setIsPending(false);
        })
         },1000);
        history.push('/');
       
    }

    return ( 
        <div className="create">
            <h2>Add a New Blog</h2>
            <form onSubmit={handleSubmit}>
                <lable>Blog Title : </lable>
                <input
                type="text"
                required
                value={title}
                onChange={(e)=> setTitle(e.target.value)}
                />
                <lable>Blog Body : </lable>
                <textarea required
                value={body}
                onChange={(e)=> setBody(e.target.value)}></textarea>
                <lable>Blog Author : </lable>
                <select 
                value={author}
                onChange={(e)=> setAuthor(e.target.value)} >
                    <option value="Select Author" disabled>Select Author</option>
                    <option value="Parikshit">Parikshit</option>
                    <option value="Rohit">Rohit</option>
                </select>
                { !isPending && <button>Add Blog</button>}
                { isPending && <button disabled>Adding Blog....</button>}
                <p>{title}</p>
                <p>{body}</p>
                <p>{author}</p>
            </form>
        </div>
     );
}
 
export default Create;