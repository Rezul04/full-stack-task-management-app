Restaurant Ordering System
A full-stack restaurant ordering system built with Next.js, React, and Node.js. Features include user authentication, menu management, shopping cart functionality, and order tracking.

🚀 Features
Authentication
JWT-based authentication system
Secure password handling
Protected routes for authenticated users
Persistent login state using localStorage
Menu Management
Display menu items in a responsive grid layout
CRUD operations for menu items:
Create new menu items
Read/display existing menu items
Update menu item details
Delete menu items
Image support for menu items
Category-based organization
Shopping Cart
Real-time cart management
Add/remove items
Adjust quantities
Persistent cart state
Total price calculation
Checkout functionality
Order System
Place orders with multiple items
Order history tracking
Order status updates
Detailed order information
🛠️ Technical Stack
Frontend
Next.js 14 (App Router)
React 18
TypeScript
Tailwind CSS
shadcn/ui components
Lucide React icons
Backend
Node.js
JWT for authentication
RESTful API architecture
📝 API Endpoints
Authentication
POST /api/register - Register a new user
POST /api/login - Login and receive JWT token
Menu Management
GET /api/menu - Fetch all menu items
POST /api/menu - Create a new menu item
PUT /api/menu/:id - Update a menu item
DELETE /api/menu/:id - Delete a menu item
Order Management
POST /api/order - Place a new order
GET /api/orders - Fetch user's order history
🚦 Getting Started
Clone the repository:
git clone https://github.com/yourusername/restaurant-app.git
cd restaurant-app
Install dependencies:
npm install
Install required shadcn/ui components:
npx shadcn@latest add button card dialog input label sheet table textarea
Set up environment variables: Create a .env.local file:
NEXT_PUBLIC_API_URL=http://localhost:3000/api
JWT_SECRET=your-secret-key
Run the development server:
npm run dev

💡 Usage Examples
Adding Menu Items (using Postman)
Login to get JWT token:
POST http://localhost:3000/api/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "password"
}
Create menu item:
POST http://localhost:3000/api/menu
Authorization: Bearer <your-jwt-token>
Content-Type: application/json

{
  "name": "Margherita Pizza",
  "description": "Classic Italian pizza with tomatoes and mozzarella",
  "price": 12.99,
  "category": "Pizza",
  "image": "https://example.com/pizza.jpg"
}
🔒 Authentication Flow
User submits login credentials
Server validates credentials and returns JWT token
Token is stored in localStorage
Token is included in Authorization header for subsequent requests
Protected routes/actions check for valid token
🛒 Cart Management
The cart system provides:

Real-time updates
Persistent state across page refreshes
Quantity adjustments
Item removal
Total price calculation
Checkout process
📊 Order Management
Orders are:

Created when cart checkout is completed
Stored with detailed item information
Accessible in order history
Displayed with status updates
Sortable by date and status
🎨 UI Components
Built with shadcn/ui, featuring:

Responsive design
Dark mode support
Accessible components
Consistent styling
Interactive elements
Loading states
Error handling
🔧 Troubleshooting
Common Issues
Login Issues:

Check browser console for errors
Verify JWT token in localStorage
Confirm API endpoint is correct
Check token expiration
Menu Management:

Verify API permissions
Check image URLs
Confirm data format
Cart Issues:

Clear localStorage if state is corrupted
Check browser console
Verify item data structure
🤝 Contributing
Fork the repository
Create a feature branch
Commit changes
Push to the branch
Open a pull request
