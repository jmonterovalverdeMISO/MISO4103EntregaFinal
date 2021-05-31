/// <reference types='cypress' />
import MenuPage from "../pageObjects/MenuPage";
import PostsPage from "../pageObjects/PostsPage";
import PostListPage from "../pageObjects/PostListPage";
import DataPool from "../../../data-pool";

const pool = new DataPool();

context("Create draft post", () => {
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
    ['with valid data', pool.apriori.getPostValidData()],
    ['with long data', pool.apriori.getPostLongData()],
    ['with unexpected characters', pool.apriori.getPostNaughtyData()]
  ].forEach((scenario) => {
    const [name, post] = scenario;

    context(name, () => {
      before(() => {
        cy.home();
      });

      it("should navigate to /posts from home", () => {
        MenuPage.getPostsLink().click();
        cy.url().should("include", "ghost/#/posts");
      });
  
      it("should navigate to post editor by clicking new page button", () => {
        PostsPage.getNewPostButton().click();
        cy.url().should("include", "ghost/#/editor/post");
      });
  
      it("should fill inputs and update information page", () => {
        PostsPage.getTitleField().clear().type(post.title, { parseSpecialCharSequences: false });
        PostsPage.getContentField().type(post.content, { parseSpecialCharSequences: false });
    
        PostsPage.getBackToPostsPageButton().click({ force: true });
        PostListPage.getLastDraftPostTitle().click({ force: true });
  
        PostsPage.getTitleField().should('have.value', post.title);
        PostsPage.getContentField().should('contain.text', post.content);
      });
    });
  });
});
