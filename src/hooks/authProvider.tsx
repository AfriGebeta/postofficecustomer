import axios from "axios";
import React, { createContext, useContext, useState, ReactNode } from "react";

// Define PostalUserRoles
// type PostalUserRole = 'basic' | 'lemaj' | 'Limd yalew' | 'master' | 'owner';
export enum PostalUserRole {
  basic = "basic",
  lemaj = "lemaj",
  Limd_yalew = "Limd yalew",
  master = "master",
  owner = "owner",
}

// Define user type
export interface PostalUser {
  phone: string;
  firstName: String;
  lastName: String;
  role: PostalUserRole;
  id: string;
}

// Define context type
interface AuthContextType {
  user: PostalUser | null;
  setUser: (PostalUser: PostalUser) => void;
  login: (phone: string, password: string) => Promise<PostalUser>;
  register: (data: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    password: string;
    confirmPassword: string;
  }) => Promise<PostalUser | null>;
  logout: () => Promise<void>;
  hasPostalUserRole: (PostalUserRole: PostalUserRole) => boolean;
}

// Initial context state
const initialPostalUserState: PostalUser | null = null;

// Create context
const AuthContext = createContext<AuthContextType>({
  user: initialPostalUserState,
  setUser: () => {},
  login: (phone: string, password: string) => new Promise(() => {}),
  register: (data: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    password: string;
    confirmPassword: string;
  }) => new Promise(() => {}),
  logout: () => new Promise(() => {}),
  hasPostalUserRole: () => false,
});

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

// AuthProvider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setPostalUser] = useState<PostalUser | null>(
    initialPostalUserState
  );

  // Simulate login
  const login = async (phone: string, password: string) => {
    // login request logic here
    
    const res = await axios.post(import.meta.env.VITE_API_URL + "/profile/login", {
      phone,
      password,
    });
    if(res) {
      setPostalUser(res.data);
      //set localStorage
      localStorage.setItem("user", JSON.stringify(res.data));
      return res.data;
    }
    throw new Error('Failed to login');
  };

  // Logout function
  const logout = () => {
    // logout request logic here
    setPostalUser(null);
    // remove localStorage
    localStorage.removeItem("user");
    return Promise.resolve();
  };

  // register user
  const register = async (data: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    password: string;
    confirmPassword: string;
  }): Promise<PostalUser | null> => {
    // register request logic here
    const res = await axios
      .post(import.meta.env.VITE_API_URL + "/profile/signup", {
        ...data,
        location: {
          name: "Main",
          coords: {
            latitude: 9.0198,
            longitude: 38.8017,
          },
        },
      })
    if(res) {
      setPostalUser(res.data);
        //set localStorage
        localStorage.setItem("user", JSON.stringify(res.data));
        return res.data;
    }else{
      throw new Error('Failed to register');
    }
  };

  // Check if user has a certain PostalUserRole
  const hasPostalUserRole = (PostalUserRole: PostalUserRole): boolean => {
    return !!user && user.role.includes(PostalUserRole);
  };

  // update the user
  const setUser = (PostalUser: PostalUser) => {
    setPostalUser(PostalUser);
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, login, register, logout, hasPostalUserRole }}
    >
      {children}
    </AuthContext.Provider>
  );
};
