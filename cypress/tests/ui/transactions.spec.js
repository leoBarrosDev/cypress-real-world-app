/// <reference types="cypress" />

const env = require('../../../cypress.env.json');

describe('Transactions', () => {

    it.only("Transaction's history made", () => {
        cy.visit('/');
        cy.title()
            .should('eq', 'Cypress Real World App');
        cy.get('#username').type(env.default_username);
        cy.get('#password').type(env.default_password, { log: false }).type('{enter}');
        cy.location('pathname')
            .should('eq', '/');
        cy.get('.MuiTab-wrapper').eq(2)
            .should('be.visible').click();
        cy.get('.MuiListSubheader-sticky')
            .should('be.visible').should('contain', 'Personal');
        cy.get("[data-test='transaction-list']")
            .should('be.visible')

        cy.get('[data-test="transaction-amount-J5Fd3dlBEBu"]')
            .should('be.visible')
            .should('have.css', 'color', 'rgb(76, 175, 80)');

        cy.get('[data-test="transaction-amount-2Lz6Q3zj4Rb"]')
            .should('be.visible')
            .should('have.css', 'color', 'rgb(255, 0, 0)');
    })

    it("Transaction's history blank", () => {
        const firstName = 'Leandro';
        const lastName = 'Reis';
        const username = 'leandro.reis';
        cy.visit('/');
        cy.get("[data-test='signup']").click();
        cy.get('#firstName').type(firstName);
        cy.get('#lastName').type(lastName);
        cy.get('#username').type(username);
        cy.get('#password').type(env.default_password, { log: false });
        cy.get('#confirmPassword').type(env.default_password, { log: false });
        cy.get("[type='submit']").click();
        cy.location('pathname')
            .should('eq', '/signin');

        cy.get('#username').type(username);
        cy.get('#password').type(env.default_password, { log: false }).type('{enter}');
        cy.location('pathname')
            .should('eq', '/');

        cy.get('[data-test="nav-personal-tab"] > .MuiTab-wrapper').click();
        cy.get('[data-test="empty-list-header"] > .MuiTypography-root')
            .should('be.visible')
            .should('contain', 'No Transactions');
    })
})

