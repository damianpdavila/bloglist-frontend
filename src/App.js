import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);
    const [notificationMessage, setNotificationMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    useEffect(() => {
        blogService.getAll().then((blogs) => setBlogs(blogs));
    }, []);

    useEffect(() => {
        const returning = window.localStorage.getItem("loggedInBlogList");
        if (returning) {
            const user = JSON.parse(returning);
            setUser(user);
            blogService.setToken(user.token);
        }
    }, []);

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const user = await loginService.login({
                username,
                password,
            });
            blogService.setToken(user.token);
            setUser(user);
            window.localStorage.setItem(
                "loggedInBlogList",
                JSON.stringify(user)
            );
            setUsername("");
            setPassword("");
            notifySuccess(`${user.name} successfully logged in`);
        } catch (exception) {
            console.log(exception);
            notifyError("Wrong credentials");
        }
    };

    const handleLogout = async () => {
        setUser(null);
        window.localStorage.removeItem("loggedInBlogList");
        notifySuccess("You have been logged out");
    };

    const notifySuccess = (message) => {
        setMessageType("success");
        setNotificationMessage(message);
        setTimeout(() => {
            setNotificationMessage("");
        }, 5000);
    };

    const notifyError = (message) => {
        setMessageType("error");
        setNotificationMessage(message);
        setTimeout(() => {
            setNotificationMessage("");
        }, 5000);
    };

    const handleAdd = async ({title, author, url}) => {
        try {
            const newBlog = await blogService.create({
                title,
                author,
                url,
            });

            setBlogs(blogs.concat(newBlog))
            notifySuccess("Blog successfully added");
        } catch (exception) {
            notifyError(`An error occurred: ${exception}`);
        }
    };

    const handleLike = async (id) => {
        const blog = blogs.find( blog => blog.id === id);

        try {
            const updatedLikes = blog.likes += 1
            const updatedBlog = await blogService.update(
                id,
                updatedLikes,
            );
            blogs.map( blog => { return blog.id === id ? blog : updatedBlog; })
            setBlogs(blogs);
            notifySuccess(`Your like has been added to ${blog.title}`);
        } catch (exception) {
            console.log(exception);
            notifyError("An error occurred");
        }
    };

    const handleDelete = async (blog) => {
        if (! window.confirm(`Are you sure you wish to delete "${blog.title}" by ${blog.author}?`)) {
            return;
        }
        try {
            await blogService.destroy(
                blog.id,
            );
            const updatedBlogs = blogs.filter( blogOrig => { return blogOrig.id !== blog.id })
            setBlogs(updatedBlogs);
            notifySuccess("The blog has been removed");
        } catch (exception) {
            console.log(exception);
            notifyError("An error occurred");
        }
    };


    const sortByLikes = () => {
        blogs.sort( (a, b) => b.likes - a.likes);
        setBlogs([...blogs]);
        console.log(blogs);
    }


    if (user === null) {
        return (
            <>
                <h1>Blog App</h1>
                <h2>Login to application</h2>
                <form onSubmit={handleLogin}>
                    <div>
                        username
                        <input
                            type="text"
                            value={username}
                            name="Username"
                            onChange={({ target }) => setUsername(target.value)}
                        />
                    </div>
                    <div>
                        password
                        <input
                            type="password"
                            value={password}
                            name="Password"
                            onChange={({ target }) => setPassword(target.value)}
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>
                <Notification
                    message={notificationMessage}
                    type={messageType}
                />
            </>
        );
    } else {
        return (
            <div>
                <h1>Blog App</h1>
                <Notification
                    message={notificationMessage}
                    type={messageType}
                />
                <div>
                    <div>
                        {user.name} logged in
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                    <Togglable buttonLabel='Add blog'>
                        <BlogForm
                            addBlog={handleAdd}
                        />
                    </Togglable>
                    <h2>Blogs</h2>
                    <button onClick={sortByLikes}>Sort by Likes</button>
                    {blogs.map((blog) => (
                        <Blog key={blog.id} blog={blog} username={user.username} addLike={() => handleLike(blog.id)} deleteBlog={() => handleDelete(blog)} />
                    ))}
                </div>
            </div>
        );
    }
};

export default App;
