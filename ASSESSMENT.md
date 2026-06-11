# Approach

* Fixed lead count so it reflects the currently displayed leads.
* Connected status filter to API requests and ensured it works together with search.
* Added debounced search to reduce unnecessary API calls.
* Implemented bulk status update functionality with row selection, select-all, API integration, and refresh after update.
* Implemented lead deletion in both backend and frontend with confirmation and automatic refresh.

# Assumptions

* Bulk actions should only apply to selected leads on the current page.
* Existing API routes and database schema should remain unchanged.
* The backend delete endpoint should return HTTP 204 on successful deletion.

# Challenges

* Ensuring search and status filters worked together correctly.
* Preventing excessive API calls while typing.
* Managing checkbox selection state for bulk updates.

# Improvements

* Add toast notifications instead of browser alerts.
* Add loading indicators for bulk updates and deletes.
* Add pagination support from the backend instead of client-side pagination.
* Add automated frontend and backend tests.

# AI Usage

Tools Used:

* ChatGPT

How It Was Used:

* Reviewed existing code structure.
* Helped identify where filtering, debounce logic, bulk actions, and delete functionality should be implemented.
* Assisted in debugging and verifying API integration.

Accepted Suggestions:

* Debounced search implementation.
* Bulk status update workflow.
* Delete confirmation and refresh logic.

Rejected Suggestions:

* Any suggestions requiring database schema changes.
* Any suggestions outside the assessment requirements.
