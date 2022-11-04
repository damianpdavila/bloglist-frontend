describe('Blog app', function () {
    const blog = {
        title: 'Title Test Cypress',
        author: 'Author Test Cypress',
        url: 'https://testcypress.com',
        likes: 0,
        user: { username: 'damian' },
    };
    const user = {
        username: 'damian',
        name: 'Damian Davila',
        password: 'd03p29d64!',
    };

    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset/');
        cy.request('POST', 'http://localhost:3003/api/users/', user);
        cy.visit('http://localhost:3000');
    });
    describe('Login', function () {
        it('form can be opened', function () {
            cy.contains('Login').click();
            cy.get('input[name="Username"]');
            cy.get('input[name="Password"]');
        });
        it('succeeds with correct credentials', function () {
            cy.contains('Login').click();
            cy.get('input[name="Username"]').type(user.username);
            cy.get('input[name="Password"]').type(user.password);
            cy.get('button#login').click();
            cy.contains(`${user.name} logged in`);
        });
        it('fails with incorrect credentials', function () {
            cy.contains('Login').click();
            cy.get('input[name="Username"]').type('bad');
            cy.get('input[name="Password"]').type('bad');
            cy.get('button#login').click();
            cy.contains('Wrong credentials');
            cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
        });
    });
    describe('when logged in', function () {
        beforeEach(function () {
            cy.contains('Login').click();
            cy.get('input[name="Username"]').type(user.username);
            cy.get('input[name="Password"]').type(user.password);
            cy.get('button#login').click();
        });

        it('a new blog can be created', function () {
            cy.contains('Add blog').click();
            cy.get('input[name="title"]').type(blog.title);
            cy.get('input[name="author"]').type(blog.author);
            cy.get('input[name="url"]').type(blog.url);
            cy.contains('Submit Blog').click();
            cy.contains(blog.title);
        });
    });
});
