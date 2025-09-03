# AI Assistance & Engineering Guidelines

This file provides instructions and standards for engineers and AI assistants working on the `filter-operator` repository. Follow these rules to ensure consistency, maintainability, and high-quality code when developing new features or updating existing ones.

## Architectural Principles

- **Modular Design:** Separate business logic, UI components, and configuration (constants) for maintainability.
- **Centralized Constants:** Manage operator IDs, operator lists, and configuration in shared constants files.
- **Type Safety:** Use TypeScript interfaces, enums, and literal unions for reliable, self-documenting code.
- **Reactive Forms:** Use Angular reactive forms and custom validators for robust input handling and error feedback.
- **Event-Driven UI:** Components should communicate via events, not direct references, to keep logic decoupled.

## Coding Standards

- **Document Key Methods:** Add concise comments to core methods (filtering, validation, event handling, data loading).
- **Angular Best Practices:** Prefer new template syntax (`@if`, `@switch`) and standalone components.
- **Error Handling:** Centralize error handling and user feedback. Use services for logging and error state management.
- **Testing:** Prioritize unit tests for validators, filter logic, and core components. Use integration tests for UI flows.
- **Accessibility:** Ensure UI components are accessible (ARIA, keyboard navigation).

## Quick Wins for Future Improvements

- Add query parameters to the products view route so filter state can be shared and restored via URL.
- Further break down UI into smaller, focused components (filter controls, product list, error messages).
- Use Angular pipes for display logic and simple transformations in templates.
- Strictly type property types to reduce casting and improve reliability.
- Memoize expensive computations if datasets grow.

## Workflow Guidelines

1. **Sync with GitHub:** Always pull the latest changes before starting. Push changes to `main` or a feature branch.
2. **Update Imports:** If moving constants or logic, update all relevant imports for consistency.
3. **Document Changes:** Add comments and update this instructions file if architectural decisions change.
4. **Testing:** Run and update tests after any change to core logic or validators.
5. **Ask for Clarification:** If requirements are unclear, check the README and this file for context before proceeding.

## Collaboration

- All engineers and AI assistants should follow these guidelines to ensure a consistent codebase and development experience.
- Update this file as the project evolves and new best practices are established.

## Contact

- For questions, contact the repo owner: Teodor Mosteanu

---

_This file is the standard for engineering and AI work in this repository. All contributions should adhere to these principles._
