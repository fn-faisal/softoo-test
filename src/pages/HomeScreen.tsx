import { useEffect, useState } from "react";
import { fetchProduct } from "../api/products";
import { Filter } from "../components/filter";
import { ProductCard } from "../components/product-card"
import { Product } from "../entities/product";
import { useCart } from "../hooks/cart";

export default function HomeScreen() {
    const [ products, setProducts ] = useState<Array<Product>>([]);
    const [ loading, setLoading ] = useState(false);
    const [ colours, setColours ] = useState<any>([]);
    const [ activeFilter, setActiveFilter ] = useState<string | undefined>();

    /**
     * Using a hook to store cart.
     * would work well for this app as there's only one page but for 
     * a production ready application, we should use something like redux or context or zustand to 
     * create a cart store. 
     */
    const [ total, addToCart, deleteFromCart, removeFromCart, getQty ] = useCart();

    const loadProduct = async (colour?: string): Promise<Array<Product>> => {
        try {
            setLoading(true);
            const fetchedProducts = await fetchProduct(colour);
            setProducts(fetchedProducts);
            return Promise.resolve(fetchedProducts)
        } catch ( e: any ) {
            alert(e?.message || e?.error || 'Unknown error occurred');
            return Promise.reject();
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadProduct()
            .then(
                (products: Array<Product>) => 
                    setColours( products.map(p => p.colour) 
                )
            );
    }, []);

    return (
        <div className="flex flex-col p-10">
            <div className="flex flex-row">
                <Filter 
                    activeFilter={activeFilter}
                    onColourChanged={( colour ) => {
                        if ( colour === activeFilter ) return;
                        loadProduct(colour)
                            .then(() => setActiveFilter(colour));
                    }}
                    colours={colours} />
            </div>
            <div className="mt-4">
                {
                    loading === true &&
                    <progress data-testid="loader" className="progress w-full my-8"></progress>
                }
                <div data-testid="product-container">
                {
                    products.map(
                        ( product ) => <ProductCard 
                            qty={getQty(product)} 
                            onAddToCart={() => addToCart(product)}
                            onDeleteFromCart={() => deleteFromCart(product)}
                            onRemoveFromCart={() => removeFromCart(product)}
                            key={product.id} product={product} />
                    )
                }
                </div>
                <div className="card flex my-4 flex-row w-[80%] bg-base-100">
                    <div className="px-1 flex-1"></div>
                    <div className="flex-2"></div>
                    <div className="flex-2 w-24 flex flex-col text-center items-center text-xl justify-center">
                        <hr className="w-full border-muted" />
                        <h5 className="text-xl mt-1 text-muted" data-testid="cart-total">
                            $ {total.toFixed(2)}
                        </h5>
                    </div>
                </div>
            </div>
        </div>
    )
}
