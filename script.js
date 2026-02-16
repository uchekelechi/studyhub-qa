// StudyHub front-end logic with simple validation

document.addEventListener("DOMContentLoaded", function () {
  setupLoginForm();
  setupStudentFilter();
  setupQuizForm();
});

/* ---------------- Login form ---------------- */

function setupLoginForm() {
  const loginForm = document.getElementById("login-form");
  if (!loginForm) return;

  const emailInput = document.getElementById("login-email");
  const passwordInput = document.getElementById("login-password");
  const message = document.getElementById("login-message");

  const VALID_EMAIL = "tester@example.com";
  const VALID_PASSWORD = "password123";

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    // Clear any previous custom errors
    emailInput.setCustomValidity("");
    passwordInput.setCustomValidity("");

    // Basic HTML5 constraint check first
    if (!loginForm.checkValidity()) {
      if (!email) {
        emailInput.setCustomValidity("Email is required.");
      } else if (!emailInput.validity.valid) {
        emailInput.setCustomValidity("Please enter a valid email address.");
      }

      if (!password) {
        passwordInput.setCustomValidity("Password is required.");
      } else if (password.length < 6) {
        passwordInput.setCustomValidity("Password must be at least 6 characters.");
      }

      // Trigger browser display of messages
      loginForm.reportValidity();
      message.textContent = "Please fix the highlighted errors.";
      message.style.color = "red";
      return;
    }

    // Custom application-level validation (fake login)
    if (email === VALID_EMAIL && password === VALID_PASSWORD) {
      message.textContent = "Login successful.";
      message.style.color = "green";
    } else {
      message.textContent = "Invalid credentials.";
      message.style.color = "red";
    }
  });
}

/* ---------------- Students filter ---------------- */

function setupStudentFilter() {
  const searchInput = document.getElementById("search-input");
  if (!searchInput) return;

  const table = document.getElementById("students-table");
  const rows = table.querySelectorAll("tbody tr");
  const filterMessage = document.getElementById("filter-message");

  searchInput.addEventListener("input", function () {
    const term = searchInput.value.toLowerCase();
    let visibleCount = 0;

    rows.forEach(row => {
      const nameCell = row.querySelector("td");
      const name = nameCell.textContent.toLowerCase();
      const match = name.includes(term);
      row.style.display = match ? "" : "none";
      if (match) visibleCount++;
    });

    if (term && visibleCount === 0) {
      filterMessage.textContent = "No students found.";
    } else if (!term) {
      filterMessage.textContent = "";
    } else {
      filterMessage.textContent = visibleCount + " student(s) found.";
    }
  });
}

/* ---------------- Quiz form ---------------- */

function setupQuizForm() {
  const quizForm = document.getElementById("quiz-form");
  if (!quizForm) return;

  const result = document.getElementById("quiz-result");

  quizForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const q1Input = document.getElementById("q1");
    const q1 = q1Input.value.trim().toLowerCase();

    const q2Checked = Array.from(
      document.querySelectorAll("input[name='q2']:checked")
    );
    const q3Checked = document.querySelector("input[name='q3']:checked");

    // Reset any previous message
    result.textContent = "";
    result.style.color = "orange";

    // Validation: ensure required questions answered
    if (!q1) {
      result.textContent = "Please answer question 1.";
      q1Input.focus();
      return;
    }

    if (q2Checked.length === 0) {
      result.textContent = "Please select at least one option for question 2.";
      return;
    }

    if (!q3Checked) {
      result.textContent = "Please select an option for question 3.";
      return;
    }

    // Scoring
    let score = 0;

    // Q1
    if (q1 === "quality assurance") {
      score++;
    }

    // Q2
    const q2Values = q2Checked.map(el => el.value);
    const hasUnit = q2Values.includes("unit");
    const hasManual = q2Values.includes("manual");
    const hasCoffee = q2Values.includes("coffee");
    if (hasUnit && hasManual && !hasCoffee) {
      score++;
    }

    // Q3
    if (q3Checked.value === "early") {
      score++;
    }

    result.textContent = "Your score: " + score + " / 3";
    result.style.color = score === 3 ? "green" : "orange";
  });
}
