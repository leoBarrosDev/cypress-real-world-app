/// <reference types="cypress" />

const env = require('../../../cypress.env.json');

describe("User tests", function () {
    beforeEach(() => {
        cy.task("db:seed");
        cy.visit('/');
        cy.title()
            .should('eq', 'Cypress Real World App');
        cy.get("[data-test='signup']").click();
        cy.location('pathname')
            .should('eq', '/signup');
    })

    it('User register successfuly', () => {
        cy.get('#firstName').type('Leandro');
        cy.get('#lastName').type('Reis');
        cy.get('#username').type('leandro.reis');
        cy.get('#password').type(env.password_default, { log: false });
        cy.get('#confirmPassword').type(env.password_default, { log: false });
        cy.get('[data-test="signup-submit"]').click();
        cy.location('pathname')
            .should('eq', '/signin');
    })

    it.only('User register with blank field', () => {
        const requiredFields = [
            { field: '#firstName', name: 'First Name' },
            { field: '#lastName', name: 'Last Name' },
            { field: '#username', name: 'Username' },
            { field: '#password', name: 'Password' },
        ];

        requiredFields.forEach((requiredField, index) => {
            cy.get(requiredField.field).click();
            if (index < requiredFields.length - 1) {
                const nextField = requiredFields[index + 1];
                cy.get(nextField.field).click();
                cy.get(`${requiredField.field}-helper-text.Mui-error`)
                    .should('be.visible')
                    .should('contain', `${requiredField.name} is required`);
            }
        })
    })

    it('User register with inválid password', () => {

    })

    it("User register with passwords that don't match", () => {

    })

    it('user register with the “confirm password” field blank', () => {

    })
})