/// <reference types="cypress" />

const env = require('../../../cypress.env.json');
import { faker } from '@faker-js/faker'

describe('Transactions', () => {

    it("Transaction's history made", () => {
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
    })

    it.only("Transaction's history blank", () => {
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

        // cy.get('[data-test="user-onboarding-dialog-title"] > .MuiTypography-root')
        //     .should('be.visible')
        //     .should('contain', `Get Started with Real World App`);
        // cy.get('[data-test="user-onboarding-next"] > .MuiButton-label').click();

        // cy.get('[data-test="user-onboarding-dialog-title"] > .MuiTypography-root')
        //     .should('be.visible')
        //     .should('contain', `Create Bank Account`);

        // cy.get('#bankaccount-bankName-input').type('Meu Banco');
        // cy.get('#bankaccount-routingNumber-input').type(faker.finance.routingNumber());
        // cy.get('#bankaccount-accountNumber-input').type(faker.finance.account(9));
        // cy.get('[data-test="bankaccount-submit"] > .MuiButton-label').click();
        // cy.get('[data-test="user-onboarding-next"] > .MuiButton-label').click();

        cy.get('[data-test="nav-personal-tab"] > .MuiTab-wrapper').click();
        cy.get('[data-test="empty-list-header"] > .MuiTypography-root')
            .should('be.visible')
            .should('contain', 'No Transactions');
    })
})

