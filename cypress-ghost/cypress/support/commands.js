import LoginPage from "../integration/pageObjects/LoginPage";

Cypress.Commands.add('login', () => {
  const user = Cypress.env('GHOST_USER') || 'user@test.com';
  const password = Cypress.env('GHOST_PASS') || 'dev1234567';

  Cypress.config('baseUrl', Cypress.env('GHOST_HOST'))

  cy.visit('/ghost/#/signin')
    .wait(500)
    .then((window) => {
      if (window.location.href.includes('/ghost/#/signin')) {
        LoginPage.getUserNameField().type(user);
        LoginPage.getPasswordField().type(password);
        LoginPage.getSignInButon().click();
      
        cy.wait(500)
      }
    });
})

Cypress.Commands.add('home', () => {
  cy.visit('/ghost')
})

Cypress.Commands.add('logout', () => {
  cy.visit('/ghost/#/signout')
})