import { useState } from "react";

const Blog = ({ blog }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    paddingBottom: 10,
    borderColor: '#aaa'
  }
    const [view, setView] = useState(false);

    const toggleView = (viewHide) => { setView(!view); };

    if (!view) {
        return (
            <div style={blogStyle}>
                {blog.title} {blog.author} <button onClick={() => setView(!view)}>View</button>
            </div>
        )
    } else {
        return (
            <div style={blogStyle}>
                Title: {blog.title} <button onClick={() => setView(!view)}>Hide</button>
                <br/>Author: {blog.author}
                <br/>URL: {blog.url}
                <br/>Likes: {blog.likes} <button>Like</button>
                <br/>Submitted by: {blog.user}
            </div>
        );
    }
};

export default Blog;
