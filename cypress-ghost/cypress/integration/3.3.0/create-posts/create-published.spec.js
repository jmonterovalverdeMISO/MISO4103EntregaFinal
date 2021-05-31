/// <reference types='cypress' />
import MenuPage from "../pageObjects/MenuPage";
import PostsPage from "../pageObjects/PostsPage";
import DataPool from "../../../data-pool";

const pool = new DataPool();

context("Create a published post", () => {
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
        PostsPage.getTitleField().type(post.title), { parseSpecialCharSequences: false };
        PostsPage.getContentField().click();
        PostsPage.getContentField().type(post.content, { parseSpecialCharSequences: false })
    
        PostsPage.getTitleField().should("have.value", post.title);
        PostsPage.getContentField().should(
          "contain.text",
          post.content
        );
      });
    
      it("should open publish dialog when publish button is clicked", () => {
        PostsPage.getPublishTrigger().click();
        
        PostsPage.getPublishMenu().should("be.visible");
      });
    
      it("should publish post", () => {
        PostsPage.getSetItLiveOption().click();
        PostsPage.getPublishButton().click();
    
        PostsPage.getPublishButton().should("contain.text", "Published");
      });
    });
  });

  context('with bookmark', () => {
    let post;

    before(() => {
      cy.home();
      post = pool.apriori.getPostValidData();
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
      PostsPage.getTitleField().type(post.title, { parseSpecialCharSequences: false });
  
      PostsPage.getTitleField().should(
        "have.value",
        post.title
      );
    });
  
    it("should open widgets menu", () => {
      PostsPage.getContentField().click();
  
      cy.wait(500);
  
      PostsPage.getAddCardButton().click();
      PostsPage.getCardMenu().should("be.visible");
    });
  
    it("should add bookmark field to content", () => {
      PostsPage.getBookmarkOption().click();
  
      PostsPage.getBookmarkInput().type("https://biblioteca.uniandes.edu.co/");
      PostsPage.getBookmarkInput().should("exist");
    });
  
    it("should open publish dialog when publish button is clicked", () => {
      PostsPage.getPublishTrigger().click();
  
      PostsPage.getPublishMenu().should("be.visible");
    });
  
    it("should publish post", () => {
      PostsPage.getSetItLiveOption().click();
      PostsPage.getPublishButton().click();
  
      PostsPage.getPublishButton().should("contain.text", "Published");
    });
  });

  context('with tags', () => {
    let post;

    before(() => {
      cy.home();
      post = pool.apriori.getPostValidData();
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
      PostsPage.getTitleField().type(post.title, { parseSpecialCharSequences: false });
      PostsPage.getContentField().click();
      PostsPage.getContentField().type(post.content, { parseSpecialCharSequences: false });
  
      PostsPage.getTitleField().should("have.value", post.title);
      PostsPage.getContentField().should("contain.text", post.content);
    });
  
    it("should open post settings", () => {
      PostsPage.getPostSettingsButton().click();
  
      PostsPage.getSettingsMenu().should("be.visible");
    });
  
    it("should open tag dropdown clicking in tags field", () => {
      PostsPage.getTagsTextbox().click();
      PostsPage.getTagsDropdown().should("be.visible");
    });
  
    it("should add tag clicking an option", () => {
      PostsPage.getFirstTagFromList().click();
      PostsPage.getTagsTextbox().find('li').should("have.length", 1);
    });
  
    it("should open publish dialog when publish button is clicked", () => {
      PostsPage.getCloseSettingsButton().click();
      PostsPage.getPublishTrigger().click();
  
      PostsPage.getPublishMenu().should("be.visible");
    });
  
    it("should schedule post", () => {
      PostsPage.getSetItLiveOption().click();
      PostsPage.getPublishButton().click();
  
      PostsPage.getPublishButton().should("contain.text", "Published");
    });
  });
});
