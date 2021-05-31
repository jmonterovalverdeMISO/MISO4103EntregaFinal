/// <reference types='cypress' />
import MenuPage from "../pageObjects/MenuPage";
import PagesPage from "../pageObjects/PagesPage";
import DataPool from "../../../data-pool";

const pool = new DataPool();

context("Create scheduled page", () => {
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
        MenuPage.getPagesLink().click();
        cy.url().should("include", "ghost/#/pages");
      });
    
      it("should navigate to page editor by clicking new page button", () => {
        PagesPage.getNewPageButton().click();
        cy.url().should("include", "ghost/#/editor/page");
      });
    
      it("should fill inputs in page editor", () => {
        PagesPage.getTitleField().type(page.title);
        PagesPage.getContentField().click();
        PagesPage.getContentField().type(page.content);
    
        PagesPage.getTitleField().should("have.value", page.title);
        PagesPage.getContentField().should("contain.text", page.content);
      });
    
      it("should open publish dialog when publish button is clicked", () => {
        PagesPage.getPublishTrigger().click();
    
        PagesPage.getPublishMenu().should("exist");
      });
    
      it("should schedule page", () => {
        PagesPage.getPublishLaterOption().click();
        PagesPage.getPublishButton().click();
    
        PagesPage.getPublishButton().should("contain.text", "Scheduled");
      });
    });
  });
});
