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

    const handleLogout = async (event) => {
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
                    <Togglable buttonLabel='Add note'>
                        <BlogForm
                            addBlog={handleAdd}
                        />                    
                    </Togglable>
                    <h2>Blogs</h2>
                    {blogs.map((blog) => (
                        <Blog key={blog.id} blog={blog} />
                    ))}
                </div>
            </div>
        );
    }
};

export default App;
