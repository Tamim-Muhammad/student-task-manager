/**
 * Student Task Manager — Application Logic
 *
 * Features:
 *  1. Listen for the task form's submit event.
 *  2. Validate that the title is not blank.
 *  3. Dynamically create a new task card and prepend it to the list.
 *  4. Update the task counter badge.
 *  5. Clear form inputs after a successful submission.
 */

// ── DOM References ──
const taskForm    = document.getElementById('task-form');
const titleInput  = document.getElementById('task-title');
const descInput   = document.getElementById('task-desc');
const taskList    = document.getElementById('task-list');
const taskCounter = document.getElementById('task-counter');

// Running counter — initialised from the badge's current value
let taskCount = parseInt(taskCounter.textContent, 10) || 0;

/**
 * Generate a unique ID for each new task (timestamp-based).
 * @returns {string} Unique task identifier.
 */
function generateTaskId() {
  return 'task-' + Date.now();
}

/**
 * Update the task counter badge with the current count.
 */
function updateCounter() {
  taskCounter.textContent = taskCount;
}

/**
 * Clear the form inputs and remove any lingering error styles.
 */
function resetForm() {
  titleInput.value = '';
  descInput.value  = '';
  titleInput.classList.remove('input-error');
}

/**
 * Show a brief error highlight on the title input field.
 * The class is removed automatically after 1.5 s so the
 * user gets immediate visual feedback without a sticky state.
 */
function flashTitleError() {
  titleInput.classList.add('input-error');
  titleInput.focus();

  setTimeout(() => {
    titleInput.classList.remove('input-error');
  }, 1500);
}

/**
 * Create a task card DOM element from the provided data.
 *
 * @param {string} id    — Unique task ID.
 * @param {string} title — Task title text.
 * @param {string} desc  — Task description text.
 * @returns {HTMLElement} The constructed <article> element.
 */
function createTaskCard(id, title, desc) {
  const article = document.createElement('article');
  article.className = 'task-card task-card--new';
  article.setAttribute('data-task-id', id);

  // Build inner HTML
  const headerDiv = document.createElement('div');
  headerDiv.className = 'task-card-header';

  const h3 = document.createElement('h3');
  h3.className = 'task-title';
  h3.textContent = title;

  headerDiv.appendChild(h3);
  article.appendChild(headerDiv);

  // Only add a description paragraph if the user provided one
  if (desc) {
    const p = document.createElement('p');
    p.className = 'task-desc';
    p.textContent = desc;
    article.appendChild(p);
  }

  // Remove the entrance animation class once it completes
  article.addEventListener('animationend', () => {
    article.classList.remove('task-card--new');
  });

  return article;
}

// ── Form Submission Handler ──
taskForm.addEventListener('submit', function handleSubmit(event) {
  // Prevent the default page reload
  event.preventDefault();

  // Extract and trim input values
  const title = titleInput.value.trim();
  const desc  = descInput.value.trim();

  // Validate — title is required
  if (!title) {
    alert('Please enter a task title before submitting.');
    flashTitleError();
    return;
  }

  // Build a new task card
  const id   = generateTaskId();
  const card = createTaskCard(id, title, desc);

  // Prepend the new card so the latest task appears first
  taskList.prepend(card);

  // Increment and update the counter badge
  taskCount += 1;
  updateCounter();

  // Reset the form for the next entry
  resetForm();
});
