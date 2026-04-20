import { useState, useEffect, useCallback } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'admin';
  createdAt: string;
}

export interface ItineraryRequest {
  id: string;
  userId: string;
  cities: string[];
  days: Record<string, number>;
  groupSize: number;
  travelDate?: string;
  specialRequests?: string;
  status: 'pending' | 'quoted' | 'confirmed' | 'cancelled';
  basePrice: number;
  finalPrice?: number;
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEY = 'go_east_auth';
const USERS_KEY = 'go_east_users';
const ITINERARIES_KEY = 'go_east_itineraries';

const DEFAULT_ADMIN = {
  id: 'admin_001',
  email: 'admin@goeast.com',
  name: 'Administrator',
  role: 'admin' as const,
  createdAt: new Date().toISOString()
};

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const getUsers = (): User[] => {
    const stored = localStorage.getItem(USERS_KEY);
    const users = stored ? JSON.parse(stored) : [];
    if (!users.find((u: User) => u.role === 'admin')) {
      users.push(DEFAULT_ADMIN);
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
    }
    return users;
  };

  const saveUsers = (users: User[]) => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  };

  const getItineraries = (): ItineraryRequest[] => {
    const stored = localStorage.getItem(ITINERARIES_KEY);
    return stored ? JSON.parse(stored) : [];
  };

  const saveItineraries = (itineraries: ItineraryRequest[]) => {
    localStorage.setItem(ITINERARIES_KEY, JSON.stringify(itineraries));
  };

  const register = useCallback(async (email: string, password: string, name: string): Promise<{ success: boolean; error?: string }> => {
    const users = getUsers();
    
    if (users.find(u => u.email === email)) {
      return { success: false, error: 'Email already registered' };
    }

    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      role: 'customer',
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    saveUsers(users);
    
    setUser(newUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    
    return { success: true };
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const users = getUsers();
    const found = users.find(u => u.email === email);
    
    if (!found) {
      return { success: false, error: 'Invalid email or password' };
    }

    setUser(found);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(found));
    
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const createItinerary = useCallback((data: Omit<ItineraryRequest, 'id' | 'userId' | 'status' | 'createdAt' | 'updatedAt'>): ItineraryRequest => {
    if (!user) throw new Error('Not authenticated');

    const itineraries = getItineraries();
    const newItinerary: ItineraryRequest = {
      ...data,
      id: Date.now().toString(),
      userId: user.id,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    itineraries.push(newItinerary);
    saveItineraries(itineraries);
    
    return newItinerary;
  }, [user]);

  const getUserItineraries = useCallback((): ItineraryRequest[] => {
    if (!user) return [];
    const itineraries = getItineraries();
    return itineraries.filter(i => i.userId === user.id).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [user]);

  const getAllItineraries = useCallback((): ItineraryRequest[] => {
    const itineraries = getItineraries();
    return itineraries.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, []);

  const updateItineraryPrice = useCallback((id: string, finalPrice: number, adminNotes?: string) => {
    const itineraries = getItineraries();
    const index = itineraries.findIndex(i => i.id === id);
    
    if (index !== -1) {
      itineraries[index] = {
        ...itineraries[index],
        finalPrice,
        adminNotes,
        status: 'quoted',
        updatedAt: new Date().toISOString()
      };
      saveItineraries(itineraries);
    }
  }, []);

  const confirmItinerary = useCallback((id: string) => {
    const itineraries = getItineraries();
    const index = itineraries.findIndex(i => i.id === id);
    
    if (index !== -1) {
      itineraries[index] = {
        ...itineraries[index],
        status: 'confirmed',
        updatedAt: new Date().toISOString()
      };
      saveItineraries(itineraries);
    }
  }, []);

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    register,
    login,
    logout,
    createItinerary,
    getUserItineraries,
    getAllItineraries,
    updateItineraryPrice,
    confirmItinerary,
    getUsers
  };
}
