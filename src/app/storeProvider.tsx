"use client"
import { AppStore, makeStore } from "@/Store/store"
import { ReactNode, useRef } from "react"
import { Provider } from "react-redux"
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';




const StoreProvider = ({ children }: { children: ReactNode }) => {


  const storeRef = useRef<AppStore>()

  if (!storeRef.current) {
    storeRef.current = makeStore()
  }



  return <Provider store={makeStore()}>

    {children}

    <ProgressBar
      height="4px"
      color="#09790a"
      options={{ showSpinner: false }}
      shallowRouting
    />
    
  </Provider>

}

export default StoreProvider

