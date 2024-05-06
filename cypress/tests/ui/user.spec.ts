/// <reference types="cypress" />

describe("User tests", function () {
    beforeEach(() => {
        cy.task("db:seed");
        cy.visit('http://localhost:3000/');
    })
    it('User register successfuly', () => {
        //cy.visit('http://localhost:3000/');
        cy.title()
            .should('eq', 'Cypress Real World App');
        cy.get("[data-test='signup']").click();
        cy.location('pathname')
            .should('eq', '/signup');
        cy.get('#firstName').type('Leandro');
        cy.get('#lastName').type('Reis');
        cy.get('#username').type('leandro.reis');
        cy.get('#password').type('s3cret');
        cy.get('#confirmPassword').type('s3cret');
        cy.get('[data-test="signup-submit"]').click();
        cy.location('pathname')
            .should('eq', '/signin');
    })
})