const BlogForm = ({
    handleAdd,
    handleTitleChange,
    handleAuthorChange,
    handleUrlChange,
    title,
    author,
    url
}) => {
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
                        onChange={handleTitleChange}
                    />
                </div>
                <div>
                    Author:
                    <input
                        type="text"
                        value={author}
                        name="author"
                        onChange={handleAuthorChange}
                    />
                </div>
                <div>
                    URL:
                    <input
                        type="text"
                        value={url}
                        name="url"
                        onChange={handleUrlChange}
                    />
                </div>
                <button type="submit">Add Blog</button>
            </form>
        </>
    );
};

export default BlogForm;
