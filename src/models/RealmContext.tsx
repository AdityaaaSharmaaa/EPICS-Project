import React, { createContext, useContext, useState } from 'react';

// --- 1. THE MOCK DATABASE (Memory Only) ---
const DB: any = {
  User: [],
  Transaction: []
};

// --- 2. MOCK REALM CLASS (Fixed ID Generation) ---
export const MockRealm = {
  BSON: {
    // We make this a Class so 'new ObjectId()' creates a unique object with a string ID
    ObjectId: class {
        id: string;
        constructor() {
            // Generate a random unique string
            this.id = Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
        }
        // This ensures when we do id.toString(), we get the actual value
        toString() { return this.id; }
        toHexString() { return this.id; }
    }
  },
  Object: class {} 
};

// --- 3. THE CONTEXT ---
export const RealmContext = createContext<any>(null);

export const RealmProvider = ({ children }: any) => {
  // This state forces the app to re-render when we "write" to the DB
  const [tick, setTick] = useState(0);

  const realm = {
    write: (callback: () => void) => {
      callback();
      setTick(t => t + 1); // Force Screen Update
    },
    create: (schema: string, data: any) => {
      if (!DB[schema]) DB[schema] = [];
      
      // Ensure the ID is stored as a string, not an object
      const safeData = { ...data };
      if (safeData._id && typeof safeData._id === 'object') {
          safeData._id = safeData._id.toString();
      }

      DB[schema].push(safeData);
      console.log(`[DB] Created ${schema}:`, safeData);
    },
    objects: (schema: string) => {
      return {
        filtered: (query: string) => {
          // Simple mock filter for Login
          if (schema === 'User' && query.includes('mobile')) {
             const mobile = query.split('==')[1].replace(/"/g, '').trim();
             return DB.User.filter((u: any) => u.mobile === mobile);
          }
          return DB[schema];
        }
      };
    }
  };

  return (
    <RealmContext.Provider value={{ realm, tick }}>
      {children}
    </RealmContext.Provider>
  );
};

// --- 4. HOOKS ---
export const useRealm = () => {
  const ctx = useContext(RealmContext);
  return ctx.realm;
};

export const useQuery = (schema: string) => {
  const ctx = useContext(RealmContext);
  // Return the data from memory
  const data = DB[schema] || [];
  
  // Add a fake 'sorted' function so the code doesn't crash
  (data as any).sorted = () => data;
  
  return data;
};

// Export as a single object for easier importing
export const RealmContextObj = {
  RealmProvider,
  useRealm,
  useQuery
};