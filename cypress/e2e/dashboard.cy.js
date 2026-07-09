describe("Dashboard Overview E2E Test", () => {

  beforeEach(() => {
    cy.visit("http://localhost:5173/login");
  });

  it("User successfully logs in and accesses the Dashboard", () => {

    // Email
    cy.get('input[type="email"]')
      .should("be.visible")
      .type("111202315328@mhs.dinus.ac.id");

    // Password
    cy.get('input[type="password"]')
      .should("be.visible")
      .type("123456");

    // Login
    cy.contains("Login").click();

    // Dashboard loaded
    cy.url().should("include", "/");

    // Wait data from backend
    cy.wait(2000);

    // Dashboard components
    cy.contains("Total Balance").should("exist");
    cy.contains("Goals").should("exist");
    cy.contains("Upcoming Bill").should("exist");
    cy.contains("Recent Transaction").should("exist");
    cy.contains("Statistics").should("exist");
    cy.contains("Expenses Breakdown").should("exist");

    // User name exists
    cy.contains("MUCHAMAD").should("exist");

  });

});