const Notification = ({ message, type }) => {
    if (message === "" || message.length === 0) {
        return null;
    }
    return <div className={type}>{message}</div>;
};

export default Notification;
