import axios from "axios";
import { createContext, useEffect, useState } from "react"
  export const CartContext = createContext();

export default function CartContextProvider({ children }) {
  const [addProductToCart, setAddProductToCart] = useState(null);
  const [numOfCartItems, setNumOfCartItems] = useState(0)
  const [totalCartPrice, setTotalCartPrice] = useState(0)
  const [showing, setShowing] = useState(true)
  const [CartId, setCartId] = useState(null);


  function clearUI() {
    setAddProductToCart(null)
    setNumOfCartItems(0)
    setTotalCartPrice(0)
    setCartId(null)
  }

  // console.log(addPro ductToCart);
  let headers = {
      token: localStorage.getItem('tkn')
    }
  
  async function addProduct(pId) {
    console.log(pId);

  setShowing(false);
    return  axios.post('https://ecommerce.routemisr.com/api/v1/cart', { "productId": pId }, {
      headers
    })
      .then((res) => {
        console.log('res',res);
        console.log('pid',pId);
        
        setAddProductToCart(res.data.data.products)
        setNumOfCartItems(res.data.numOfCartItems)
        setTotalCartPrice(res.data.data.totalCartPrice)
        setShowing(true);
        getUserCart()
        // console.log(res.data.status)
        return { res, status: true };
      })
    .catch((error)=>{
      setShowing(true);
      // console.log(error)
      return {error ,status: false};
    })
  }

  async function handelButton(Id, newCount) {
      return  axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${Id}`,
        {
          count: newCount,
        },
        {
          headers,
        }
      )
      .then((res) => {
        setAddProductToCart(res.data.data.products);
        setNumOfCartItems(res.data.numOfCartItems);
        setTotalCartPrice(res.data.data.totalCartPrice);

        return true
      })
      .catch((error) => {
        console.log(error)
        return false

      })
    
  }

 async function DeleteProduct(productId) {
  
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
      headers
    })
      .then((res)=>{
                setAddProductToCart(res.data.data.products);
                setNumOfCartItems(res.data.numOfCartItems);
        setTotalCartPrice(res.data.data.totalCartPrice);
        return true
      }
      )
    .catch(()=>{
      console.log(error)
      return false
    })
  }
  function RemoveItems() {

     axios
       .delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
         headers,
       })
       .then((res) => {
        //  addProduct()
         setAddProductToCart();
         setNumOfCartItems(res.data.numOfCartItems);
         setTotalCartPrice();
         console.log(res);

        //  return true
       })
       .catch((error) => {
         console.log(error);
        //  return false
       });
  }

  function getUserCart() {
    axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
      headers
    })
    .then((res)=>{
      // console.log(res)
      setAddProductToCart(res.data.data.products);
      setNumOfCartItems(res.data.numOfCartItems);
      setTotalCartPrice(res.data.data.totalCartPrice);
      setCartId(res.data.data._id)
      setShowing(true);

    })
    .catch((error)=>{
      console.log(error)
    })
  }
  useEffect(() => {
    getUserCart()
  },[])

  return (
    <>
      <CartContext.Provider
        value={{
          addProduct,
          totalCartPrice,
          numOfCartItems,
          addProductToCart,
          showing,
          CartId,
          getUserCart,
          handelButton,
          DeleteProduct,
          RemoveItems,
          setAddProductToCart,
          setNumOfCartItems,
          setTotalCartPrice,
          clearUI,
          setCartId,
        }}
      >
        {children}
      </CartContext.Provider>
    </>
  );
}




