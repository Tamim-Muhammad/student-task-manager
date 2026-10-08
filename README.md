# 📚 Student Task Manager

A clean, modern, and responsive academic dashboard that helps students **organize**, **track**, and **manage** their assignments, projects, and study sessions — all from a single page.

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| **Add Tasks** | Submit a title, optional description, and priority level via a validated form. |
| **Task Priority** | Select between High, Medium (default), and Low priority with color-coded badges. |
| **Task Status & Toggle** | Each task defaults to "Pending" and can be toggled to "Completed" dynamically with one click. |
| **Status Badges** | Distinct color-coded badges (warm amber for Pending, fresh emerald for Completed). |
| **Live Counter** | A badge dynamically reflects the total number of tasks. |
| **Pre-loaded Samples** | Pre-loaded tasks demonstrating High, Medium, and Low priorities along with Pending and Completed states. |
| **Input Validation** | Blank titles are rejected with an alert and a visual error flash. |
| **Responsive Layout** | Two-column grid on desktop; single-column stack on mobile. |
| **Micro-animations** | Smooth slide-in animation for newly created task cards. |

---

## 📁 File Structure

```
student-task-manager/
├── index.html      # Semantic HTML5 dashboard layout
├── style.css       # Slate + Indigo design system (fully responsive)
├── script.js       # Form handling, validation, and DOM manipulation
├── README.md       # Project documentation (this file)
└── .gitignore      # Standard exclusions for editors, OS, and builds
```

---

## 🚀 Usage

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/student-task-manager.git
   cd student-task-manager
   ```

2. **Open in a browser**
   Simply open `index.html` in any modern web browser — no build tools or server required.

   ```bash
   # macOS
   open index.html

   # Windows
   start index.html

   # Linux
   xdg-open index.html
   ```

3. **Add a task**
   - Fill in the **Task Title** (required) and an optional **Description**.
   - Click **Add Task** — the new card appears at the top of the list and the counter updates automatically.

### Using a Local Dev Server (Optional)

If you prefer live-reload during development, use any static file server:

```bash
# Using Node.js
npx serve .

# Using Python
python -m http.server 3000
```

---

## 🛠 Tech Stack

- **HTML5** — Semantic, accessible markup
- **CSS3** — Custom Properties, Flexbox, Grid, animations
- **Vanilla JavaScript** — Zero dependencies, ES6+

---

## 🔮 Future DevOps & Enhancement Plans

- [ ] **CI/CD Pipeline** — GitHub Actions workflow for linting (ESLint, Stylelint) and automated testing.
- [ ] **Containerization** — Dockerfile and docker-compose for consistent local development.
- [ ] **Task Persistence** — Save tasks to `localStorage` or a backend API so data survives page reloads.
- [ ] **Delete & Edit Tasks** — Allow users to modify or remove existing tasks.
- [ ] **Due Dates & Priority** — Add date-pickers and priority labels (High / Medium / Low).
- [ ] **Dark Mode** — Toggle between light and dark themes using CSS custom properties.
- [ ] **Unit Tests** — Jest-based test suite for the JavaScript logic.
- [ ] **Accessibility Audit** — Full WCAG 2.1 AA compliance review.
- [ ] **Production Build** — Minification and bundling with Vite or Webpack.

---

## 📄 License

This project is open-source and available under the [MIT License](https://opensource.org/licenses/MIT).
