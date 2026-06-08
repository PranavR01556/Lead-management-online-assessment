# Assessment Guide

Welcome! This is your task sheet for the CRM Lead Management technical assessment.

Read this carefully before you start. You have the full codebase available to you — explore it, understand how it works, then complete the tasks below.

---

## Submission Workflow

Before starting:
1. **Create a new branch** from the `main` branch (e.g., `git checkout -b assessment-yourname`).
2. **Implement your changes** on your new branch.
3. **Create a file named `ASSESSMENT.md`** in the root of the project. Include the following sections:
   - `# Approach`: Describe your approach.
   - `# Assumptions`: List any assumptions made.
   - `# Challenges`: Describe any challenges encountered.
   - `# Improvements`: What would you improve with more time?
   - `# AI Usage`: 
     - Did you use Antigravity, ChatGPT, Claude, Cursor, Copilot, or other AI tools?
     - How were they used?
     - What suggestions were accepted or rejected?
4. **Raise a pull request (PR)** to merge your branch back into the `main` branch when you are ready for review. Make sure to describe the details of the changes you have made in the PR description.

---

## What You're Working With

This is a simple CRM application where you can view, create, and edit sales leads.

- The **backend** is a PHP REST API running in Docker.
- The **frontend** is a React + TypeScript app built with Vite.
- The **database** is SQLite and comes pre-loaded with 50 sample leads.

Refer to the `README.md` for setup instructions if you haven't started the app yet.

---

## Your Tasks

### Task 1 — Fix the Lead Count (Easy)

**What's wrong:** Open the Leads page. You'll notice a number badge next to the "Leads" heading at the top, and a line at the bottom of the table that says how many leads are being shown. Try typing a name in the search box — the list of results changes, but the numbers don't update.

**What you need to do:** Make the count badge and the footer text always reflect the actual number of leads currently visible on screen.

---

### Task 2 — Fix the Status Filter (Medium)

**What's wrong:** There's a status dropdown next to the search box (New, Contacted, Qualified, Lost). When you select a status, nothing happens — the table does not filter.

**What you need to do:** Make the status dropdown actually filter the results. When "Qualified" is selected, only Qualified leads should appear. When combined with a search term, both filters should work together.

---

### Task 3 — Fix the Search Performance (Hard)

**What's wrong:** Open your browser's DevTools (F12 → Network tab). Start typing in the search box and watch the network requests — you'll notice the API is being called far too many times, even for a single word being typed.

**What you need to do:** The search should only send a request when the user has paused typing, not on every single key press. Implement a proper solution to prevent these unnecessary requests.

> **Hint:** Look at how the `fetchLeads` function is defined and when `useEffect` re-runs.

---

### Task 4 — Implement Bulk Status Update (Feature)

**What's already done for you:**
- Each table row has a checkbox
- There is a "Select All" checkbox in the table header
- There is a "Bulk Actions" dropdown in the toolbar
- The backend API endpoint `POST /api/leads/bulk-status` is ready and working
- The `bulkStatusUpdate` function already exists in `src/services/leadsApi.ts`

**What's missing — and what you need to build:**
1. Clicking a row checkbox should add/remove that lead from a selected list
2. Clicking "Select All" should select or deselect all leads on the current page
3. When you pick a status from the "Bulk Actions" dropdown, it should call the API and update all selected leads at once
4. After the update, clear the selection and refresh the lead list

---

### Task 5 — Delete a Lead (Backend + Frontend)

This task involves both the backend and the frontend.

**What you'll see:** There is already a trash (delete) icon button visible in the actions column of every row. Clicking it currently shows a "not implemented" message.

**What you need to do:**
1. On the **backend**, complete the logic that actually removes a lead from the database when a delete request is received. The route and handler are already set up — you just need to write the code that performs the deletion and sends the right response.
2. On the **frontend**, update the delete button so that it asks the user to confirm before deleting, sends the delete request to the backend, and then refreshes the list once done.

**How to know it's working:**
- Clicking the trash button shows a confirmation prompt
- Confirming removes the lead from the list immediately
- The deleted lead does not come back when you refresh the page

---

## Rules

- For Tasks 1–4, you may only change files inside the `frontend/` folder
- For Task 5, you will also need to make changes inside the backend files (under the `backend/` folder) to complete the model and controller logic
- Do not modify the database schema or seeding logic
- Add brief comments to explain the changes you made
- Make sure all features still work after your changes (create, view, edit, search)

---

## What We're Looking For

| Task | Points |
|---|---|
| Lead count updates correctly | 10 |
| Status filter works correctly | 15 |
| Search no longer causes unnecessary API calls | 20 |
| Bulk status update fully works | 15 |
| Delete lead — backend + frontend complete | 20 |
| Code quality and clarity of changes | 20 |
| **Total** | **100** |

---

Good luck!
