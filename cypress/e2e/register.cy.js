describe("User Registration", () => {
  beforeEach(() => {
    // Memastikan setiap test case dimulai dari halaman register
    cy.visit("http://localhost:5173/register");
    cy.url().should("include", "/register");
  });

  it("REG-01: should display register form elements and placeholders correctly", () => {
    cy.get("form").should("be.visible");

    // Validasi Input Full Name (Disesuaikan dengan id="fullname" dan text placeholder Anda)
    cy.get("input#fullname")
      .should("be.visible")
      .should("have.attr", "placeholder", "Muchamad Nafis Aljufri");

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
  });

  it("REG-02: should allow user to register with valid credentials", () => {
    // Mengisi Form menggunakan selector id yang tepat sesuai komponen React
    cy.get("input#fullname").type("User Baru").should("have.value", "User Baru");
    cy.get("input#email").type("userbaru@demo.com").should("have.value", "userbaru@demo.com");
    cy.get("input#password").type("password123").should("have.value", "password123");
    cy.get("input#confirmPassword").type("password123").should("have.value", "password123");

    // Menyetujui Terms and Conditions jika diperlukan (opsional tapi disarankan karena ada di form)
    cy.get("input#terms").check({ force: true });

    // Klik tombol submit 'Create an Account'
    cy.get("button").contains("Create an Account").click();
  });

  it("REG-03: should not allow registration if passwords do not match", () => {
    cy.get("input#fullname").type("User Test");
    cy.get("input#email").type("testpass@demo.com");
    
    // Mengisi password yang berbeda
    cy.get("input#password").type("password123");
    cy.get("input#confirmPassword").type("passwordBerbeda123");

    cy.get("input#terms").check({ force: true });
    cy.get("button").contains("Create an Account").click();

    // Validasi Error Formik: Karena menggunakan Formik bawaan, error biasanya muncul di div text-red-500
    cy.get(".text-red-500")
      .should("be.visible")
      .contains("Passwords must match");
  });
});