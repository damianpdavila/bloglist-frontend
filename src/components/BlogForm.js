import { useState } from "react";

const BlogForm = ({ addBlog }) => {
    const [title, setTitle] = useState([]);
    const [author, setAuthor] = useState([]);
    const [url, setUrl] = useState([]);
    
    
    const handleAdd = (event) => {
        event.preventDefault();
        addBlog({
            title,
            author,
            url,
        })
        setAuthor("")
        setTitle("")
        setUrl("")
    };

    return (
        <>
            <h2>Add Blog</h2>
            <form onSubmit={handleAdd}>
                <div>
                    Title:
                    <input
                        type="text"
                        value={title}
                        name="title"
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    Author:
                    <input
                        type="text"
                        value={author}
                        name="author"
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    URL:
                    <input
                        type="text"
                        value={url}
                        name="url"
                        onChange={({ target }) => setUrl(target.value)}
                    />
                </div>
                <button type="submit">Add Blog</button>
            </form>
        </>
    );
};

export default BlogForm;
