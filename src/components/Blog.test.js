import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import Blog from './Blog';
import BlogForm from './BlogForm';

test('renders content', () => {
    const blog = {
        title: 'Title Test Render Content',
        author: 'Author Test Render Content',
        url: 'https://testrender.com',
        likes: 0,
    };

    const {container} = render(<Blog blog={blog} username={''} addLike={''} deleteBlog={''} />);

    const div = container.querySelector('.blog')

    // const element = screen.getByText(
    //     'Title Test Render Content'
    // );
    //expect(div).toBeDefined();
    expect(div).toHaveTextContent('Title Test Render Content');
    expect(div).toHaveTextContent('Author Test Render Content');
    expect(div).not.toHaveTextContent('https://testrender.com');
    expect(div).not.toHaveTextContent('Likes:');
});

test('clicking view button shows blog details', async () => {
    const blog = {
        title: 'Title Test Render Content',
        author: 'Author Test Render Content',
        url: 'https://testrender.com',
        likes: 0,
        user: {username: 'damian'}
    };

    const mockHandler = jest.fn()

    const {container} = render(<Blog blog={blog} username={'damian'} addLike={mockHandler} deleteBlog={mockHandler} />);
    const user = userEvent.setup()
    const button = screen.getByText('View')
    await user.click(button)

    const div = container.querySelector('.blog')

    expect(div).toHaveTextContent('Title Test Render Content');
    expect(div).toHaveTextContent('Author Test Render Content');
    expect(div).toHaveTextContent('https://testrender.com');
    expect(div).toHaveTextContent('Likes:');
});

test('clicking like twice triggers event handler twice', async () => {
    const blog = {
        title: 'Title Test Render Content',
        author: 'Author Test Render Content',
        url: 'https://testrender.com',
        likes: 0,
        user: {username: 'damian'}
    };

    const mockHandler = jest.fn()
    const mockLikeHandler = jest.fn()

    const {container} = render(<Blog blog={blog} username={'damian'} addLike={mockLikeHandler} deleteBlog={mockHandler} />);
    const user = userEvent.setup()
    const button = screen.getByText('View')
    await user.click(button)

    const div = container.querySelector('.blog')

    expect(div).toHaveTextContent('Title Test Render Content');
    expect(div).toHaveTextContent('Author Test Render Content');
    expect(div).toHaveTextContent('https://testrender.com');
    expect(div).toHaveTextContent('Likes:');

    const likeButton = screen.getByText('Like')
    await user.click(likeButton)
    await user.click(likeButton)
    expect(mockLikeHandler.mock.calls).toHaveLength(2)
});

test('submit new blog triggers event handler with passed data', async () => {
    const blog = {
        title: 'Title Test Render Content',
        author: 'Author Test Render Content',
        url: 'https://testrender.com',
        likes: 0,
        user: {username: 'damian'}
    };

    const mockAddHandler = jest.fn()

    const { container } = render(<BlogForm addBlog={mockAddHandler}/>)

    const user = userEvent.setup()

    const inputTitle = container.querySelector('input[name="title"]')
    await user.type(inputTitle, blog.title)

    const inputAuthor = container.querySelector('input[name="author"]')
    await user.type(inputAuthor, blog.author)

    const inputUrl = container.querySelector('input[name="url"]')
    await user.type(inputUrl, blog.url)

    const submitButton = screen.getByText('Submit Blog')
    await user.click(submitButton)

    expect(mockAddHandler.mock.calls).toHaveLength(1)
    console.log(JSON.stringify(mockAddHandler.mock.calls));
    expect(mockAddHandler.mock.calls[0][0].title).toBe(blog.title)
    expect(mockAddHandler.mock.calls[0][0].author).toBe(blog.author)
    expect(mockAddHandler.mock.calls[0][0].url).toBe(blog.url)

});
