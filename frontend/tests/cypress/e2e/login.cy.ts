describe("Login page", () => {
  before(() => {
    cy.visit("/login");
  });

  it("should allow to log in with crypto wallet", () => {
    cy.wait(1500);

    cy.get("body").then(($body) => {
      if ($body.find("[data-testid=rk-connect-button]").length > 0) {
        cy.get("[data-testid=rk-connect-button]").click();

        cy.contains("MetaMask").click();
      }
    });

    cy.get("[data-cy=sign-message]").click();

    cy.url().should("include", "/panel");
  });
});
