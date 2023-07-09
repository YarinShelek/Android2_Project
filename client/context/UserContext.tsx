import React, { createContext, useState, useEffect } from 'react';

export interface User {
  id: number;
  username: string;
  name: string;
  phone: string;
  addresses: {
    city: string;
  };
  email: string;
  role: string;
  password: string;
  token: string;
}

interface Cart {
  id: number;
  items: any[]; // Define the type for cart items based on your data structure
}

interface UserContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (user: User) => void;
  logout: () => void;
}

const createCart = async (user: User): Promise<Cart> => {
  try {
    // Replace this with your own logic to create a cart using an API call or database operation
    const response = await fetch('https://example.com/create-cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: user.token, // Include the user's token in the request headers
      },
      body: JSON.stringify({ userId: user.id }), // Include the user's ID or any other necessary data
    });

    if (!response.ok) {
      throw new Error('Failed to create cart');
    }

    const cartData = await response.json();

    // Return the created cart data
    return cartData;
  } catch (error) {
    console.error('Error creating cart:', error);
    throw error;
  }
};

const fetchUser = async (): Promise<User> => {
    try {
      // Replace this with your own logic to fetch user data from an API or database
      const response = await fetch('https://example.com/user', {
        headers: {
          Authorization: 'Bearer YOUR_AUTH_TOKEN', // Include the necessary authorization token
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
  
      const userData = await response.json();
  
      // Return the fetched user data
      return userData;
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  };
  

export const UserContext = createContext<UserContextType>({
  user: null,
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

export const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Simulate an async fetch to get the user data
        const userData = await fetchUser(); // async function to fetch user data
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const login = async (user: User) => {
    try {
      const cartData = await createCart(user);
      const updatedUser = { ...user, cart: cartData };
      setUser(updatedUser);
    } catch (error) {
      console.error('Error creating cart:', error);
    }
  };

  const logout = () => {
    setUser(null);
  };

  const isLoggedIn = !!user;

  const userContextValue: UserContextType = {
    user,
    isLoggedIn,
    login,
    logout,
  };

  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  );
  
};
