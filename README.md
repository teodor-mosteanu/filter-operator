# Product Filtering Condition Editor UI

## Overview

This project is a solution to the Salsify coding exercise for building a product filtering condition editor. The app allows users to create a single filter by selecting a property, an operator, and a value, and instantly updates the product list based on the filter. The UI is designed for clarity, robustness, and maintainability, using Angular standalone components and PrimeNG for UI elements.

This project was started from a solution I developed previously. Please see git commit history for detailed changes. Further code cleanup could have been done but it was not prioritized due to time constraints. Also some components and mechanisms were left as a demo of what could be done in future iterations. I have left comments where applicable.

Further reading was generated using AI to format and re-organize the content:

## Features & Spec Compliance

- **Single Filter UI:** Users can select a property, operator, and value to filter products.
- **Dynamic Operators:** Only valid operators are shown for each property type, using centralized constants.
- **Dynamic Value Input:** Value input adapts to property type and operator (multi-select for enumerated, comma-separated for numbers).
- **Live Filtering:** Product list updates as the filter changes.
- **Clear Filter:** A clear filter button resets the filter and shows all products.
- **Error Handling:** Validation errors are shown only after submit, and disappear when typing.

## Technical Approach

- **Angular Standalone Components:** Modular, maintainable code structure.
- **PrimeNG UI:** Dropdowns, tables, and buttons for a professional look.
- **Centralized Constants:** Operator IDs and valid operator lists are managed in a shared constants file for maintainability.
- **Reactive Forms & Validators:** Angular form validators (including custom ones)
- **Filtering Logic:** Modular filter matchers and validators for clarity and testability.
- **Error State Management:** Errors are only shown after submit, and are cleared when the user starts typing.

## Development Notes

- **Assumptions:**
  - Only one value per product property.
  - Operator set is static and defined in constants.
  - Product and property data are loaded from a mock datastore.
  - This app was prepared with a future of extensibility in mind. It is also designed to be easily adaptable for new features and requirements.
- **Design Choices:**
  - Used Angular's new template syntax (`@if`, `@switch`) for cleaner templates.
  - Modular design principles were applied throughout the codebase. For example:
    - Operator lists and IDs are centralized in `src/app/core/constants/app.constants.ts` for easy maintenance and reuse.
    - Filtering logic and custom validators are separated into dedicated files (`filter-angular-validators.ts`, filter matcher functions) for clarity and testability.
    - UI components (e.g., filter, table, header, footer) are implemented as standalone Angular components, promoting reusability and separation of concerns.
    - Services (e.g. `logger.service.ts`) encapsulate business logic and data access, keeping components focused on presentation and interaction.
    - Interceptors handle cross-cutting concerns like authentication and logging.
    - Shared styles and mixins are organized in `src/styles/` for consistent theming and easy updates.
- **Testing:**
  - Manual testing was performed for all filter scenarios, error states, and UI flows.

## How to Run

1. Install dependencies: `npm install`
2. Start the app: `npm start`
3. Open in browser at `http://localhost:4200`

## Guided Tour

- Select a property, operator, and value to filter products.
- Only valid operators are shown for each property type.
- For "Is any of" on numbers, enter comma-separated values; for enumerated, use multi-select.
- Click "Apply" to filter; click "Clear Filter" to reset.
- Error messages are shown only after submit, and disappear when typing.

## Further Feature Improvements to be added

- Add automated unit tests for filter logic and validators.
- Enhance UI with more advanced feedback (e.g., loading spinners, tooltips and validation handling).
- Support for additional filter types or multi-filter scenarios.
- Further break into UI Components - e.g., separate components for filter controls, product list, and error messages.
- Add query parameters to the products view route so that the current filter state (property, operator, value) is reflected in the URL. This enables users to share or bookmark filtered views directly.
- Table would support pagination

---

**Author:** Teodor Mosteanu
**Time Spent:** 6 hours
