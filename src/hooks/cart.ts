import { useEffect, useState } from "react"
import { Product } from "../entities/product";

export const useCart = (): [number, (product: Product) => void, (product: Product) => void, (product: Product) => void, (product: Product) => number] => {
    const [ cartProducts, setCartProducts ] = useState<Array<{ product: Product, qty: number }>>([]);
    const [ cartTotal, setCartTotal ] = useState(0);

    useEffect(() => {
        updateTotal(cartProducts);
    }, [cartProducts])

    const updateTotal = ( products: Array<{ product: Product, qty: number }> ) => {
        let newTotal = 0;
        products.map( p => {
            newTotal += p.qty * ( p.product.price || 0 );
        } );
        setCartTotal(newTotal);
    }

    return [
        cartTotal,
        /**
         * Add to cart
         */
        function( product: Product ) {
            let cartProductsTemp = cartProducts;
            const inCart = cartProductsTemp.find( p => p.product.id === product.id );
            if ( !inCart ) {
                cartProductsTemp = [...cartProducts, { product, qty: 1 }];
            } else {
                cartProductsTemp = cartProductsTemp.map( p => {
                    if (p.product.id === product.id) {
                        p.qty += 1;
                    }
                    return p;
                }); 
            }
            setCartProducts( cartProductsTemp );
        },
        /**
         * Decrement from cart
         */
        function( product: Product ){
            let cartProductsTemp = cartProducts;
            const inCart = cartProductsTemp.find( p => p.product.id === product.id );
            if ( inCart && inCart.qty > 0 ) {
                cartProductsTemp = cartProductsTemp.map( p => {
                    if (p.product.id === product.id) {
                        p.qty -= 1;
                    }
                    return p;
                });
            } else if ( inCart && inCart.qty <= 0 ) {
                cartProductsTemp = cartProducts.filter( p => p.product.id === product.id );
            }
            setCartProducts( cartProductsTemp );
        },
        /**
         * Remove from cart
         */
        function( product: Product ) {
            let cartProductsTemp = cartProducts;
            const inCart = cartProductsTemp.find( p => p.product.id === product.id );
            if ( inCart && inCart.qty > 0 ) {
                cartProductsTemp = cartProductsTemp.map( p => {
                    if (p.product.id === product.id) {
                        p.qty = 0;
                    }
                    return p;
                });
            } else if ( inCart && inCart.qty <= 0 ) {
                cartProductsTemp = cartProducts.filter( p => p.product.id !== product.id );
            }
            setCartProducts( cartProductsTemp );
        },
        /**
         * Get quantity
         */
        function(product: Product) {
            const inCart = cartProducts.find( p => p.product.id === product.id );
            if ( inCart && inCart.qty > 0 ) {
                return inCart.qty;
            }
            return 0;
        }
    ]
}
