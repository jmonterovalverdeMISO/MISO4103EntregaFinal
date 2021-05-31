/// <reference types='cypress' />
import MenuPage from "../pageObjects/MenuPage";
import PagesPage from "../pageObjects/PagesPage";
import PagesListPage from "../pageObjects/PagesListPage";
import DataPool from "../../../data-pool";

const pool = new DataPool();

context("Create draft page", () => {
  before(() => {
    cy.login();
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce("ghost-admin-api-session");
  });

  afterEach(() => {
    cy.screenshot();
  });

  [
    ['with valid data', pool.apriori.getPageValidData()],
    ['with long data', pool.apriori.getPageLongData()],
    ['with unexpected characters', pool.apriori.getPageNaughtyData()]
  ].forEach((scenario) => {
    const [name, page] = scenario;

    context(name, () => {
      before(() => {
        cy.home();
      });

      it("should navigate to /pages from home", () => {
        MenuPage.getPagesLink().first().click();
        cy.url().should("include", "ghost/#/pages");
      });
    
      it("should navigate to page editor by clicking new page button", () => {
        PagesPage.getNewPageButton().click();
        cy.url().should("include", "ghost/#/editor/page");
      });
  
      it("should save inputs information page", () => {
        PagesPage.getTitleField().clear().type(page.title, { parseSpecialCharSequences: false });
        PagesPage.getContentField().type(page.content, { parseSpecialCharSequences: false });
    
        PagesPage.getBackToPagesPageButton().click({ force: true });
        PagesListPage.getLastDraftPageTitle().click({ force: true });

        PagesPage.getTitleField().should('have.value', page.title);
        PagesPage.getContentField().should('contain.text', page.content);
      });
    });
  });
});
