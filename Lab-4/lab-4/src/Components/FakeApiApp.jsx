import { useState, useEffect } from "react";
import PostsContainer from "./PostsContainer";
import PostForm from "./PostForm";

export default function FakeApiApp() {
  const URL = "https://jsonplaceholder.typicode.com/posts";
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newPost, setNewPost] = useState({ title: "", body: "" });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const response = await fetch(URL);
    const posts = await response.json();
    setData(posts);
    setLoading(false);
  };

  const handleChange = (e) => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  };

  const handleAddPost = () => {
    setData([{ ...newPost, id: Date.now() }, ...data]);
    setNewPost({ title: "", body: "" });
  };

  return (
    <div>
      <h1>Fake API Posts</h1>
      <PostForm
        newPost={newPost}
        handleChange={handleChange}
        handleAddPost={handleAddPost}
      />
      {loading ? <h2>Loading...</h2> : <PostsContainer posts={data} />}
    </div>
  );
}
