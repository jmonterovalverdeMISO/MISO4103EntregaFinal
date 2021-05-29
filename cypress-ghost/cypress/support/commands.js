import LoginPage from "../integration/pageObjects/LoginPage";

Cypress.Commands.add('login', () => {
  const user = Cypress.env('GHOST_USER') || 'user@test.com';
  const password = Cypress.env('GHOST_PASS') || 'dev1234567';

  Cypress.config('baseUrl', Cypress.env('GHOST_HOST'))

  cy.visit('/ghost/#/signin');
  cy.wait(5000);

  cy.url().then((url) => {
    if (url.includes('/ghost/#/signin')) {
      LoginPage.getUserNameField().type(user);
      LoginPage.getPasswordField().type(password);
      LoginPage.getSignInButon().click();
    
      cy.wait(500)
    }
  });
})

Cypress.Commands.add('logout', () => {
  cy.visit('/ghost/#/signout')
  cy.wait(5000)
})