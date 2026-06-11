
# Approach

I started by understanding the existing React, TypeScript, PHP, and SQLite codebase and identifying the root cause of each issue before making changes.

### Task 1 - Lead Count Fix

Updated the lead count badge and table footer so they always reflect the number of leads currently displayed after search and filtering.

### Task 2 - Status Filter Fix

Connected the status dropdown with the API request and ensured status filtering works correctly both independently and together with search.

### Task 3 - Search Performance Fix

Implemented debounced search using React hooks to reduce unnecessary API requests while maintaining a responsive user experience.

### Task 4 - Bulk Status Update

Implemented:

* Row selection
* Select all functionality for the current page
* Bulk status update API integration
* Automatic refresh after successful update
* Selection reset after update

### Task 5 - Delete Lead

Implemented lead deletion end-to-end:

* Added backend database deletion logic
* Added delete controller handling
* Added frontend confirmation dialog
* Refreshed the lead list after successful deletion

# Assumptions

* Bulk actions apply only to selected leads.
* Select All affects only the currently visible page.
* Browser confirmation dialogs are acceptable for this assessment.
* Existing database schema and seed data should remain unchanged.

# Challenges

* Understanding the existing project structure and API flow.
* Implementing search debouncing without breaking existing functionality.
* Managing checkbox selection state across table operations.
* Integrating frontend actions with backend endpoints.

# Improvements

If given additional time, I would:

* Replace browser alerts and confirmations with reusable modal components.
* Add toast notifications for success and error feedback.
* Implement server-side pagination for large datasets.
* Add loading indicators for bulk operations.
* Add automated unit and integration tests.
* Improve accessibility and keyboard navigation.

# AI Usage

I used ChatGPT as a learning and debugging assistant.

**Accepted:**

* Understanding existing code structure.
* React state management guidance.
* Debounce implementation guidance.
* Bulk status update implementation guidance.
* PHP delete API implementation guidance.

**Rejected:**

* UI enhancements that were outside the assessment scope.
* Additional features not required by the task description.

All final code was reviewed, understood, tested, and manually integrated into the project before submission.
