/// <reference types="cypress" />

const env = require('../../../cypress.env.json');

describe('Login', () => {

    beforeEach(() => {
        cy.visit('/');
        cy.title()
            .should('eq', 'Cypress Real World App');
    });

    it('Login successfuly using "Enter" key', () => {
        cy.get('#username').type(env.default_username);
        cy.get('#password').type(env.default_password, { log: false }).type('{enter}');
        cy.location('pathname')
            .should('eq', '/');
    })

    it('Login successfuly using "SIGN IN" button', () => {
        cy.visit('/');
        cy.get('#username').type(env.default_username);
        cy.get('#password').type(env.default_password, { log: false });
        cy.get("[type='submit']").click();
        cy.location('pathname')
            .should('eq', '/');
    })

    it('Login with invalid username', () => {
        cy.get('#username').type(env.invalid_username);
        cy.get('#password').type(env.default_password, { log: false });
        cy.get("[type='submit']").click();
        cy.get('.MuiAlert-message')
            .should('be.visible')
            .should('contain', 'Username or password is invalid');
    })

    it('Login with invalid password', () => {
        cy.get('#username').type(env.default_username);
        cy.get('#password').type(env.invalid_password, { log: false });
        cy.get("[type='submit']").click();
        cy.get('.MuiAlert-message')
            .should('be.visible')
            .should('contain', 'Username or password is invalid');
    })
})