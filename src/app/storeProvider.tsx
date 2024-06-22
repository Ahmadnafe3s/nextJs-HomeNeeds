"use client"
import { AppStore, makeStore } from "@/Store/store"
import { ReactNode, useRef } from "react"
import { Provider } from "react-redux"



const StoreProvider = ({ children }: { children: ReactNode }) => {

  const storeRef = useRef<AppStore>()

  if (!storeRef.current) {
    storeRef.current = makeStore()
  }

  return <Provider store={makeStore()}>{children}</Provider>

}

export default StoreProvider

