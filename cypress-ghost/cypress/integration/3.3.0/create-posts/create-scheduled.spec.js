/// <reference types='cypress' />
import MenuPage from "../pageObjects/MenuPage";
import PostsPage from "../pageObjects/PostsPage";
import DataPool from "../../../data-pool";

const pool = new DataPool();

context("Create scheduled post", () => {
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
    
      it("should navigate to post editor by clicking new post button", () => {
        PostsPage.getNewPostButton().click();
        cy.url().should("include", "ghost/#/editor/post");
      });
    
      it("should fill inputs in post editor", () => {
        PostsPage.getTitleField().type(post.title);
        PostsPage.getContentField().click();
        PostsPage.getContentField().type(post.content);
    
        PostsPage.getTitleField().should("have.value", post.title);
        PostsPage.getContentField().should("contain.text", post.content);
      });
    
      it("should open publish dialog when publish button is clicked", () => {
        PostsPage.getPublishTrigger().click();
    
        PostsPage.getPublishMenu().should("be.visible");
      });
    
      it("should schedule post", () => {
        PostsPage.getPublishLaterOption().click();
        PostsPage.getPublishButton().click();
    
        PostsPage.getPublishButton().should("contain.text", "Scheduled");
      });
    });
  });
});
