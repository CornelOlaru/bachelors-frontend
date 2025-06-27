# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# bachelors-frontend
This is the front-end of my bachelor's project

The application is an online restaurant ordering system designed for a seamless customer experience. The main workflow allows clients to scan a static QR code at their table, browse the digital menu, place orders, and check out, all from their mobile device—without the need for waiter interaction.

## Main features

- **QR code session:** Each table has a unique QR code which starts a guest session when scanned.
- **Mobile-first menu UI:** Responsive, easy-to-scan product list with categories, product details, and search/filter options.
- **Shopping cart:** Users can add items to their order, adjust quantities, and view the running total in a sticky cart at the bottom of the screen.
- **Checkout flow:** Placing an order is simple and requires only minimal information for anonymous guests.
- **Session management:** Sessions are tied to a sessionId;

- **Authentication:** Users can optionally register/login to track their order history and enjoy additional features.

- **Order history:** After checkout, users can see a summary of their current and previous orders for the session.

- **Order status:** Visual feedback and confirmations for actions like placing an order, empty cart, or session expiration.

## Tech stack

- **React** (with Vite) — SPA, hooks-based logic, and modern code structure.
- **Bootstrap** — Used for certain UI components and forms for a clean, familiar look.
- **Custom CSS/Flexbox** — For highly optimized mobile layouts (menu list, cart, order views).
- **REST API** — Communication with the backend for menu, orders, authentication, and session logic.

## UX principles

- All main actions (viewing menu, adding to cart, placing order) are optimized for one-handed use and fast scanning on mobile.
- Product focus: clear product name, price, description, and quantity controls—images are present but not dominant.
- The order cart is always visible and easily accessible.
- Search and filter for menu items with minimal distractions.
- Minimal page reloads; most interactions use smooth, client-side transitions.

## Development

- React functional components and hooks for clean logic separation.
- All API calls are handled in a single fetch utility for maintainability and error handling.
- Session and token logic is encapsulated and easy to adapt for further features (user login, guest, etc).
- The codebase is structured for easy extension and clear separation of UI, logic, and data-fetching.

---

If you have any questions, suggestions, or need help getting started, feel free to open an issue or contact the project author.