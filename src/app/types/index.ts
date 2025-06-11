export interface User {
    id: string;
    email: string;
    name: string;
    avatar?: string;
  }
  
  export interface Product {
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
  
  export interface Message {
    id: string;
    content: string;
    sender: 'user' | 'bot';
    timestamp: Date;
    products?: Product[];
    type: 'text' | 'product' | 'product-list';
  }
  
  export interface Session {
    id: string;
    userId: string;
    messages: Message[];
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
  }