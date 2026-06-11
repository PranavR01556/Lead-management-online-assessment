# Assessment Submission

## Approach

I started by reviewing the Leads page implementation and identifying the root cause of each reported issue before making changes.

1. **Lead Count Display**

   * Replaced hardcoded lead counts with dynamic values based on the current dataset.
   * Updated the UI to display the actual number of leads being shown.

2. **Status Filter**

   * Connected the status filter state to the displayed data.
   * Implemented filtering logic before pagination to ensure only matching records are displayed.

3. **Search Performance**

   * Identified that an API request was being triggered on every keystroke.
   * Implemented a debounce mechanism to reduce unnecessary network requests and improve responsiveness.

4. **Bulk Status Update**

   * Added row selection functionality.
   * Implemented "Select All" behavior.
   * Connected the bulk action dropdown to selected leads and backend API calls.

5. **Delete Lead**

   * Implemented frontend delete functionality with confirmation.
   * Added backend endpoint integration to remove leads from the database.
   * Updated UI state after successful deletion.

---

## Assumptions

* The backend API supports lead status updates through a bulk update endpoint.
* Lead IDs are unique and can be safely used for selection and deletion operations.
* Pagination should operate on filtered data rather than the complete dataset.
* Users should confirm before permanently deleting a lead.
* The dataset size is moderate enough that client-side filtering and pagination remain acceptable.

---

## Challenges

* Understanding the interaction between filtering, searching, and pagination without introducing inconsistent UI behavior.
* Ensuring that bulk selection works correctly across paginated results.
* Preventing excessive API requests caused by search input updates.
* Maintaining state consistency after delete and bulk update operations.

---

## Improvements

Given more time, I would:

* Add automated unit and integration tests for filtering, pagination, bulk actions, and deletion.
* Implement optimistic UI updates with rollback support.
* Add toast notifications instead of browser alerts.
* Improve accessibility for table controls and action buttons.
* Add server-side pagination and filtering for large datasets.
* Add loading indicators for bulk actions and delete operations.
* Enhance error handling and user feedback throughout the application.

---

## AI Usage

### Tools Used

* ChatGPT

### How AI Was Used

* Assisted in reviewing the existing codebase.
* Helped identify root causes of reported issues.
* Suggested implementation approaches for filtering, debounced search (used as optimal Search), bulk updates, and delete functionality.
* Provided code review support and validation of proposed fixes.

### Suggestions Accepted

* Dynamic lead count implementation.
* Status filtering before pagination.
* Debounced search implementation.
* Bulk selection and bulk status update approach.
* Delete confirmation and API integration pattern.
* Pagination reset when filters/search terms change.

### Suggestions Rejected

* Any suggestions that required major architectural changes outside the scope of the assessment.
* Optional refactoring recommendations that were not necessary to complete the required tasks.
* Alternative implementations that increased complexity without providing significant benefit for the assessment requirements.
