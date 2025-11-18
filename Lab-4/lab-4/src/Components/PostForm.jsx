export default function PostForm({ newPost, handleChange, handleAddPost }) {
  return (
    <div>
      <input
        name="title"
        placeholder="Title"
        value={newPost.title}
        onChange={handleChange}
      />
      <input
        name="body"
        placeholder="Body"
        value={newPost.body}
        onChange={handleChange}
      />
      <button onClick={handleAddPost}>Add Post</button>
    </div>
  );
}
