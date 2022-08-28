import { createContext, useContext, useState } from 'react'

const Context = createContext()

export function StoreProvider({ children }) {
    const [store, setStore] = useState({orders: [], masterInfo: [], services: [], booking: []})

    console.log('STORE', store);

    return <Context.Provider value={[store, setStore]}>{children}</Context.Provider>
}


export function useStoreContext() {
    return useContext(Context)
}