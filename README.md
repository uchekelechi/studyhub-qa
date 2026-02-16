# StudyHub QA

A comprehensive test automation learning platform built for teaching **Cypress**, **Playwright**, and **RobotFramework** through 14 interactive practice scenarios and 5 knowledge assessment quizzes.

## Overview

StudyHub QA is a hands-on educational website designed to help aspiring QA engineers master test automation concepts. It provides real-world UI patterns, interactive scenarios, and assessment quizzes that learners can test using popular automation frameworks.

**Target Audience:** Beginner to intermediate QA engineers and developers learning test automation  
**Scenarios:** 14 practice + 5 quizzes = 19 pages  
**Prerequisites:** Basic HTML/CSS/JavaScript knowledge, familiarity with browser developer tools

## Key Features

- ✅ **14 Interactive Practice Scenarios** — Visibility & waits, form validation, modals, filtering, async operations, sorting, pagination, tabs, notifications, wizards, file uploads, API simulation, keyboard navigation, data grids
- ✅ **5 Knowledge Assessment Quizzes** — Test understanding of core concepts with 25 total questions
- ✅ **Test-Friendly Design** — Semantic HTML, aria attributes, consistent data-test selectors
- ✅ **Multi-Framework Support** — Examples for Cypress, Playwright, and RobotFramework
- ✅ **Real-World Patterns** — Dynamic content, loading states, validation errors, disabled states, multi-step forms
- ✅ **Accessibility First** — WCAG-compliant markup with live regions and keyboard navigation

## Project Structure

```
studyhub-qa/
├── index.html              # Home page with login exercise
├── practice.html           # Hub page for 14 practice scenarios
├── practice-1.html         # Scenario 1: Visibility & Waits
├── practice-2.html         # Scenario 2: Form State & Validation
├── practice-3.html         # Scenario 3: Modal Interactions
├── practice-4.html         # Scenario 4: Dynamic Filtering
├── practice-5.html         # Scenario 5: Async Operations & Loading
├── practice-6.html         # Scenario 6: Sortable Table Headers
├── practice-7.html         # Scenario 7: Pagination
├── practice-8.html         # Scenario 8: Accordion & Tabs
├── practice-9.html         # Scenario 9: Toast Notifications
├── practice-10.html        # Scenario 10: Multi-Step Form Wizard
├── practice-11.html        # Scenario 11: File Upload
├── practice-12.html        # Scenario 12: API Simulation & Data Loading
├── practice-13.html        # Scenario 13: Keyboard Navigation & Shortcuts
├── practice-14.html        # Scenario 14: Data Grid with Row Actions
├── quiz.html               # Hub page for 5 quiz topics
├── practice-15.html        # Quiz 1: Visibility & Waits (5 questions)
├── practice-16.html        # Quiz 2: Form Handling (5 questions)
├── practice-17.html        # Quiz 3: Table Operations (5 questions)
├── practice-18.html        # Quiz 4: UI Interactions (5 questions)
├── practice-19.html        # Quiz 5: Advanced Topics (5 questions)
├── src/
│   ├── js/
│   │   └── main.js        # Application logic (all page handlers)
│   └── css/
│       └── styles.css     # Unified styling with CSS variables
├── docs/
│   ├── TESTING_GUIDE.md   # Test automation tips and patterns
│   ├── CYPRESS.md         # Cypress-specific examples
│   ├── PLAYWRIGHT.md      # Playwright-specific examples
│   └── ROBOTFRAMEWORK.md  # RobotFramework examples
├── package.json           # Project metadata and dependencies
├── .gitignore             # Git ignore rules
└── README.md              # This file
```

## Pages & Learning Objectives

### 1. **Home (index.html)**
- **Scenario:** User login with email/password validation
- **Skills:** Form locators, input validation, error messages, text assertions
- **Practice:** `cy.get('#login-email')`, `.type()`, `.click()`, conditional messaging

### 2. **Practice Hub (practice.html)**
Central hub linking to 14 interactive practice scenarios covering fundamental to advanced test automation patterns.

### 3. **Practice Scenarios (practice-1.html through practice-14.html)**

| # | Scenario | Key Skills | Topics |
|---|----------|-----------|--------|
| 1 | **Visibility & Waits** | Wait strategies, dynamic elements | Timing, visibility checks |
| 2 | **Form Validation** | Field validation, disabled states, error messages | Form interacts |
| 3 | **Modal Dialogs** | Modal context switching, overlay handling | Dialog testing |
| 4 | **Dynamic Filtering** | Multi-column filtering, real-time updates | Search, filtering |
| 5 | **Async Operations** | Loading states, async button disabling, success feedback | Async patterns |
| 6 | **Sortable Tables** | Click-to-sort, column headers, row order verification | Table manipulation |
| 7 | **Pagination** | Page navigation, content updates, state tracking | Paginated content |
| 8 | **Accordion & Tabs** | Expand/collapse, tab switching, content switching | UI interactions |
| 9 | **Toast Notifications** | Temporary messages, auto-dismiss, multiple toasts | Notifications |
| 10 | **Multi-Step Form** | Form progress, step navigation, validation, review | Wizard patterns |
| 11 | **File Upload** | Drag-drop, file validation, progress bars | File handling |
| 12 | **API Simulation** | Dynamic data loading, error handling, table population | API responses |
| 13 | **Keyboard Navigation** | Arrow keys, Enter, Escape, keyboard shortcuts | Accessibility |
| 14 | **Data Grid** | Row actions, status changes, confirmations | Grid operations |

### 4. **Quiz Hub (quiz.html)**
Assessment hub linking to 5 topic-based quizzes for testing knowledge of practice scenarios.

