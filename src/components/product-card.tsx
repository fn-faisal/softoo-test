import { Product } from '../entities/product';

type ProductCardProps = {
    product: Product;
    qty?: number;
    onAddToCart?: () => void;
    onRemoveFromCart?: () => void;
    onDeleteFromCart?: () => void;
};


export const ProductCard: React.FC<ProductCardProps> = ({ product, qty = 0, onAddToCart, onDeleteFromCart, onRemoveFromCart }) => {
    return (
        <div className="card flex my-4 flex-row w-[80%] bg-base-100">
            <div className="px-1 flex-1 flex justify-start items-start min-w-[200px] max-w-[200px]">
                <img src={product.img} alt={product.name} className="rounded-md h-24 w-24 object-cover" />
            </div>
            <div className="flex-2 card-body pt-0 items-start text-start">
                <div className="text-right">
                    <h2 className="card-title">{product.name}</h2>
                    <p>$ {product.price}</p>
                </div>
            </div>
            <div className="flex-2 flex flex-row">
                <div className="flex-1 items-center flex justify-center mr-4" onClick={onDeleteFromCart}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M18 12H6" />
                    </svg>
                </div>
                <div className="flex-1 items-center flex flex-col justify-center ">
                    <h3 className="text-xl">{qty}</h3>
                    <a href="#" className="link text-xs" onClick={onRemoveFromCart}><small>Remove</small></a>
                </div>
                <div className="flex-1 items-center flex justify-center ml-4" onClick={onAddToCart}> 
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                </div>

            </div>
        </div>
    );
}
