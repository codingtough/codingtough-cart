export const actionTypes = {
   CLEAR_CART: "CLEAR_CART",
   REMOVE: "REMOVE",
   INCREASE: "INCREASE",
   DECREASE: "DECREASE",
   GET_TOTALS: 'GET_TOTALS',
   LOADING: 'LOADING',
   DISPLAY_ITEMS: 'DISPLAY_ITEMS',
   TOGGLE_AMOUNT: 'TOGGLE_AMOUNT',
}

const reducer = (state, action) => {
   // let tempCart;

   switch (action.type) {
      case actionTypes.CLEAR_CART:
         return {
            ...state,
            cart: [],
         }
      case actionTypes.REMOVE:
         return {
            ...state,
            cart: state.cart.filter(cartItem => cartItem.id !== action.payload),
         }
      // case actionTypes.INCREASE:
      //    tempCart = state.cart
      //       .map(cartItem => {
      //          if (cartItem.id === action.payload) {
      //             return {
      //                ...cartItem,
      //                amount: cartItem.amount + 1,
      //             }
      //          }
      //          return cartItem;
      //       })
      //       .filter(cartItem => cartItem.amount !== 0)
      //    return {
      //       ...state,
      //       cart: tempCart
      //    }
      // case actionTypes.DECREASE:
      //    tempCart = state.cart
      //       .map(cartItem => {
      //          if (cartItem.id === action.payload) {
      //             return {
      //                ...cartItem,
      //                amount: cartItem.amount - 1,
      //             }
      //          }
      //          return cartItem;
      //       })
      //       .filter(cartItem => cartItem.amount !== 0)
      //    return {
      //       ...state,
      //       cart: tempCart,
      //    }

      case actionTypes.TOGGLE_AMOUNT:
         let tempCart = state.cart
            .map(cartItem => {
               if (cartItem.id === action.payload.id) {
                  if (action.payload.type === 'increase') {
                     return {
                        ...cartItem,
                        amount: cartItem.amount + 1
                     }
                  }
                  if (action.payload.type === 'decrease') {
                     return {
                        ...cartItem,
                        amount: cartItem.amount - 1
                     }
                  }
               }
               return cartItem;
            })
            .filter(cartItem => cartItem.amount !== 0)

         return {
            ...state,
            cart: tempCart,
         }

      case actionTypes.GET_TOTALS:
         let { total, amount } = state.cart.reduce((cartTotal, cartItem) => {
            const { price, amount } = cartItem;
            const itemTotal = price * amount;

            cartTotal.total += itemTotal;
            cartTotal.amount += amount;

            return cartTotal;

         }, { total: 0, amount: 0 })

         total = parseFloat(total.toFixed(2));

         return {
            ...state,
            total,
            amount,
         }

      case actionTypes.LOADING:
         return {
            ...state,
            loading: true,
         }

      case actionTypes.DISPLAY_ITEMS:
         return {
            ...state,
            cart: action.payload,
            loading: false,
         }

      default:
         throw new Error('no matching action type');
   }
}

// const reducer = (state, action) => {
//    if (action.type === actionTypes.CLEAR_CART) {
//       return {
//          ...state,
//          cart: [],
//       }
//    }

//    if (action.type === actionTypes.REMOVE) {
//       return {
//          ...state,
//          cart: state.cart.filter(cartItem => cartItem.id !== action.payload)
//       }
//    }

//    if (action.type === actionTypes.INCREASE) {
//       let tempCart = state.cart.map((cartItem) => {
//          console.log(cartItem);
//          if (cartItem.id === action.payload) {
//             return {
//                ...cartItem,
//                amount: cartItem.amount + 1
//             }
//          }
//          return cartItem;
//       })
//       return {
//          ...state,
//          cart: tempCart,
//       }
//    }

//    if (action.type === actionTypes.DeCREASE) {
//       let tempCart = state.cart.map(cartItem => {
//          if (cartItem.id === action.payload) {
//             return {
//                ...cartItem,
//                amount: cartItem.amount - 1
//             }
//          }
//          return cartItem;
//       })
//       return {
//          ...state,
//          cart: tempCart,
//       }
//    }

//    return state;
// }

export default reducer;