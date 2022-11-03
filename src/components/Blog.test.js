import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Blog from './Blog';

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
