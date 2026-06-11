# Approach

I first explored the existing codebase to understand the frontend and backend structure. I solved each task incrementally and tested every change before moving to the next task.

* Fixed lead count updates based on visible results.
* Implemented status filtering and combined it with search.
* Added debouncing to reduce unnecessary API calls during typing.
* Implemented bulk status updates using the provided API.
* Completed delete functionality on both backend and frontend.

# Assumptions

* Existing API endpoints and database schema should remain unchanged.
* Bulk status API was already implemented on the backend.
* Existing create, edit and view functionality should continue to work.

# Challenges

* Understanding the existing project structure.
* Debugging the bulk status update request and handling validation errors.
* Ensuring all features continued to work after modifications.

# Improvements

With more time, I would:

* Add toast notifications instead of browser alerts.
* Improve pagination UX.
* Add unit tests for API calls and components.
* Add loading indicators for bulk actions and delete operations.

# AI Usage

AI Tool Used: ChatGPT

How it was used:

* Understanding unfamiliar parts of the codebase.
* Debugging issues.
* Reviewing implementation approaches.

Suggestions accepted:

* Search debouncing implementation.
* Status filtering logic.
* Bulk action handling.
* Delete functionality implementation.

Suggestions rejected:

* None. All accepted suggestions were manually reviewed and adapted before use.
