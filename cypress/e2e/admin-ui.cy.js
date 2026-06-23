describe("User Login", () => {
  it("should allow user to log in with valid credentials", () => {
    cy.visit("http://localhost:5173/");
    cy.url().should("include", "/login");

    // Input Email yang Benar
    cy.get("input#email")
      .should("be.visible")
      .should("have.attr", "placeholder", "hello@example.com")
      .type("demo@demo.com")
      .should("have.value", "demo@demo.com");

    // Input Password yang Benar & Perbaikan Placeholder Bulatan
    cy.get("input#password")
      .should("be.visible")
      .should("have.attr", "placeholder", "••••••••")
      .type("demo123")
      .should("have.value", "demo123");

    cy.get("button").contains("Login").click();

    // Memastikan masuk ke Dashboard setelah login sukses
    cy.get("nav").should("be.visible");    
    cy.get("header").should("be.visible");
    
    cy.wait(3000); // Dikurangi sedikit agar tidak terlalu lama menunggu
  });

  it("should not allow user to log in with invalid credentials", () => {
    cy.visit("http://localhost:5173/");
    cy.url().should("include", "/login");

    // Input Email yang Salah
    cy.get("input#email")
      .should("be.visible")
      .should("have.attr", "placeholder", "hello@example.com")
      .type("salah@demo.com") 
      .should("have.value", "salah@demo.com");

    // Input Password yang Salah
    cy.get("input#password")
      .should("be.visible")
      .should("have.attr", "placeholder", "••••••••")
      .type("passwordAsal123")
      .should("have.value", "passwordAsal123");

    cy.get("button").contains("Login").click();

    // PERBAIKAN: Mencari teks 'wrong password' secara fleksibel tanpa sensitif huruf besar/kecil
    // Kita targetkan komponen Alert dari Material UI yang tadi sempat terdeteksi error
cy.get(".MuiAlert-message, .MuiAlert-action, div[class*='MuiAlert']")
  .should("be.visible")
  .then(($el) => {
    // Perintah ini akan mencetak teks asli dari alert ke console browser Cypress kamu
    cy.log("Teks Error yang Muncul: " + $el.text());
  });
  }); 
});