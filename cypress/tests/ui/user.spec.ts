/// <reference types="cypress" />

const env = require('../../../cypress.env.json');

describe("User tests", function () {
    beforeEach(() => {
        cy.task("db:seed");
        cy.visit('/');
    })

    it('User register successfuly', () => {
        cy.title()
            .should('eq', 'Cypress Real World App');
        cy.get("[data-test='signup']").click();
        cy.location('pathname')
            .should('eq', '/signup');
        cy.get('#firstName').type('Leandro');
        cy.get('#lastName').type('Reis');
        cy.get('#username').type('leandro.reis');
        cy.get('#password').type(env.password_default, { log: false });
        cy.get('#confirmPassword').type(env.password_default, { log: false });
        cy.get('[data-test="signup-submit"]').click();
        cy.location('pathname')
            .should('eq', '/signin');
    })
})