### 5. **Quizzes (practice-15.html through practice-19.html)**
- **Quiz 1:** Visibility & Waits (5 questions)
- **Quiz 2:** Form Handling (5 questions)
- **Quiz 3:** Table Operations (5 questions)
- **Quiz 4:** UI Interactions (5 questions)
- **Quiz 5:** Advanced Topics (5 questions)

## Quick Start

### Viewing the Site
```bash
# Option 1: Using Python (any version)
python -m http.server 8000

# Option 2: Using Node.js http-server
npx http-server

# Option 3: Using VS Code Live Server extension
# Right-click index.html -> Open with Live Server
```

Then navigate to `http://localhost:8000`

### Writing Your First Test (Cypress Example)

```javascript
// Open StudyHub home page
cy.visit('http://localhost:8000');

// Test login form on home page
cy.get('[data-test="login-email"]').type('tester@example.com');
cy.get('[data-test="login-password"]').type('password123');
cy.get('[data-test="login-button"]').click();

// Verify success message
cy.get('[data-test="login-message"]').should('contain', 'Login successful');

// Navigate to practice scenarios
cy.get('[data-test="nav-practice"]').click();
cy.url().should('include', 'practice.html');

// Test first scenario: Visibility & Waits
cy.visit('http://localhost:8000/practice-1.html');
cy.get('[data-test="load-button"]').click();
cy.get('[data-test="loading-spinner"]').should('be.visible');
cy.get('[data-test="data-result"]').should('be.visible', {timeout: 5000});
```

### Writing Your First Test (Playwright Example)

```javascript
// Import Playwright
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Navigate to StudyHub
  await page.goto('http://localhost:8000');
  
  // Fill login form
  await page.fill('[data-test="login-email"]', 'tester@example.com');
  await page.fill('[data-test="login-password"]', 'password123');
  await page.click('[data-test="login-button"]');
  
  // Verify success
  const message = await page.textContent('[data-test="login-message"]');
  console.assert(message.includes('Login successful'));
  
  await browser.close();
})();
```

## CSS Architecture

**Design System** — CSS variables for consistent theming:
- `--primary`: Main brand color (#1e88e5)
- `--primary-dark`: Darker variant (#1565c0)
- `--bg`: Page background
- `--card-bg`: Card/panel background
- `--text-main`: Primary text color
- `--border`: Border color
- `--radius`: Border radius value
- `--shadow-soft`: Subtle shadow
- `--shadow-strong`: Prominent shadow

All components use CSS variables for easy theming and maintenance.

## Testing Checklist

Use this checklist to practice different test automation skills:

- [ ] **Login Form**
  - [ ] Valid credentials allow login
  - [ ] Invalid email shows error
  - [ ] Empty fields are rejected
  - [ ] Password has minimum length validation

- [ ] **Students Table**
  - [ ] Search filters by name correctly
  - [ ] Filter updates count message
  - [ ] When no results, shows "No students found"
  - [ ] Clearing search shows all rows

- [ ] **Quiz Form**
  - [ ] Text input validated
  - [ ] At least one checkbox required
  - [ ] Single radio selection works
  - [ ] Optional textarea doesn't block submission
  - [ ] Score calculation is correct

- [ ] **Practice Scenarios**
  - [ ] Load button shows/hides spinner correctly
  - [ ] Form submit disabled until valid
  - [ ] Modal opens and closes
  - [ ] Async operation shows loading state
  - [ ] Table sorts ascending/descending

## Demo Accounts

For testing the login functionality:

| Email | Password | Status |
|-------|----------|--------|
| tester@example.com | password123 | ✅ Valid |
| invalid@email.com | wrongpass | ❌ Invalid |

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Accessibility Features

- ✅ Semantic HTML5 elements (`<button>`, `<form>`, `<label>`)
- ✅ ARIA attributes (`aria-label`, `aria-live`, `aria-modal`)
- ✅ Properly associated labels with form inputs
- ✅ Color contrast ratios meet WCAG AA standards
- ✅ Keyboard navigation support
- ✅ Focus indicators visible on all interactive elements

## Contributing

This project is maintained as an educational resource. Suggestions for new scenarios or improvements are welcome!

### Suggesting New Scenarios
1. Open an issue describing the testing pattern you'd like to learn
2. Explain why it's valuable for QA engineers
3. Provide example test code

### Code Standards
- Use semantic HTML
- Include meaningful `data-test` attributes
- Document complex logic with inline comments
- Follow existing CSS variable naming conventions
- Test across browsers before submitting

## Common Issues

### Q: Localhost site won't load?
**A:** Make sure you're serving from the project directory and the port (8000) is not blocked.

### Q: Tests fail intermittently?
**A:** Add explicit waits for dynamic content. Example: `cy.get('[data-test="data-result"]').should('be.visible', {timeout: 5000})`

### Q: Form validation not triggering?
**A:** Browsers may handle HTML5 validation differently. Check browser console for errors.

## Learning Resources

- [Cypress Documentation](https://docs.cypress.io)
- [Playwright Documentation](https://playwright.dev)
- [Robot Framework Documentation](https://robotframework.org)
- [Web Testing Best Practices](https://www.smashingmagazine.com/2021/10/looking-beyond-web-pages)

## License

Educational content - feel free to fork and modify for learning purposes.

## Support

For questions or issues with StudyHub:
1. Check the [Testing Guide](docs/TESTING_GUIDE.md)
2. Review framework-specific docs in `/docs`
3. Inspect browser console for JavaScript errors

---

**Last Updated:** February 2026  
**Version:** 1.0.0
