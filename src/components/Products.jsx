import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import fetchProducts from "../services/fetchProducts";
import { addedProduct } from "../features/cart/cartSlice";
import { FaCartShopping } from "react-icons/fa6";

export default function Products() {
	const dispatch = useDispatch();
	console.log("Api key: ", import.meta.env.VITE_SOME_KEY);

	const products = useSelector((state) => state.products.products);
	const isLoading = useSelector((state) => state.products.isLoading);
	const error = useSelector((state) => state.products.error);

	const handleAddProduct = (product) => {
		dispatch(addedProduct(product));
		console.log(product.name);
	};

	useEffect(() => {
		dispatch(fetchProducts());
		console.log(products);
	}, [dispatch]);

	if (isLoading) {
		return "loading...";
	}

	if (error) {
		return error;
	}

	if (!products || products.length === 0) {
		return <div>No products available</div>;
	}

	return (
		<ul className="grid grid-cols-3 gap-4 col-span-3 order-2 md:order-1">
			{products.map((product) =>
				product.type !== "hoodie" && product.type !== "cap" ? (
					<li
						key={product.id}
						className="flex flex-col relative aspect-[2/3] bg-white overflow-hidden p-4 shadow-md hover:shadow-xl select-none">
						<div>
							<h3 className="uppercase text-lg font-bold">{product.name}</h3>
							<h4 className="capitalize text-slate-500 text-sm">{product.type}</h4>
						</div>

						<button
							className="absolute flex flex-row bottom-4 bg-black text-white text-sm font-bold rounded-3xl px-4 py-2 pr-9 hover:bg-gray-900 text-color overflow-hidden"
							onClick={() => handleAddProduct(product)}>
						
							{product.price}
							
								<FaCartShopping className="absolute text-white/30 text-3xl left-1" /><small className="absolute text-slate-300 text-[8px] top-[6px] right-4">SEK</small>
						</button>
						<img src={product.imgUrl} alt={product.name} className="w-[60%] pt-[40%] mx-auto" />
					</li>
				) : null
			)}
		</ul>
	);
}
