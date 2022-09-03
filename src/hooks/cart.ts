import { useEffect, useState } from "react"
import { Product } from "../entities/product";
import { addItem, calculateTotal, getItemQty, removeAllItems, removeItem } from "../util/cart";

export const useCart = (): [number, (product: Product) => void, (product: Product) => void, (product: Product) => void, (product: Product) => number] => {
    const [ cartProducts, setCartProducts ] = useState<Array<{ product: Product, qty: number }>>([]);
    const [ cartTotal, setCartTotal ] = useState(0);

    useEffect(() => {
        updateTotal(cartProducts);
    }, [cartProducts])

    /**
     * Calculate cart total
     * @param products 
     */
    const updateTotal = ( products: Array<{ product: Product, qty: number }> ) => {
        let newTotal = calculateTotal(products);
        setCartTotal(newTotal);
    }

    /**
     * Add to cart
     */
    function addToCart( product: Product ) {
        let cartProductsTemp = addItem(cartProducts, product);
        setCartProducts( cartProductsTemp );
    }

    /**
     * Remove a single item from cart
     */
    function removeItemFromCartSingle(product: Product) {
        let cartProductsTemp = removeItem(cartProducts, product);
        setCartProducts( cartProductsTemp );
    }

    /**
     * Remove from cart
     */
    function removeItemFromCart(product: Product) {
        let cartProductsTemp = removeAllItems(cartProducts, product);
        setCartProducts( cartProductsTemp );
    }

    /**
     * Get quantity
     */
    function getQuantity(product: Product) {
        return getItemQty(cartProducts, product);
    }

    return [
        cartTotal,
        addToCart,
        removeItemFromCartSingle,
        removeItemFromCart,
        getQuantity,
    ];
}
