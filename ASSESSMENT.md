# CRM Lead Management Assessment

## Candidate
Gnaneshwar Dammu

## Approach

### Task 1 - Fix Lead Count Display
- Replaced hardcoded lead count with dynamic `leads.length`.
- Updated the footer to display the correct total after filtering.

### Task 2 - Fix Status Filter
- Passed the selected status to the API.
- Updated the dependencies so changing the filter refreshes the lead list.

### Task 3 - Fix Search Performance
- Implemented debounced search to reduce unnecessary API calls while typing.

### Task 4 - Bulk Status Update
- Implemented row selection.
- Added Select All functionality.
- Connected bulk status update to the backend.
- Refreshed the list and cleared selections after updating.

### Task 5 - Delete Lead
- Implemented backend delete functionality.
- Added frontend delete action with confirmation.
- Refreshed the list after successful deletion.

## Challenges

- Understanding the existing codebase before making changes.
- Debugging frontend state management for filtering and bulk actions.
- Docker/WSL setup issues on Windows delayed backend testing.

## Assumptions

- Backend already supported status filtering.
- No database schema changes required.

## Potential Improvements

- Add unit and integration tests.
- Improve error handling with user-friendly notifications.
- Add loading indicators during API requests.
- Implement server-side pagination for better scalability.
- Improve accessibility and keyboard navigation.
- Replace browser alerts with toast notifications.

## AI Usage
I used ChatGPT as a learning and development assistant to:
- Understand the existing project structure.
- Discuss implementation approaches.
- Review and explain React and PHP code.
- Validate the implemented solutions.
