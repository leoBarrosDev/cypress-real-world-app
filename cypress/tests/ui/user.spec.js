/// <reference types="cypress" />

const env = require('../../../cypress.env.json');

describe("User tests", function () {
    beforeEach(() => {
        //cy.task("db:seed");
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
        cy.get('#password').type(env.default_password, { log: false });
        cy.get('#confirmPassword').type(env.default_password, { log: false });
        cy.get("[type='submit']").click();
        cy.location('pathname')
            .should('eq', '/signup');
    })

    it('User register with blank field', () => {
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
        cy.get('#firstName').type('Leandro');
        cy.get('#lastName').type('Reis');
        cy.get('#username').type('leandro.reis');
        cy.get('#password').type(env.invalid_password, { log: false });
        cy.get('.MuiFormHelperText-filled.MuiFormHelperText-root')
            .should('be.visible')
            .should('contain', 'Password must contain at least 4 characters');
    })

    it("User register with passwords that don't match", () => {
        cy.get('#firstName').type('Leandro');
        cy.get('#lastName').type('Reis');
        cy.get('#username').type('leandro.reis');
        cy.get('#password').type(env.default_password, { log: false });
        cy.get('#confirmPassword').type(env.invalid_password, { log: false });
        cy.get('.MuiFormHelperText-filled.MuiFormHelperText-root')
            .should('be.visible')
            .should('contain', 'Password does not match');
    })

    it('user register with the “confirm password” field blank', () => {
        cy.get('#firstName').type('Leandro');
        cy.get('#lastName').type('Reis');
        cy.get('#username').type('leandro.reis');
        cy.get('#password').type(env.default_password, { log: false });

        cy.get('#confirmPassword').click();
        cy.get('body').click();
        cy.get('#confirmPassword-helper-text')
            .should('be.visible')
            .should('contain', 'Confirm your password');
        cy.get("[type='submit']")
            .should('be.disabled');
        // cy.get('.MuiFormHelperText-filled.MuiFormHelperText-root')
        //     .should('be.visible')
        //     .should('contain', 'Password does not match');
    })
})