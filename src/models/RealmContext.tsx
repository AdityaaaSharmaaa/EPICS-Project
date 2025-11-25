import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// --- CONSTANTS ---
const STORAGE_KEY = '@gramsevak_db_v1';

// --- MOCK REALM CLASS ---
export const MockRealm = {
  BSON: {
    ObjectId: function() { 
      return Math.random().toString(36).substring(7) + Date.now().toString(36); 
    }
  }
};

// --- THE CONTEXT ---
export const RealmContext = createContext<any>(null);

export const RealmProvider = ({ children }: any) => {
  // We keep a local copy of the DB in React State
  const [db, setDb] = useState<any>({
    User: [],
    Transaction: []
  });
  const [isLoaded, setIsLoaded] = useState(false);

  // 1. Load Data on App Start
  useEffect(() => {
    const loadData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
        if (jsonValue != null) {
          setDb(JSON.parse(jsonValue));
          console.log("[DB] Data Loaded from Disk");
        } else {
          console.log("[DB] No saved data found, starting fresh.");
        }
      } catch(e) {
        console.error("Failed to load data", e);
      } finally {
        setIsLoaded(true);
      }
    };
    loadData();
  }, []);

  // 2. Save Data Helper
  const saveData = async (newDb: any) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newDb));
      setDb(newDb); // Update State
    } catch (e) {
      console.error("Failed to save data", e);
    }
  };

  // 3. The Realm Interface
  const realm = {
    write: (callback: () => void) => {
      // In this mock, 'callback' usually creates objects. 
      // We intercept the creation logic below.
      callback();
    },
    
    create: (schema: string, data: any) => {
      // Create a COPY of the current DB to avoid mutation issues
      const newDb = { ...db };
      if (!newDb[schema]) newDb[schema] = [];
      
      newDb[schema].push(data);
      console.log(`[DB] Saving new ${schema}:`, data);
      
      // Save to Disk
      saveData(newDb);
    },

    objects: (schema: string) => {
      // Return the data currently in state
      const data = db[schema] || [];
      return {
        filtered: (query: string) => {
          if (schema === 'User' && query.includes('mobile')) {
             const mobile = query.split('==')[1].replace(/"/g, '').trim();
             return data.filter((u: any) => u.mobile === mobile);
          }
          return data;
        },
        // Mimic Realm's live collection
        sorted: () => data,
        map: (cb: any) => data.map(cb),
        length: data.length,
        [Symbol.iterator]: function* () { yield* data; }
      };
    }
  };

  if (!isLoaded) {
    return null; // Or a Loading Spinner could go here
  }

  return (
    <RealmContext.Provider value={{ realm, db }}>
      {children}
    </RealmContext.Provider>
  );
};

// --- HOOKS ---
export const useRealm = () => {
  const ctx = useContext(RealmContext);
  return ctx.realm;
};

export const useQuery = (schema: string) => {
  const ctx = useContext(RealmContext);
  // Direct access to the state data
  const data = ctx.db[schema] || [];
  (data as any).sorted = () => data;
  return data;
};

export const RealmContextObj = {
  RealmProvider,
  useRealm,
  useQuery
};