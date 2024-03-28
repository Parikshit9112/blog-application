import { useState ,useEffect} from "react";
import BlogList from "./BlogList";

 
 
 const Home = () => {
     const [blogs,setBlogs]=useState(null);
     const [isPending,setPending]=useState(true);
     const [error,setError]=useState(null);
   

     const handleDelete=(id)=>{
      const newBlog=blogs.filter( blog => blog.id !==id );
      setBlogs(newBlog);
     }
      
     useEffect(() => {
     setTimeout(()=>{
      fetch('http://localhost:8000/blogs')
      .then(res => {
        if(!res.ok){
         throw Error('Error 404 NOT FOUND');
        }
         return res.json();
      })
      .then (data =>{
         setBlogs(data);
         setPending(false);
         
      })
      .catch(err =>{
         setError(err.message);
         setPending(false);
      })
     },1000);
     },[]);

    return ( 
      <div className="home">
         {error && <div>{error}</div>}
         {isPending && <div>Loading.... </div>}
        {blogs &&<BlogList blogs={blogs} title="All Blogs" handleDelete={handleDelete} />}
        
       
      </div>
     );
}

export default Home;