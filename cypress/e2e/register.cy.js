describe("User Registration", () => {
  beforeEach(() => {
    // Mengakses halaman register sebelum setiap test case
    cy.visit("http://localhost:5173/register");
    cy.url().should("include", "/register");
  });

  it("REG-01: should display register form elements and placeholders correctly", () => {
    // Memastikan elemen form utama terlihat
    cy.get("form").should("be.visible");

    // Validasi Input Full Name
    cy.get("input#name")
      .should("be.visible")
      .should("have.attr", "placeholder", "John Doe");

    // Validasi Input Email
    cy.get("input#email")
      .should("be.visible")
      .should("have.attr", "placeholder", "hello@example.com");

    // Validasi Input Password
    cy.get("input#password")
      .should("be.visible")
      .should("have.attr", "placeholder", "••••••••");

    // Validasi Input Confirm Password
    cy.get("input#confirmPassword")
      .should("be.visible")
      .should("have.attr", "placeholder", "••••••••");

    // Validasi Tombol Register
    cy.get("button").contains("Register").should("be.visible");
  });

  it("REG-02: should allow user to register with valid credentials", () => {
    // Mengisi Form dengan Data Valid
    cy.get("input#name").type("User Baru").should("have.value", "User Baru");
    cy.get("input#email").type("userbaru@demo.com").should("have.value", "userbaru@demo.com");
    cy.get("input#password").type("password123").should("have.value", "password123");
    cy.get("input#confirmPassword").type("password123").should("have.value", "password123");

    // Klik Tombol Register
    cy.get("button").contains("Register").click();

    // Memastikan diarahkan ke halaman login setelah registrasi sukses
    cy.url().should("include", "/login");
  });

  it("REG-03: should not allow registration if passwords do not match", () => {
    cy.get("input#name").type("User Test");
    cy.get("input#email").type("testpass@demo.com");
    
    // Mengisi password yang berbeda
    cy.get("input#password").type("password123");
    cy.get("input#confirmPassword").type("passwordAsal");

    cy.get("button").contains("Register").click();

    // Mencari teks alert error secara fleksibel (Targeting Material UI Alert atau helper text)
    cy.get(".MuiAlert-message, .MuiFormHelperText-root, div[class*='Alert'], p[class*='helperText']")
      .should("be.visible")
      .then(($el) => {
        cy.log("Teks Error Register: " + $el.text());
      });
  });
});