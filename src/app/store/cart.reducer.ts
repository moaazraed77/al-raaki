import { createReducer, on } from "@ngrx/store";
import { addToCart, removeFromCart } from "./cart.actions";

// create initial value state to make it global change on the project
const count:number = JSON.parse(localStorage.getItem("products-cart")!) ? JSON.parse(localStorage.getItem("products-cart")!).length : 0

export const  cartReducer = createReducer(
    count,
    on(addToCart, count => count + 1 ),
    on(removeFromCart , count => count - 1)
)