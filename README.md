# E-commerce Shopping Bot

The E-commerce Shopping Bot is a sophisticated, AI-powered conversational commerce platform that revolutionizes the online shopping experience. This intelligent assistant bridges the gap between natural human communication and database queries, allowing users to find products using everyday language instead of navigating complex category filters and search interfaces.

## 🚀 Features

### Frontend (Next.js + React)
- **Modern Chat Interface**: Real-time chat experience with typing indicators
- **Product Cards**: Rich product display with images, ratings, and pricing
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Chat Persistence**: Conversation history saved in localStorage
- **Quick Suggestions**: Pre-defined queries for common searches
- **Product Interactions**: Wishlist, cart actions, and detailed views

### Backend (Flask + SQLite)
- **AI-Powered Search**: Natural language to SQL conversion using Groq LLM
- **RESTful API**: Clean endpoints for chat processing
- **Product Database**: SQLite database with comprehensive product information
- **CORS Support**: Cross-origin requests enabled for frontend integration

### AI Integration
- **Groq LLM**: Llama3-8b model for natural language processing
- **Smart Query Conversion**: Converts user questions to SQL queries
- **Context-Aware**: Understands product categories, pricing, and availability

## 🛠️ Technology Stack

### Frontend
- **Next.js 15.3.3** - React framework with App Router
- **React 19** - UI library with hooks
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Utility-first CSS framework
- **Lucide React** - Icon library
- **Turbopack** - Fast bundler for development

### Backend
- **Flask** - Python web framework
- **SQLAlchemy** - SQL toolkit and ORM
- **SQLite** - Lightweight database
- **Groq** - AI inference API
- **Flask-CORS** - Cross-origin resource sharing

## 📋 Prerequisites

- **Node.js** (v18 or higher)
- **Python** (v3.8 or higher)
- **npm** or **yarn**
- **pip** (Python package manager)
- **Groq API Key** (for AI functionality)

## 🔧 Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd ecommerce-bot
```

### 2. Frontend Setup
```bash
# Install frontend dependencies
npm install

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:3000`

### 3. Backend Setup
```bash
# Navigate to backend directory
cd product-server

# Install Python dependencies
pip install flask flask-sqlalchemy flask-cors groq

# Set up Groq API key
# Replace the API key in groq_utils.py with your own key
```

### 4. Database Initialization
```bash
# Initialize the database with mock data
python init_db.py
```

### 5. Start Backend Server
```bash
# Run the Flask server
python app.py
```

The backend API will be available at `http://localhost:5000`

## 🗄️ Database Schema

### Product Table
```sql
CREATE TABLE product (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    price FLOAT NOT NULL,
    original_price FLOAT,
    image TEXT,
    category TEXT,
    description TEXT,
    rating FLOAT,
    reviews INTEGER,
    in_stock BOOLEAN,
    tags TEXT  -- JSON array stored as text
);
```

### Sample Data
The database includes sample products across categories:
- **Smartphones**: iPhone 15 Pro Max, Samsung Galaxy S24 Ultra
- **Laptops**: MacBook Air M2
- **Audio**: Sony WH-1000XM5 Headphones
- **Tablets**: iPad Pro 12.9"
- **Gaming**: Mechanical Keyboard

## 📡 API Endpoints

### Chat Endpoint
```
POST /chat
Content-Type: application/json

{
  "message": "Show me laptops under $1000"
}
```

**Response:**
```json
{
  "reply": "Found 1 result(s).",
  "sql": "SELECT * FROM Product WHERE category = 'Laptops' AND price < 1000;",
  "products": [
    {
      "id": "2",
      "name": "MacBook Air M2",
      "price": 999,
      "category": "Laptops",
      "description": "Ultra-thin laptop with M2 chip",
      "rating": 4.9,
      "reviews": 1834,
      "in_stock": true,
      "tags": ["Apple", "M2 Chip", "Lightweight"]
    }
  ]
}
```

### Health Check
```
GET /
```

Returns: `"Flask backend is working!"`

## 🤖 AI Query Examples

The bot understands various natural language queries:

### Product Search
- "Show me all Apple products under $1000"
- "What laptops do you have in stock?"
- "Find me gaming accessories"

### Price Filtering
- "What's on sale today?"
- "Show me discounted smartphones"
- "Products under $500"

### Category Browsing
- "List all tablets"
- "Audio equipment available"
- "Gaming products"

### Specific Queries
- "Do you have a Gaming Mechanical Keyboard?"
- "iPad Pro with high rating"
- "Wireless headphones with good reviews"

## 📁 Project Structure

```
ecommerce-bot/
├── src/
│   ├── app/
│   │   ├── Components/
│   │   │   ├── ChatHeader.tsx
│   │   │   ├── ChatInput.tsx
│   │   │   ├── ChatInterface.tsx
│   │   │   ├── MessageBubble.tsx
│   │   │   └── TypingIndicator.tsx
│   │   ├── Product/
│   │   │   └── ProductCard.tsx
│   │   ├── Services/
│   │   │   └── chatService.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
├── product-server/
│   ├── app.py
│   ├── groq_utils.py
│   ├── init_db.py
│   ├── mock_data.py
│   └── prompt.py
├── package.json
├── next.config.ts
└── README.md
```

## 🎨 UI Components

