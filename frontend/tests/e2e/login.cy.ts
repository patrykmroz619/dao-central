describe("Login page", () => {
  it("should navigate to the login page", () => {
    cy.visit("/login");

    cy.get("h1").contains("Sign in");
  });
});
