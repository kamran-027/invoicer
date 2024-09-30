# Invoicing App

This project is a React-based invoicing application built as part of the Frontend Developer assignment for Seed. It allows users to create and manage invoices, including features like adding line items, notes, and viewing invoice statuses.

## Features

- **Create New Invoice**: Easily create a new invoice for any work or project.
- **Add Line Items**: Add various line items to an invoice, such as:
  - Hours of work at a certain rate
  - Work-related expenses (materials, labor, etc.)
- **Invoice Notes**: Include additional notes, such as payment methods or check mailing instructions.
- **View Invoices**: View a list of invoices with their respective statuses (Paid, Outstanding, Late).
- **Send Invoices**: Functionality to simulate sending invoices via email (email sending not fully implemented).

### Extra Credit Features

- **Due Date for Invoices**: Option to add a due date to invoices.
- **Late Invoice Alerts**: Identify and flag invoices that are overdue.
- **Highly Reusable Components**: The app architecture emphasizes component reusability across various parts of the UI.
- **Polished UX**: Smooth and intuitive user experience.
- **Tests**: Test coverage to ensure stability and reliability of the app.

## Tech Stack

- **React**: For building the user interface.
- **Redux**: To manage state across the application.
- **Webpack**: For bundling and running the development server.
- **Babel**: For transpiling ES6/7 syntax.

## Installation and Setup

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd invoicing-app
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Run Server**:
   ```bash
   npm run dev
   ```

## Conclusion

This invoicing app demonstrates core front-end development skills using modern web technologies such as React and Redux. It highlights component reusability, efficient state management, and a polished user experience.
