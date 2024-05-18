/// <reference types="cypress" />

const env = require('../../../cypress.env.json');
const value = 10000;

describe('Money', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.title()
            .should('eq', 'Cypress Real World App');
        cy.get('#username').type(env.default_username);
        cy.get('#password').type(env.default_password, { log: false }).type('{enter}');
        cy.location('pathname')
            .should('eq', '/');
    })
    it('Send money with sufficient found', () => {
        cy.get('.MuiButton-label').click();
        cy.get("[data-test='user-list-item-GjWovtg2hr']")
            .should('be.visible')
            .click();
        cy.get('#amount').type(100);
        cy.get('#transaction-create-description-input').type('test description');
        cy.get("[type='submit']").eq(1).click();

        cy.get('.MuiAlert-message')
            .should('be.visible')
            .should('have.text', 'Transaction Submitted!');

        let initialBalance;

        cy.get("[data-test='sidenav-user-balance']")
            .should('be.visible')
            .invoke('text')
            .then((text) => {
                initialBalance = parseFloat(text.replace(/[^0-9.-]+/g, ""));
            })
            .then(() => {
                cy.get("[data-test='sidenav-user-balance']")
                    .invoke('text')
                    .should((text) => {
                        const newBalance = parseFloat(text.replace(/[^0-9.-]+/g, ""));
                        expect(newBalance).to.equal(initialBalance - value);
                    });
            });
    })

    it('Send money with insufficient found', () => {

        cy.get('.MuiButton-label').click();
        cy.get("[data-test='user-list-item-GjWovtg2hr']")
            .should('be.visible')
            .click();
        cy.get('#amount').type(value);
        cy.get('#transaction-create-description-input').type('test description');
        cy.get("[type='submit']").eq(1).click();
        cy.get("[data-test='sidenav-user-balance']")
            .invoke('text')
            .then((text) => {
                const balance = parseFloat(text.replace(/[^0-9.-]+/g, ""));
                if (balance < value) {
                    cy.get('.MuiAlert-message')
                        .should('be.visible')
                        .should('have.text', 'Insufficient funds!');
                }
            });
    })

    it.only('Send money with zero found', () => {
        cy.get('.MuiButton-label').click();
        cy.get("[data-test='user-list-item-GjWovtg2hr']")
            .should('be.visible')
            .click();
        cy.get('#amount').type(value);
        cy.get('#transaction-create-description-input').type('test description');
        cy.get("[data-test='sidenav-user-balance']")
            .invoke('text')
            .then((text) => {
                const balance = parseFloat(text.replace(/[^0-9.-]+/g, ""));
                if (balance == 0) {
                    cy.get("[type='submit']").should('be.desabled');
                }
            });
    })
})