### ChatInterface
Main chat component managing conversation flow, message state, and API communication.

### MessageBubble
Displays individual messages with different layouts for user and bot messages, including product cards.

### ProductCard
Renders product information with two variants:
- **Compact**: Grid layout for multiple products
- **Full**: Detailed view with all product information

### ChatInput
Input component with quick suggestions and message submission.

### TypingIndicator
Animated indicator showing when the bot is processing a request.

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
# Groq API Configuration
GROQ_API_KEY=your_groq_api_key_here

# Database Configuration
DATABASE_URL=sqlite:///ecommerce.db

# Development Configuration
NODE_ENV=development
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Detailed Architecture & Design Patterns
System Architecture Overview
The E-commerce Shopping Bot follows a modern, scalable architecture pattern that separates concerns while maintaining tight integration between components:
![image](https://github.com/user-attachments/assets/78976a10-d26f-49b8-8fb9-dcc951e209c9)

Frontend Architecture Deep Dive
Component Hierarchy & Design Patterns
The frontend employs a hierarchical component structure with clear separation of responsibilities:
ChatInterface (Container Component)
├── ChatHeader (Presentation Component)
│   ├── Brand Identity
│   ├── Session Information
│   └── Action Controls (Reset, Logout)
├── Message Display Area (Layout Component)
│   ├── MessageBubble (Smart Component)
│   │   ├── User Message Renderer
│   │   ├── Bot Message Renderer
│   │   └── Product Grid Integration
│   ├── ProductCard (Reusable Component)
│   │   ├── Compact View (Grid Display)
│   │   ├── Detailed View (Full Display)
│   │   └── Interactive Elements
│   └── TypingIndicator (Animation Component)
└── ChatInput (Form Component)
    ├── Text Input Handler
    ├── Quick Suggestions
    └── Message Submission
State Management Strategy
The application uses a hybrid state management approach:

Local Component State: Individual component states using React hooks (useState, useEffect)
Context Passing: Props drilling for deeply nested component communication
Browser Storage: Persistent storage for chat history and user preferences
Service Layer: Centralized API communication through ChatService singleton

Type Safety Implementation
Comprehensive TypeScript integration ensures type safety across the application:
typescript// Core data models with strict typing
interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  description: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  tags: string[];
}

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  products?: Product[];
  type: 'text' | 'product' | 'product-list';
}
Backend Architecture Deep Dive
Flask Application Structure
The backend follows a modular design pattern with clear separation of concerns:
python# Application Factory Pattern
app = Flask(__name__)

# Configuration Management
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///ecommerce.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Extension Initialization
db = SQLAlchemy(app)
CORS(app)  # Cross-origin resource sharing

# Model Definition (Data Layer)
class Product(db.Model):
    # Comprehensive product schema with relationships

# Service Layer (Business Logic)
def get_sql_from_groq(user_input):
    # AI integration and query processing

# Controller Layer (API Endpoints)
@app.route('/chat', methods=['POST'])
def chat_handler():
    # Request processing and response formatting
Database Design & Optimization
The SQLite database is designed with performance and scalability in mind:
Product Table Schema:
sqlCREATE TABLE product (
    id TEXT PRIMARY KEY,           -- Unique identifier
    name TEXT NOT NULL,            -- Product name (indexed)
    price FLOAT NOT NULL,          -- Current selling price
    original_price FLOAT,          -- Original price (for discounts)
    image TEXT,                    -- Product image URL
    category TEXT,                 -- Product category (indexed)
    description TEXT,              -- Detailed description
    rating FLOAT,                  -- Average customer rating
    reviews INTEGER,               -- Number of reviews
    in_stock BOOLEAN,              -- Availability status
    tags TEXT                      -- JSON array of tags (searchable)
);

-- Performance Indexes
CREATE INDEX idx_category ON product(category);
CREATE INDEX idx_price ON product(price);
CREATE INDEX idx_rating ON product(rating);
CREATE INDEX idx_stock ON product(in_stock);
Query Optimization Strategies:

Efficient indexing on frequently searched columns
Optimized SQL generation with proper WHERE clauses
Result caching for repeated queries
Connection pooling for concurrent requests

## 🧪 Testing

### Frontend Testing
```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

### Backend Testing
```bash
# Test API endpoints
python -m pytest tests/

# Manual testing
curl -X POST http://localhost:5000/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Show me smartphones"}'
```

## 📱 Usage Examples

### Basic Product Search
1. Type: "Show me laptops"
2. Bot converts to SQL: `SELECT * FROM Product WHERE category = 'Laptops';`
3. Returns matching products with full details

### Price-Based Filtering
1. Type: "What's under $500?"
2. Bot converts to SQL: `SELECT * FROM Product WHERE price < 500;`
3. Shows affordable options

### Sale Items
1. Type: "What's on sale?"
2. Bot converts to SQL: `SELECT * FROM Product WHERE original_price IS NOT NULL AND price < original_price;`
3. Displays discounted products

###Project Screenshots

![image](https://github.com/user-attachments/assets/9d7190ee-bc9d-408b-acca-7b4ffc0a476b)
![image](https://github.com/user-attachments/assets/72c143df-37c9-44a4-93c1-61d948b984db)
![image](https://github.com/user-attachments/assets/c0f24bd8-a4a5-468e-b896-8a5ca6ce0555)





