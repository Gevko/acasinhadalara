# gaeiras-house-spa

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.0.0.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

Complete Rationale for Correct FSD Structure
Core Principles of Feature-Sliced Design
Feature-Sliced Design (FSD) is an architectural methodology that organizes code according to three fundamental principles:

Prioritizing Business Logic: The structure reflects business domains rather than technical concerns
Isolation by Responsibility: Components are isolated based on their purpose and responsibility
Unidirectional Dependencies: Dependencies flow in one direction only, from higher to lower layers
The Layer Hierarchy: Complete Rationale
1. Shared Layer
Purpose: Contains code that has no business logic and is used throughout the application.

Rationale:

Foundational: Provides the building blocks for the entire application
No Business Knowledge: Contains only technical utilities and generic components
Maximum Reusability: Used by all other layers
Stability: Changes rarely and carefully to avoid widespread impact
Contains:

Generic UI components (buttons, inputs, modals)
Utility functions (date formatting, validation helpers)
API clients and interceptors
Types and interfaces used throughout the app
Example: A button component that can be used anywhere in the application.

2. Entities Layer
Purpose: Represents business entities and their direct representations.

Rationale:

Business Domain Objects: Represents the core nouns of your business domain
Single Responsibility: Each entity is responsible for one business concept
Reusable Across Features: Can be used by multiple features
Independent of User Scenarios: Exists regardless of how users interact with it
Contains:

Entity models and types
Entity-specific API services
UI components that directly represent entity attributes
Example: A Review entity with its model, API service, and a star-rating component that visualizes its rating attribute.

3. Features Layer
Purpose: Implements user scenarios and business processes.

Rationale:

User-Centric: Organized around what users can do with the application
Business Logic: Contains the core business logic of your application
Composable: Can be composed together to create complex workflows
Independent: Features should not depend on other features
Contains:

Feature-specific UI components
Feature-specific business logic
Feature-specific API services
Example: A review-submission feature that allows users to submit reviews, including the form and submission logic.

4. Widgets Layer
Purpose: Combines entities and features into reusable composite components.

Rationale:

Composition: Assembles lower-level components into meaningful units
Reusability: Can be reused across different pages
UI Integration: Integrates UI from different domains
Presentational Logic: Contains logic for how components work together
Contains:

Composite UI components that use multiple entities/features
Layout components that organize content
Complex interactive components
Example: A reviews-list widget that displays a list of reviews with filtering and sorting capabilities.

5. Pages Layer
Purpose: Represents application routes and screens.

Rationale:

Route-Specific: Each page corresponds to a route in your application
Composition Point: Assembles widgets, features, and entities into complete screens
Minimal Logic: Contains minimal business logic, focusing on composition
User Flow: Represents the entry points and main screens of your application
Contains:

Route components
Page-specific layouts
Page-specific state management
Example: A reviews page that combines the reviews-list widget and review-submission feature.

Segments Within Each Slice: Complete Rationale
Each slice (within a layer) should have a consistent internal structure:

1. API Segment
Purpose: Handles communication with external services.

Rationale:

Isolation: Separates API concerns from business logic
Reusability: Can be reused by different parts of the slice
Testability: Easy to mock for testing
Adaptability: Can be changed without affecting business logic
Contains:

API clients
Request/response handlers
Data transformation for API

2. Model Segment
Purpose: Contains business logic and data models.

Rationale:

Business Rules: Encapsulates business rules and logic
Data Structure: Defines the shape of data
State Management: Manages state related to the slice
Pure Logic: Contains pure business logic independent of UI
Contains:

Data models and types
Business logic
Constants and enums
State management
(Create class's as "class-name.model.ts" and handle BL there)

3. UI Segment
Purpose: Contains UI components specific to the slice.

Rationale:

Presentation: Handles how data is presented to users
Interaction: Manages user interactions
Reusability: Components can be reused within the slice
Isolation: UI concerns are separated from business logic
Contains:

Components
Styles
UI-specific logic

4. Lib Segment
Purpose: Contains utilities specific to the slice.

Rationale:

Helper Functions: Provides helper functions for the slice
Reusability: Can be reused within the slice
Specificity: Contains utilities that are specific to the slice
Isolation: Keeps utilities close to where they're used
Contains:

Helper functions
Utilities
Formatters
File Organization: Complete Rationale
1. Group by Feature/Entity, Not by File Type
Rationale:

Cohesion: Related files stay together
Discoverability: Easier to find all files related to a component
Maintenance: Changes to a component affect files in the same directory
Scalability: New components don't require changes to multiple directories

2. Consistent Naming Conventions
Rationale:

Clarity: Clear indication of what each file contains
Predictability: Developers know what to expect
Searchability: Easy to find files
Consistency: Reduces cognitive load
3. Component Files Together
Rationale:

Atomicity: A component is a single unit with multiple aspects
Locality: Changes to a component are localized
Completeness: All aspects of a component are visible together
Encapsulation: Components are self-contained
Dependency Rules: Complete Rationale

1. Unidirectional Dependencies
Rationale:

Predictability: Changes in lower layers don't affect higher layers
Stability: Lower layers are more stable than higher layers
Testability: Components can be tested in isolation
Maintainability: Prevents circular dependencies

2. Specific Import Rules
Rationale:

Pages can import from any layer because they compose everything
Widgets can't import from pages to avoid circular dependencies
Features can't import from widgets or pages to maintain independence
Entities can't import from features, widgets, or pages to ensure they remain pure business objects
Shared can't import from any other layer to ensure it remains generic
Benefits of This Structure
Scalability: The application can grow without becoming unwieldy
Maintainability: Code is organized in a way that makes it easy to understand and change
Reusability: Components are designed to be reused
Testability: Components can be tested in isolation
Team Collaboration: Different teams can work on different slices with minimal conflicts
Onboarding: New developers can quickly understand the codebase
Business Alignment: The structure reflects the business domain
Real-World Example
In your vacation rental website:

Shared: Button component, date formatter
Entities: Review model, House model, star-rating component
Features: Review submission form, gallery browser
Widgets: Reviews list, header, footer
Pages: Home page, reviews page, gallery page
This structure ensures that:

Your business entities are clearly defined
User scenarios are isolated and reusable
UI components are organized by their purpose
Dependencies flow in the correct direction
By following this structure, you create a codebase that is not only organized but also aligned with your business domain and user scenarios, making it easier to maintain and extend over time.
