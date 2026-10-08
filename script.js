/**
 * Student Task Manager — Application Logic
 *
 * Features:
 *  1. Listen for the task form's submit event.
 *  2. Validate that the title is not blank (with error flash).
 *  3. Dynamically create a new task card with status "Pending" by default.
 *  4. Prepend newly created tasks to the list.
 *  5. Interactive toggle: switch status between "Pending" and "Completed" on click.
 *  6. Update the task counter badge dynamically.
 *  7. Clear form inputs after a successful submission.
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
 * Set the status of a given task card and update its badge/DOM representation.
 *
 * @param {HTMLElement} taskCard
 * @param {'Pending'|'Completed'} newStatus
 */
function setTaskStatus(taskCard, newStatus) {
  taskCard.setAttribute('data-status', newStatus);
  taskCard.dataset.status = newStatus;

  const isCompleted = newStatus === 'Completed';
  taskCard.classList.toggle('task-card--completed', isCompleted);

  const badgeBtn = taskCard.querySelector('.status-badge');
  if (badgeBtn) {
    badgeBtn.className = `status-badge ${isCompleted ? 'status-completed' : 'status-pending'}`;
    badgeBtn.setAttribute('title', 'Click to toggle status');
    badgeBtn.setAttribute('aria-label', `Status: ${newStatus}. Click to toggle`);

    const statusText = badgeBtn.querySelector('.status-text');
    if (statusText) {
      statusText.textContent = newStatus;
    }
  }
}

/**
 * Toggle a task card between 'Pending' and 'Completed'.
 *
 * @param {HTMLElement} taskCard
 */
function toggleTaskStatus(taskCard) {
  const currentStatus = taskCard.getAttribute('data-status') || 'Pending';
  const nextStatus = currentStatus === 'Pending' ? 'Completed' : 'Pending';
  setTaskStatus(taskCard, nextStatus);
}

/**
 * Create a task card DOM element from the provided data.
 *
 * @param {string} id             — Unique task ID.
 * @param {string} title          — Task title text.
 * @param {string} desc           — Task description text.
 * @param {'Pending'|'Completed'} [status='Pending'] — Status property, defaults to 'Pending'.
 * @returns {HTMLElement} The constructed <article> element.
 */
function createTaskCard(id, title, desc, status = 'Pending') {
  const article = document.createElement('article');
  const isCompleted = status === 'Completed';

  article.className = `task-card task-card--new${isCompleted ? ' task-card--completed' : ''}`;
  article.setAttribute('data-task-id', id);
  article.setAttribute('data-status', status);
  article.dataset.status = status;

  // Header: contains title and status badge
  const headerDiv = document.createElement('div');
  headerDiv.className = 'task-card-header';

  const h3 = document.createElement('h3');
  h3.className = 'task-title';
  h3.textContent = title;

  // Interactive status badge button
  const badgeBtn = document.createElement('button');
  badgeBtn.type = 'button';
  badgeBtn.className = `status-badge ${isCompleted ? 'status-completed' : 'status-pending'}`;
  badgeBtn.setAttribute('title', 'Click to toggle status');
  badgeBtn.setAttribute('aria-label', `Status: ${status}. Click to toggle`);

  const dot = document.createElement('span');
  dot.className = 'status-dot';

  const text = document.createElement('span');
  text.className = 'status-text';
  text.textContent = status;

  badgeBtn.appendChild(dot);
  badgeBtn.appendChild(text);

  headerDiv.appendChild(h3);
  headerDiv.appendChild(badgeBtn);
  article.appendChild(headerDiv);

  // Description paragraph (if provided)
  if (desc) {
    const p = document.createElement('p');
    p.className = 'task-desc';
    p.textContent = desc;
    article.appendChild(p);
  }

  // Remove the entrance animation class once it finishes
  article.addEventListener('animationend', () => {
    article.classList.remove('task-card--new');
  });

  return article;
}

// ── Event Delegation for Status Toggle ──
taskList.addEventListener('click', function handleListClick(event) {
  const badgeBtn = event.target.closest('.status-badge');
  if (badgeBtn) {
    const taskCard = badgeBtn.closest('.task-card');
    if (taskCard) {
      toggleTaskStatus(taskCard);
    }
  }
});

// ── Form Submission Handler ──
taskForm.addEventListener('submit', function handleSubmit(event) {
  // Prevent default page reload
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

  // Create new task object with default status 'Pending'
  const newTask = {
    id: generateTaskId(),
    title: title,
    desc: desc,
    status: 'Pending'
  };

  // Build the task card DOM element
  const card = createTaskCard(newTask.id, newTask.title, newTask.desc, newTask.status);

  // Prepend the new card so latest task appears first
  taskList.prepend(card);

  // Increment and update the counter badge
  taskCount += 1;
  updateCounter();

  // Reset form inputs for next entry
  resetForm();
});
