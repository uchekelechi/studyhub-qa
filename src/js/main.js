/**
 * StudyHub QA - Test Automation Learning Platform
 * 
 * Main application file containing all interactive page logic:
 * - Login form validation
 * - Student list filtering
 * - Quiz form handling
 * - Practice scenario handlers
 * 
 * All interactive elements have data-test attributes for reliable locating in automated tests.
 */

document.addEventListener("DOMContentLoaded", function () {
  // Initialize all page handlers when DOM is ready
  setupLoginForm();
  setupStudentFilter();
  setupQuizForm();
  setupPracticeScenarios();
});

/**
 * Login Form Handler
 * 
 * Manages login form validation with:
 * - HTML5 constraint validation (email format, required fields)
 * - Custom application-level validation (credentials check)
 * - Real-time error messaging
 * 
 * Demo credentials:
 * - Email: tester@example.com
 * - Password: password123
 */
function setupLoginForm() {
  const loginForm = document.getElementById("login-form");
  if (!loginForm) return;

  const emailInput = document.getElementById("login-email");
  const passwordInput = document.getElementById("login-password");
  const message = document.getElementById("login-message");

  // Demo credentials for training purposes
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

/**
 * Student Filter Handler
 * 
 * Real-time table filtering by student name
 * Updates visibility of table rows and provides feedback messages
 * 
 * Safely handles missing table element and defensive text access
 */
function setupStudentFilter() {
  const searchInput = document.getElementById("search-input");
  if (!searchInput) return;

  const table = document.getElementById("students-table");
  if (!table) return; // Guard: exit gracefully if table doesn't exist

  const rows = table.querySelectorAll("tbody tr");
  const filterMessage = document.getElementById("filter-message");

  searchInput.addEventListener("input", function () {
    const term = searchInput.value.toLowerCase();
    let visibleCount = 0;

    rows.forEach(row => {
      const nameCell = row.querySelector("td");
      const name = (nameCell?.textContent || "").toLowerCase(); // Defensive: handle missing nameCell
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

/**
 * Quiz Form Handler
 * 
 * Manages multi-type quiz form with:
 * - Text input validation (Q1)
 * - Checkbox selection (Q2: testing types)
 * - Radio button selection (Q3: testing timing)
 * - Optional textarea (Q4: comments)
 * - Automatic scoring logic
 * 
 * Scoring rules:
 * Q1: Exact match of "quality assurance"
 * Q2: Must select unit AND manual, NOT coffee
 * Q3: Must select "early"
 */
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

/**
 * Practice Page Scenarios
 * 
 * Six interactive test automation learning scenarios:
 * 1. Visibility & Waits - Handle elements that appear/disappear dynamically
 * 2. Form State - Real-time validation and field dependencies
 * 3. Modal Interactions - Dialog/overlay context switching
 * 4. Dynamic List Filtering - Multi-criteria filtering and state management
 * 5. Async Operations - Button states during async work (saving, loading)
 * 6. Sortable Tables - DOM manipulation and data reordering
 */

function setupPracticeScenarios() {
  setupVisibilityScenario();
  setupFormStateScenario();
  setupModalScenario();
  setupDynamicListScenario();
  setupAsyncButtonScenario();
  setupSortableTableScenario();
  setupPaginationScenario();
  setupTabsAndAccordion();
  setupToastNotifications();
  setupWizardForm();
  setupFileUpload();
  setupApiSimulation();
  setupKeyboardNavigation();
  setupDataGridActions();
}

/**
 * Scenario 1: Visibility & Wait Patterns
 * Tests the ability to handle dynamically appearing elements
 * Click button → show spinner → 2s delay → hide spinner & show result
 */
function setupVisibilityScenario() {
  const loadButton = document.getElementById("load-button");
  if (!loadButton) return;

  loadButton.addEventListener("click", function () {
    document.getElementById("loading-spinner").style.display = "block";
    document.getElementById("data-result").style.display = "none";

    setTimeout(function () {
      document.getElementById("loading-spinner").style.display = "none";
      document.getElementById("data-result").style.display = "block";
      document.getElementById("load-timestamp").textContent = new Date().toLocaleTimeString();
    }, 2000);
  });
}

/**
 * Scenario 2: Form State & Validation
 * Tests real-time field validation and form dependency logic
 * Submit button should only be enabled when:
 * - Email is valid
 * - Password is 8+ characters
 * - Terms checkbox is checked
 */
function setupFormStateScenario() {
  const form = document.getElementById("state-form");
  if (!form) return;

  const emailInput = document.getElementById("state-email");
  const passwordInput = document.getElementById("state-password");
  const agreeCheckbox = document.getElementById("agree-terms");
  const submitButton = document.getElementById("state-submit");
  const emailError = document.getElementById("email-error");
  const passwordError = document.getElementById("password-error");
  const formMessage = document.getElementById("form-message");

  // Enable submit only when all conditions met
  function checkFormValidity() {
    const emailValid = emailInput.validity.valid && emailInput.value.length > 0;
    const passwordValid = passwordInput.value.length >= 8;
    const agreeChecked = agreeCheckbox.checked;
    submitButton.disabled = !(emailValid && passwordValid && agreeChecked);
  }

  // Real-time validation feedback
  emailInput.addEventListener("input", function () {
    emailError.style.display = "";
    if (!this.validity.valid && this.value.length > 0) {
      emailError.textContent = "Please enter a valid email address.";
      emailError.style.display = "block";
    } else {
      emailError.style.display = "none";
    }
    checkFormValidity();
  });

  passwordInput.addEventListener("input", function () {
    passwordError.style.display = "";
    if (this.value.length > 0 && this.value.length < 8) {
      passwordError.textContent = "Password must be at least 8 characters.";
      passwordError.style.display = "block";
    } else {
      passwordError.style.display = "none";
    }
    checkFormValidity();
  });

  agreeCheckbox.addEventListener("change", checkFormValidity);

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    formMessage.textContent = "✓ Form submitted successfully!";
    formMessage.style.color = "green";
  });
}

/**
 * Scenario 3: Modal Interactions
 * Tests ability to interact with dialog windows and overlays
 * Tests modal open/close, form interaction within modal, and overlay click handling
 */
function setupModalScenario() {
  const openButton = document.getElementById("open-modal");
  const closeButton = document.getElementById("close-modal");
  const cancelButton = document.getElementById("modal-cancel");
  const saveButton = document.getElementById("modal-save");
  const modalOverlay = document.getElementById("modal-overlay");

  if (!openButton) return;

  openButton.addEventListener("click", function () {
    modalOverlay.style.display = "flex";
    document.body.style.overflow = "hidden"; // Prevent background scroll
  });

  function closeModal() {
    modalOverlay.style.display = "none";
    document.body.style.overflow = "auto";
  }

  closeButton.addEventListener("click", closeModal);
  cancelButton.addEventListener("click", closeModal);

  saveButton.addEventListener("click", function () {
    const theme = document.getElementById("theme-select").value;
    const notificationsEnabled = document.getElementById("notifications").checked;
    console.log("Settings saved:", { theme, notificationsEnabled });
    closeModal();
  });

  // Close modal when clicking outside
  modalOverlay.addEventListener("click", function (event) {
    if (event.target === modalOverlay) {
      closeModal();
    }
  });
}

/**
 * Scenario 4: Dynamic List & Multiple Filters
 * Tests combining multiple filter criteria
 * Filters table by name AND role, updates row visibility, and provides feedback
 */
function setupDynamicListScenario() {
  const searchInput = document.getElementById("member-search");
  const roleFilter = document.getElementById("role-filter");
  const resetButton = document.getElementById("reset-filters");
  const table = document.getElementById("members-table");
  const resultMessage = document.getElementById("filter-result-message");

  if (!searchInput) return;

  function applyFilters() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedRole = roleFilter.value;
    const rows = table.querySelectorAll("tbody tr");
    let visibleCount = 0;

    rows.forEach(row => {
      const name = row.getAttribute("data-name") || "";
      const role = row.getAttribute("data-role") || "";
      
      const matchesSearch = name.includes(searchTerm);
      const matchesRole = selectedRole === "" || role.toLowerCase() === selectedRole;
      const isVisible = matchesSearch && matchesRole;

      row.style.display = isVisible ? "" : "none";
      if (isVisible) visibleCount++;
    });

    // Update message
    if (visibleCount === 0 && (searchTerm || selectedRole)) {
      resultMessage.textContent = "No members found matching your filters.";
      resultMessage.style.color = "var(--text-muted)";
    } else {
      resultMessage.textContent = visibleCount > 0 ? visibleCount + " member(s) found" : "";
    }
  }

  searchInput.addEventListener("input", applyFilters);
  roleFilter.addEventListener("change", applyFilters);

  resetButton.addEventListener("click", function () {
    searchInput.value = "";
    roleFilter.value = "";
    resultMessage.textContent = "";
    applyFilters();
  });
}

/**
 * Scenario 5: Async Button & Loading States
 * Tests button state management during async operations
 * Button disables during operation, shows loading state, then success message
 */
function setupAsyncButtonScenario() {
  const asyncButton = document.getElementById("async-submit");
  if (!asyncButton) return;

  asyncButton.addEventListener("click", function () {
    asyncButton.disabled = true;
    document.getElementById("async-loading").style.display = "block";
    document.getElementById("async-success").style.display = "none";

    setTimeout(function () {
      document.getElementById("async-loading").style.display = "none";
      document.getElementById("async-success").style.display = "block";
      document.getElementById("async-timestamp").textContent = new Date().toLocaleTimeString();
      asyncButton.disabled = false;
    }, 3000);
  });
}

/**
 * Scenario 6: Sortable Table
 * Tests ability to sort table data by clicking column headers
 * Supports ascending/descending toggle and numeric/text sorting
 */
function setupSortableTableScenario() {
  const table = document.getElementById("scores-table");
  if (!table) return;

  const headers = table.querySelectorAll("th.sortable");
  let currentSort = { field: null, direction: "asc" };

  headers.forEach(header => {
    header.style.cursor = "pointer";
    header.addEventListener("click", function () {
      const sortField = this.getAttribute("data-sort");
      
      // Toggle direction if same field clicked
      if (currentSort.field === sortField) {
        currentSort.direction = currentSort.direction === "asc" ? "desc" : "asc";
      } else {
        currentSort.field = sortField;
        currentSort.direction = "asc";
      }

      // Update sort indicators
      headers.forEach(h => h.querySelector(".sort-indicator").textContent = "");
      this.querySelector(".sort-indicator").textContent = currentSort.direction === "asc" ? "↑" : "↓";

      // Sort table
      sortTable(table, sortField, currentSort.direction);
    });
  });

  function sortTable(table, field, direction) {
    const tbody = table.querySelector("tbody");
    const rows = Array.from(tbody.querySelectorAll("tr"));
    const headerIndex = Array.from(headers).findIndex(h => h.getAttribute("data-sort") === field);

    rows.sort((rowA, rowB) => {
      const cellA = rowA.querySelectorAll("td")[headerIndex].textContent.trim();
      const cellB = rowB.querySelectorAll("td")[headerIndex].textContent.trim();

      // Try to parse as number for numeric fields
      const numA = parseFloat(cellA);
      const numB = parseFloat(cellB);
      
      let comparison = 0;
      if (!isNaN(numA) && !isNaN(numB)) {
        comparison = numA - numB;
      } else {
        comparison = cellA.localeCompare(cellB);
      }

      return direction === "asc" ? comparison : -comparison;
    });

    // Re-append sorted rows
    rows.forEach(row => tbody.appendChild(row));
  }
}

/**
 * Scenario 7: Pagination
 * Tests pagination controls and table state management
 * Click prev/next → table updates → reflection in UI
 */
function setupPaginationScenario() {
  const itemsPerPage = 5;
  let currentPage = 1;
  
  // Sample data
  const allData = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'QA Engineer' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Developer' },
    { id: 3, name: 'Carol White', email: 'carol@example.com', role: 'Product Manager' },
    { id: 4, name: 'David Lee', email: 'david@example.com', role: 'QA Engineer' },
    { id: 5, name: 'Eve Davis', email: 'eve@example.com', role: 'DevOps' },
    { id: 6, name: 'Frank Brown', email: 'frank@example.com', role: 'Developer' },
    { id: 7, name: 'Grace Chen', email: 'grace@example.com', role: 'QA Engineer' },
    { id: 8, name: 'Henry Wilson', email: 'henry@example.com', role: 'Architect' },
    { id: 9, name: 'Iris Taylor', email: 'iris@example.com', role: 'QA Engineer' },
    { id: 10, name: 'Jack Martin', email: 'jack@example.com', role: 'Developer' },
    { id: 11, name: 'Kate Anderson', email: 'kate@example.com', role: 'Manager' },
    { id: 12, name: 'Liam Garcia', email: 'liam@example.com', role: 'QA Engineer' },
    { id: 13, name: 'Maria Rodriguez', email: 'maria@example.com', role: 'Developer' },
    { id: 14, name: 'Nathan Moore', email: 'nathan@example.com', role: 'QA Engineer' },
    { id: 15, name: 'Olivia Jackson', email: 'olivia@example.com', role: 'Product Manager' }
  ];

  function renderPage() {
    const tbody = document.getElementById('pagination-body');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    const pageData = allData.slice(startIdx, endIdx);
    
    pageData.forEach(item => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.id}</td>
        <td data-test="pagination-name">${item.name}</td>
        <td>${item.email}</td>
        <td><span class="status-badge active">${item.role}</span></td>
      `;
      tbody.appendChild(row);
    });
    
    // Update pagination info
    const totalPages = Math.ceil(allData.length / itemsPerPage);
    const paginationInfo = document.getElementById('pagination-info');
    if (paginationInfo) {
      paginationInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    }
    
    // Enable/disable buttons
    const prevBtn = document.getElementById('prev-page');
    const nextBtn = document.getElementById('next-page');
    if (prevBtn) prevBtn.disabled = currentPage === 1;
    if (nextBtn) nextBtn.disabled = currentPage === totalPages;
  }
  
  // Event listeners
  const prevBtn = document.getElementById('prev-page');
  const nextBtn = document.getElementById('next-page');
  
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        renderPage();
      }
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const totalPages = Math.ceil(allData.length / itemsPerPage);
      if (currentPage < totalPages) {
        currentPage++;
        renderPage();
      }
    });
  }
  
  // Initial render
  renderPage();
}

/**
 * Scenario 8: Accordion & Tabs
 * Tests tab switching and accordion expansion/collapse
 * Click tab → switch view | Click accordion header → toggle expansion
 */
function setupTabsAndAccordion() {
  // Tabs functionality
  const tabButtons = document.querySelectorAll('[data-tab-button]');
  const tabPanes = document.querySelectorAll('[data-tab-pane]');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const tabName = button.getAttribute('data-tab-button');
      
      // Remove active class from all
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabPanes.forEach(pane => pane.classList.remove('active'));
      
      // Add active to clicked
      button.classList.add('active');
      const activePane = document.querySelector(`[data-tab-pane="${tabName}"]`);
      if (activePane) activePane.classList.add('active');
    });
  });
  
  // Accordion functionality
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      header.classList.toggle('active');
      const body = header.nextElementSibling;
      if (body) {
        body.style.display = body.style.display === 'none' ? 'block' : 'none';
      }
    });
  });
}

/**
 * Scenario 9: Toast Notifications
 * Tests temporary notification messages
 * Click button → toast appears → auto-dismiss after 3s | or click X to close
 */
function setupToastNotifications() {
  const toastContainer = document.getElementById('toast-container');
  if (!toastContainer) return;
  
  window.showToast = function(message, type = 'info', duration = 3000) {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.setAttribute('data-test', `toast-${type}`);
    
    const typeIcons = {
      success: '✓',
      error: '✕',
      info: 'ℹ',
      warning: '⚠'
    };
    
    toast.innerHTML = `
      <span>${typeIcons[type]} ${message}</span>
      <button class="toast-close" aria-label="Close">×</button>
    `;
    
    toastContainer.appendChild(toast);
    
    const closeBtn = toast.querySelector('.toast-close');
    const removeToast = () => toast.remove();
    
    closeBtn.addEventListener('click', removeToast);
    
    if (duration > 0) {
      setTimeout(removeToast, duration);
    }
  };
  
  // Toast trigger buttons
  const toastButtons = document.querySelectorAll('[data-test^="toast-trigger"]');
  toastButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.getAttribute('data-test').replace('toast-trigger-', '');
      window.showToast(`This is a ${type} notification!`, type);
    });
  });
}

/**
 * Scenario 10: Multi-Step Wizard Form
 * Tests form flow across multiple steps
 * Next → validation → step update | Prev → step back | Submit → confirmation
 */
function setupWizardForm() {
  let currentStep = 1;
  const totalSteps = 3;
  
  function renderStep() {
    // Hide all steps
    document.querySelectorAll('[data-wizard-step]').forEach(step => {
      step.style.display = 'none';
    });
    
    // Show current step
    const currentStepEl = document.querySelector(`[data-wizard-step="${currentStep}"]`);
    if (currentStepEl) currentStepEl.style.display = 'block';
    
    // Update button states
    const prevBtn = document.getElementById('wizard-prev');
    const nextBtn = document.getElementById('wizard-next');
    const submitBtn = document.getElementById('wizard-submit');
    
    if (prevBtn) prevBtn.disabled = currentStep === 1;
    if (nextBtn) nextBtn.style.display = currentStep === totalSteps ? 'none' : 'inline-block';
    if (submitBtn) submitBtn.style.display = currentStep === totalSteps ? 'inline-block' : 'none';
    
    // Update progress
    updateWizardProgress();
  }
  
  function updateWizardProgress() {
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
      const percent = (currentStep / totalSteps) * 100;
      progressBar.style.width = percent + '%';
    }
    
    const stepIndicators = document.querySelectorAll('.step-indicator');
    stepIndicators.forEach((indicator, idx) => {
      const stepNum = idx + 1;
      if (stepNum <= currentStep) {
        indicator.classList.add('active');
      } else {
        indicator.classList.remove('active');
      }
    });
  }
  
  // Navigation buttons
  const prevBtn = document.getElementById('wizard-prev');
  const nextBtn = document.getElementById('wizard-next');
  const submitBtn = document.getElementById('wizard-submit');
  
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentStep > 1) {
        currentStep--;
        renderStep();
      }
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      // Simple validation: check if form has required fields
      const currentStepEl = document.querySelector(`[data-wizard-step="${currentStep}"]`);
      const inputs = currentStepEl?.querySelectorAll('input[required]');
      let isValid = true;
      
      if (inputs) {
        inputs.forEach(input => {
          if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
          }
        });
      }
      
      if (isValid && currentStep < totalSteps) {
        currentStep++;
        renderStep();
      }
    });
  }
  
  if (submitBtn) {
    submitBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.showToast?.('Wizard submitted successfully!', 'success') || 
      alert('Form submitted!');
    });
  }
  
  renderStep();
}

/**
 * Scenario 11: File Upload
 * Tests file upload with drag-drop and progress tracking
 * Drag file → drop zone → file added to list → progress simulation
 */
function setupFileUpload() {
  const uploadZone = document.getElementById('upload-zone');
  const fileInput = document.getElementById('file-input');
  const uploadList = document.getElementById('upload-list');
  
  if (!uploadZone || !fileInput) return;
  
  // Click to upload
  uploadZone.addEventListener('click', () => fileInput.click());
  
  // Handle drop
  uploadZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadZone.classList.add('dragover');
  });
  
  uploadZone.addEventListener('dragleave', () => {
    uploadZone.classList.remove('dragover');
  });
  
  uploadZone.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadZone.classList.remove('dragover');
    handleFiles(e.dataTransfer.files);
  });
  
  // File input change
  fileInput.addEventListener('change', (e) => {
    handleFiles(e.target.files);
  });
  
  function handleFiles(files) {
    Array.from(files).forEach(file => {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'text/plain', 'application/pdf'];
      if (!validTypes.includes(file.type)) {
        window.showToast?.(`Invalid file type: ${file.type}`, 'error') || 
        alert('Invalid file type');
        return;
      }
      
      // Simulate upload
      simulateUpload(file);
    });
  }
  
  function simulateUpload(file) {
    const fileItem = document.createElement('div');
    fileItem.className = 'file-upload-item';
    fileItem.innerHTML = `
      <span data-test="file-name">${file.name}</span>
      <div class="progress-bar" style="width: 0%"></div>
    `;
    
    if (uploadList) uploadList.appendChild(fileItem);
    
    // Simulate progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
      }
      const progressBar = fileItem.querySelector('.progress-bar');
      if (progressBar) progressBar.style.width = progress + '%';
    }, 200);
  }
}

/**
 * Scenario 12: API Simulation & Dynamic Data
 * Tests fetching and displaying dynamic data
 * Click button → simulate network delay → populate table | or show error
 */
function setupApiSimulation() {
  const loadBtn = document.getElementById('load-data-btn');
  const apiTable = document.getElementById('api-table');
  const errorMsg = document.getElementById('api-error');
  
  if (!loadBtn) return;
  
  const mockData = [
    { id: 101, title: 'Login Page Test', status: 'PASS', duration: '234ms' },
    { id: 102, title: 'Search Functionality', status: 'FAIL', duration: '512ms' },
    { id: 103, title: 'User Profile Update', status: 'PASS', duration: '189ms' },
    { id: 104, title: 'Payment Processing', status: 'PASS', duration: '1234ms' },
    { id: 105, title: 'Data Export', status: 'FAIL', duration: '2101ms' }
  ];
  
  loadBtn.addEventListener('click', async () => {
    loadBtn.disabled = true;
    loadBtn.textContent = 'Loading...';
    if (errorMsg) errorMsg.style.display = 'none';
    
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate random errors (20% chance)
      if (Math.random() < 0.2) {
        throw new Error('Network error occurred');
      }
      
      // Populate table
      const tbody = apiTable?.querySelector('tbody');
      if (tbody) {
        tbody.innerHTML = mockData.map(item => `
          <tr>
            <td>${item.id}</td>
            <td data-test="api-title">${item.title}</td>
            <td><span class="status-badge ${item.status === 'PASS' ? 'active' : 'error'}">${item.status}</span></td>
            <td>${item.duration}</td>
          </tr>
        `).join('');
      }
      
      window.showToast?.('Data loaded successfully!', 'success') || alert('Data loaded');
    } catch (error) {
      if (errorMsg) {
        errorMsg.style.display = 'block';
        errorMsg.textContent = error.message;
      }
      window.showToast?.(error.message, 'error') || alert(error.message);
    } finally {
      loadBtn.disabled = false;
      loadBtn.textContent = 'Load Data';
    }
  });
}

/**
 * Scenario 13: Keyboard Navigation & Shortcuts
 * Tests keyboard-driven interactions
 * Arrow keys to move, Enter to select, Esc to clear selection
 */
function setupKeyboardNavigation() {
  const itemsList = document.getElementById('keyboard-items-list');
  if (!itemsList) return;
  
  let selectedIndex = -1;
  const items = document.querySelectorAll('.keyboard-item');
  
  function selectItem(index) {
    items.forEach(item => item.classList.remove('active'));
    if (index >= 0 && index < items.length) {
      items[index].classList.add('active');
      items[index].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    selectedIndex = index;
  }
  
  items.forEach((item, index) => {
    item.addEventListener('click', () => selectItem(index));
  });
  
  document.addEventListener('keydown', (e) => {
    // Only handle if a keyboard-item exists on this page
    if (items.length === 0) return;
    
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      selectItem(selectedIndex + 1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      selectItem(selectedIndex - 1);
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      const item = items[selectedIndex];
      window.showToast?.(`Selected: ${item.textContent.trim()}`, 'info') || 
      alert('Selected: ' + item.textContent);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      selectItem(-1);
    }
  });
}

/**
 * Scenario 14: Data Grid with Row Actions
 * Tests interactive table rows with edit/delete actions
 * Click edit → notification | Click delete → confirm → mark as deleted
 */
function setupDataGridActions() {
  const gridTable = document.getElementById('data-grid-table');
  if (!gridTable) return;
  
  const tbody = gridTable.querySelector('tbody');
  if (!tbody) return;
  
  const rows = tbody.querySelectorAll('tr');
  rows.forEach(row => {
    const statusCell = row.querySelector('[data-test="grid-status"]');
    const editBtn = row.querySelector('[data-test="grid-edit"]');
    const deleteBtn = row.querySelector('[data-test="grid-delete"]');
    
    if (editBtn) {
      editBtn.addEventListener('click', () => {
        const id = row.getAttribute('data-row-id');
        const name = row.querySelector('[data-test="grid-name"]')?.textContent;
        window.showToast?.(`Editing: ${name}`, 'info') || alert('Edit: ' + name);
      });
    }
    
    if (deleteBtn) {
      deleteBtn.addEventListener('click', () => {
        const id = row.getAttribute('data-row-id');
        const confirmed = confirm('Are you sure you want to delete this row?');
        if (confirmed) {
          row.style.opacity = '0.5';
          row.style.pointerEvents = 'none';
          window.showToast?.('Row deleted', 'success') || alert('Deleted');
        }
      });
    }
  });
  
  // Status toggle functionality
  const statusBadges = tbody.querySelectorAll('[data-test="grid-status"]');
  statusBadges.forEach(badge => {
    badge.style.cursor = 'pointer';
    badge.addEventListener('click', () => {
      const currentStatus = badge.textContent.trim();
      const statuses = ['ACTIVE', 'INACTIVE', 'PENDING'];
      const currentIdx = statuses.indexOf(currentStatus);
      const nextStatus = statuses[(currentIdx + 1) % statuses.length];
      
      badge.textContent = nextStatus;
      badge.className = `status-badge ${nextStatus.toLowerCase()}`;
      window.showToast?.(`Status changed to ${nextStatus}`, 'success');
    });
  });
}
