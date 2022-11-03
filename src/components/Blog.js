import { useState } from "react";

const Blog = ({ blog, username, addLike, deleteBlog }) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 10,
        border: "solid",
        borderWidth: 1,
        marginBottom: 5,
        paddingBottom: 10,
        borderColor: "#aaa",
    };
    const [view, setView] = useState(false);

    if (!view) {
        return (
            <div className='blog' style={blogStyle}>
                {blog.title} {blog.author}{" "}
                <button onClick={() => setView(!view)}>View</button>
            </div>
        );
    } else {
        if (username == blog.user.username) {
            return (
                <div className='blog' style={blogStyle}>
                    Title: {blog.title}{" "}
                    <button onClick={() => setView(!view)}>Hide</button>
                    <br />
                    Author: {blog.author}
                    <br />
                    URL: {blog.url}
                    <br />
                    Likes: {blog.likes} <button onClick={addLike}>Like</button>
                    <br />
                    Submitted by: {blog.user.name}
                    <br />
                    <button onClick={deleteBlog}>Remove</button>
                </div>
            );
        } else {
            return (
                <div className='blog' style={blogStyle}>
                    Title: {blog.title}{" "}
                    <button onClick={() => setView(!view)}>Hide</button>
                    <br />
                    Author: {blog.author}
                    <br />
                    URL: {blog.url}
                    <br />
                    Likes: {blog.likes} <button onClick={addLike}>Like</button>
                    <br />
                    Submitted by: {blog.user.name}
                </div>
            );
        }
    }
};

export default Blog;
