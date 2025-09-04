# Product Filtering Condition Editor UI

## Overview

This project is a solution to the Salsify coding exercise for building a product filtering condition editor. The app allows users to create a single filter by selecting a property, an operator, and a value, and instantly updates the product list based on the filter.

This project was started from a solution I developed previously and augmented with GitHub Actions workflows that I had developed for my masters studies module on DevOps. Please see git commit history for detailed changes. Further code cleanup could have been done but it was not prioritized due to time constraints. Also some components and mechanisms were left as a demo of what could be done in future iterations. I have left comments where applicable.

All architecture decisions were made by me and AI (ChatGPT-4.1) was used to help with code formatting, re-organizing and generating documentation.

I have chosen a slightly different folder organisation that the standard Angular one since I find it more modular and easier to navigate. For example, all features (by feature I mean any business specs that add functionality to the app) are grouped under `src/app/features/` and core (by core I understand anything that the app cannot run without) /shared (shared components that can be used under multiple features) resources under `src/app/core/` and `src/app/shared/`. This structure is scalable and keeps related files together. I have discovered that this is a common approach in larger Angular applications and helps developers navigate well the codebase and juniors can pick it up quickly.

The main challenge I faced was getting the correct specs for filtering based on the operators and property types. Especially for the "Is any of" operator which has different input types based on the property type and the validation rules. Most of the hard work went in the filter-matchers and filter-validators files.

Further reading was generated using AI to format and re-organize the content:

## Features & Spec Compliance

- **Single Filter UI:** Users can select a property, operator, and value to filter products.
- **Dynamic Operators:** Only valid operators are shown for each property type, using centralized constants.
- **Dynamic Value Input:** Value input adapts to property type and operator (multi-select for enumerated, comma-separated for numbers since we get the values from our BE service).
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
- **Unit tests** Unit tests for Product View, filter-matchers and filter-validators were implemented only due to time constraints (manual testing for UI flows). This files were chosen as they hold the main business logic.
- **Interceptors:** For logging and potential authentication handling.
- **Mobile and tablet friendly:** The UI is responsive and works well on different screen sizes.

## Development Notes

- **Assumptions:**
  - Only one value per product property.
  - Operator set is static and defined in constants.
  - Product and property data are loaded from a mock datastore.
  - This app was prepared with a future of extensibility in mind. It is also designed to be easily adaptable for new features and requirements.
  - Values will come from the BE as string/numbers even if they are boolean
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
- **Workflows:** GitHub Actions workflows are set up for CI/CD and automated testing. See `.github/workflows/` for details.

## How to Run

1. Install dependencies: `npm install`
2. Start the app: `npm start`
3. Open in browser at `http://localhost:4200`
4. The app is deployed on GitHub pages at: https://teodor-mosteanu.github.io/filter-operator/**

## Guided Tour

- Data is loaded from a service and a mockstore and I have added a 4 sec delay for the products and a 2 sec delay for the properties to simulate real-world loading scenarios.
- Select a property, operator, and value to filter products.
- Only valid operators are shown for each property type.
- For "Is any of" on numbers, enter comma-separated values; for enumerated, use multi-select.
- Click "Apply" to filter; click "Clear Filter" to reset.
- Error messages are shown only after submit, and disappear when typing.

## Further Feature Improvements to be added

- Enhance UI with more advanced feedback (e.g., loading spinners, tooltips and validation handling).
- Support for additional filter types or multi-filter scenarios.
- Further break into UI Components - e.g., separate components for filter controls, product list, and error messages.
- Add query parameters to the products view route so that the current filter state (property, operator, value) is reflected in the URL. This enables users to share or bookmark filtered views directly.
- Table would support pagination
- Further type safety features such as using TypeScript interfaces and enums more extensively. For propValue in the filters - see TODO comment in filter-matchers.ts
- More comprehensive unit and integration tests, especially for UI components and user interactions.

---

**Author:** Teodor Mosteanu
**Time Spent:** 7 hours
