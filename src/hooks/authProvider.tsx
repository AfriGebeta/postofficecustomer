import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define PostalUserRoles
// type PostalUserRole = 'basic' | 'lemaj' | 'Limd yalew' | 'master' | 'owner';
export enum PostalUserRole {
  basic = 'basic',
  lemaj = 'lemaj',
  Limd_yalew = 'Limd yalew',
  master = 'master',
  owner = 'owner',
}

// Define user type
export interface PostalUser {
  phone: string;
  firstName: String;
  lastName: String;
  role: PostalUserRole;
}

// Define context type
interface AuthContextType {
  user: PostalUser | null;
  setUser: (PostalUser: PostalUser) => void;
  login: (phone: string, password: string) => Promise<PostalUser>,
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
  const [user, setPostalUser] = useState<PostalUser | null>(initialPostalUserState);

  // Simulate login
  const login = (phone: string, password: string) => {
    // login request logic here
    const dummyUser = { phone, firstName: "dummy", lastName: "thicc", role: PostalUserRole.master };
    setPostalUser(dummyUser);
    //set localStorage
    localStorage.setItem('user', JSON.stringify(dummyUser));
    return Promise.resolve(dummyUser);
  };

  // Logout function
  const logout = () => {
    // logout request logic here
    setPostalUser(null);
    // remove localStorage
    localStorage.removeItem('user');
    return Promise.resolve();
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
    <AuthContext.Provider value={{ user, setUser, login, logout, hasPostalUserRole }}>
      {children}
    </AuthContext.Provider>
  );
};
