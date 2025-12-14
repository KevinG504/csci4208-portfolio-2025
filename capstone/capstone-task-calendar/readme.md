# Task Calendar App

**Repo:** https://github.com/KevinG504/capstone-taskCalendar

**How to Demo:** Open the live URL above. Create a task with title and priority. Click filters to view by status. Mark tasks complete. Delete tasks.

**Summary:** A lightweight full-stack task management application with priority levels and due dates, featuring REST API, session management, and file-based persistence.

---

## Features

* Create tasks with title, description, due date, and priority (low/medium/high)
* View all tasks sorted by due date (earliest first)
* Filter tasks by status (All, Active, Completed) or priority (High)
* Mark tasks as complete/incomplete with one click
* Delete tasks permanently
* Data persists across server restarts (file-based database)
* Loading indicators and error messages for all operations
* Session tracking via cookies

---

## Install & Run

```bash
cd task-calendar-app
npm install
npm start
```

---

## How It Works

* **Rendering Stack:** Vanilla JS DOM for simplicity and direct control
* **Architecture Overview:**
  * `server.js` → Express server entry point, serves static files and API
  * `src/api/tasks.js` → REST API routes for CRUD operations
  * `src/services/taskService.js` → business logic, validation, filtering, sorting
  * `src/db/database.js` → file-backed database with atomic writes and in-memory cache
  * `src/middleware/` → session management and error handling
  * `public/app.js` → thin client that makes fetch calls and renders UI

* **Thick-Server, Thin-Client:** All business logic lives on the server. Client only handles UI rendering and API calls.

* **File-Based Persistence:** Tasks stored in `data/tasks.json`. Uses atomic writes to prevent corruption.

---

## Data & Networking (High-Level)

* **REST API:** Full CRUD endpoints at `/api/tasks`
  * GET `/api/tasks` - Retrieve all tasks with optional filters
  * POST `/api/tasks` - Create new task
  * PUT `/api/tasks/:id` - Update existing task
  * PATCH `/api/tasks/:id/toggle` - Toggle completion status
  * DELETE `/api/tasks/:id` - Delete task

* **Session Management:** Cookie-based sessions track users across requests

* **Database Storage:** JSON file format with atomic writes and in-memory caching

---

## Configuration

N/A — no configurable options currently. Port defaults to 3000.

---

## License / Credits

* Express.js (web framework)
* Node.js fs module (file system operations)

---

## Developer Docs (Links)

All documentation is included in the `docs/` folder:

* `docs/pitch.md` → Project pitch and core data entities
* `docs/roadmap.md` → Roadmap with MVP vs full features
* `docs/architecture_sketch.md` → Architecture and module overview
* `docs/api_endpoints.md` → Complete API reference with examples
* `docs/dod-sprint1.md` → Definition of Done for Sprint 1
* `docs/dod-sprint2.md` → Definition of Done for Sprint 2
* `docs/dod-sprint3.md` → Definition of Done for Sprint 3