import Navbar from '../navbar/navbar'

const ShoppingListLayout = ({children}:any) => {
  return (
    <>
    <Navbar />
    <main>{children}</main>
    </>
  )
}

export default ShoppingListLayout