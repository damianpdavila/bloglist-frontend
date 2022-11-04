describe('Blog app', function () {
    const blog = {
        title: 'Title Test Cypress',
        author: 'Author Test Cypress',
        url: 'https://testcypress.com',
        likes: 0,
        user: { username: 'damian' },
    };

    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset/');
        const user = {
            username: 'damian',
            name: 'Damian Davila',
            password: 'd03p29d64!',
        };
        cy.request('POST', 'http://localhost:3003/api/users/', user);
        cy.visit('http://localhost:3000');
    });
    it('Front page can be opened', function () {
        cy.contains('Blog App');
        cy.contains('Login to application');
    });
    it('Login form can be opened', function () {
        cy.contains('Login').click();
        cy.get('input[name="Username"]');
        cy.get('input[name="Password"]');
    });
    it('User can log in', function () {
        cy.contains('Login').click();
        cy.get('input[name="Username"]').type('damian');
        cy.get('input[name="Password"]').type('d03p29d64!');
        cy.get('button#login').click();
        cy.contains('Damian Davila logged in');
    });

    describe('when logged in', function () {
        beforeEach(function () {
            cy.contains('Login').click();
            cy.get('input[name="Username"]').type('damian');
            cy.get('input[name="Password"]').type('d03p29d64!');
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
