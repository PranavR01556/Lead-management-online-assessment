# CRM Lead Management Assessment Report

## Approach

### Task 1 — Fix the Lead Count (Easy)
- Modified `LeadsPage.tsx` to display `{leads.length}` instead of the hardcoded `50` in both the lead count badge next to the title and the table footer. This ensures that the counts dynamically match the number of fetched leads corresponding to the selected search and status filters.

### Task 2 — Fix the Status Filter (Medium)
- Integrated the `statusFilter` state into the `leadsApi.getLeads()` call inside `fetchLeads`. Added `statusFilter` to the callback dependency array so that changing the dropdown selection triggers a reload of the lead list.
- Implemented a reset effect to set `currentPage` to `1` and clear the selections (`selectedIds`) whenever the filters (`searchTerm` or `statusFilter`) change.

### Task 3 — Fix the Search Performance (Hard)
- Implemented a search debouncing pattern inside `LeadsPage.tsx`.
- Introduced a `searchInput` state to capture immediate user typing in the text field.
- Used a `useEffect` with a 300ms timeout to update `searchTerm` (the debounced state) only after the user stops typing.
- The `fetchLeads` function relies on `searchTerm`, which limits API calls during rapid keystrokes.

### Task 4 — Implement Bulk Status Update (Feature)
- Handled selection states by binding row checkboxes to check if `selectedIds` includes the lead's ID and updating `selectedIds` on change.
- Defined `allSelectedOnPage` using `paginated.every(...)` to check if all leads on the current page are selected.
- Wired the "Select All" checkbox in the table header to select or deselect all items in the current page's `paginated` list.
- Connected the "Bulk Actions" dropdown to call `leadsApi.bulkStatusUpdate()` and cleared the selection and refetched leads upon success.

### Task 5 — Delete a Lead (Backend + Frontend)
- **Backend:**
  - Implemented `deleteById($id)` in the `Lead` model to execute a `DELETE` query and return whether any rows were affected.
  - Implemented the `delete($id)` method in `LeadController` to check for lead existence, call the deletion logic, and return an HTTP `204 No Content` response on success.
- **Frontend:**
  - Wired the delete button inside `LeadsPage.tsx` to prompt the user using `window.confirm`.
  - Upon confirmation, calls `leadsApi.deleteLead(id)`, removes the ID from the selection state if it was selected, and triggers a table refresh.

---

## Assumptions
- The backend SQLite database works under normal read/write operations without locking issues.
- The API returned formats match the TypeScript interfaces defined in the application.
- Deselecting or selecting all applies to the current paginated page only, as specified.

---

## Challenges
- Coordinating the `currentPage` reset: resetting page number to 1 is critical on filter changes to prevent showing empty lists if the user is on a higher page number when filters are applied.

---

## Improvements
- **Optimistic UI Updates:** Show status changes immediately on the UI before the API call finishes.
- **Toast Notifications:** Replace browser alert dialogue boxes with polished toast/banner notifications.
- **Pagination enhancements:** Support changing the page size limit dynamically.


## AI Usage
- **Did you use Antigravity, ChatGPT, Claude, Cursor, Copilot, or other AI tools?**
  - Yes, I used Antigravity (Google DeepMind's agentic coding assistant).
- **How were they used?**
  - Used for implementing, refactoring, and verifying all five frontend and backend tasks, as well as compiling the technical assessment details.
- **What suggestions were accepted or rejected?**
  - Accepted suggestions: debounced search hook logic, dynamic lead calculations in the header/footer, and PHP database deletion controller-model routing structure. No suggestions were rejected.
