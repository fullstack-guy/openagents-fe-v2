import React, { useContext } from 'react';

export const SupabaseContext = React.createContext({
  session: null
});

export const useSupabaseContext = () => useContext(SupabaseContext)
