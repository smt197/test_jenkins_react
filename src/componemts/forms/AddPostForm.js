import React, { useState } from "react";
import supabase from "../../config/supabaseClient";
const AddPostForm = ({ tableName }) => {

  const [title, setTitle] = useState("");
  const [description, setContent] = useState("");
  const [position, setPosition] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const { data, error } = await supabase
        .from(tableName)
        .insert([{ title, description, position }]);

      if (error) throw error;

      setMessage("Post added successfully!");
      setTitle("");
      setContent("");
      setPosition("");
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Add a New Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="content">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setContent(e.target.value)}   
          />
        </div>
        <div>
          <label htmlFor="position">Position:</label>
          <textarea
            id="position"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Add Post"}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddPostForm;
