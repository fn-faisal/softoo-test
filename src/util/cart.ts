import { Product } from "../entities/product";

export const addItem = (cartProducts: any, product: Product) => {
    let cartProductsTemp = cartProducts;
    const inCart = cartProductsTemp.find( (p: any) => p.product.id === product.id );
    if ( !inCart ) {
        cartProductsTemp = [...cartProducts, { product, qty: 1 }];
    } else {
        cartProductsTemp = cartProductsTemp.map( (p: any) => {
            if (p.product.id === product.id) {
                p.qty += 1;
            }
            return p;
        }); 
    }

    return cartProductsTemp;
}


export const removeItem = (cartProducts: any, product: Product) => {
    let cartProductsTemp = cartProducts;
    const inCart = cartProductsTemp.find( (p: any) => p.product.id === product.id );
    if ( inCart && inCart.qty > 0 ) {
        cartProductsTemp = cartProductsTemp.map( (p: any) => {
            if (p.product.id === product.id) {
                p.qty -= 1;
            }
            return p;
        });
    } else if ( inCart && inCart.qty <= 0 ) {
        cartProductsTemp = cartProducts.filter( (p: any) => p.product.id === product.id );
    }
    return cartProductsTemp;
}

export const removeAllItems = (cartProducts: any, product: Product) => {
    let cartProductsTemp = cartProducts;
    const inCart = cartProductsTemp.find( (p: any) => p.product.id === product.id );
    if ( inCart && inCart.qty > 0 ) {
        cartProductsTemp = cartProductsTemp.map( (p: any) => {
            if (p.product.id === product.id) {
                p.qty = 0;
            }
            return p;
        });
    } else if ( inCart && inCart.qty <= 0 ) {
        cartProductsTemp = cartProducts.filter( (p: any) => p.product.id !== product.id );
    }

    return cartProductsTemp;
}

export const calculateTotal = (cartProducts: any) => {
    return cartProducts.reduce((t: number, curr: any) => {
        return t + curr.qty * ( curr.product.price || 0 )
    }, 0);
}

export const getItemQty = (cartProducts: any, product: Product ) => {
    const inCart = cartProducts.find( (p: any) => p.product.id === product.id );
    if ( inCart && inCart.qty > 0 ) {
        return inCart.qty;
    }
    return 0;
}