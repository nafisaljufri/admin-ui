describe("User Registration", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/register");
    cy.url().should("include", "/register");
  });

  it("REG-01: should display register form elements and placeholders correctly", () => {
    cy.get("form").should("be.visible");

    cy.get("input#fullname")
      .should("be.visible")
      .should("have.attr", "placeholder", "Muchamad Nafis Aljufri");

    cy.get("input#email")
      .should("be.visible")
      .should("have.attr", "placeholder", "hello@example.com");

    cy.get("input#password")
      .should("be.visible")
      .should("have.attr", "placeholder", "••••••••");

    cy.get("input#confirmPassword")
      .should("be.visible")
      .should("have.attr", "placeholder", "••••••••");
  });

  it("REG-02: should allow user to register with valid credentials", () => {
    cy.get("input#fullname").type("User Baru").should("have.value", "User Baru");
    cy.get("input#email").type("userbaru@demo.com").should("have.value", "userbaru@demo.com");
    cy.get("input#password").type("password123").should("have.value", "password123");
    cy.get("input#confirmPassword").type("password123").should("have.value", "password123");

    cy.get("input#terms").check({ force: true });

    cy.get("button").contains("Create an Account").click();
  });

  it("REG-03: should not allow registration if passwords do not match", () => {
    cy.get("input#fullname").type("User Test");
    cy.get("input#email").type("testpass@demo.com");
    
    cy.get("input#password").type("password123");
    cy.get("input#confirmPassword").type("passwordBerbeda123");

    cy.get("input#terms").check({ force: true });
    cy.get("button").contains("Create an Account").click();

    cy.get(".text-red-500")
      .should("be.visible")
      .contains("Passwords must match");
  });

  it("REG-04: Harus menampilkan peringatan pada kolom yang wajib diisi jika form dikirim dalam keadaan kosong", () => {
    cy.get("button[type='submit']").contains("Create an Account").click();

    cy.get(".text-red-500").contains("Full name is required").should("be.visible");
    cy.get(".text-red-500").contains("Email is required").should("be.visible");
    cy.get(".text-red-500").contains("Password is required").should("be.visible");
  });
}); 