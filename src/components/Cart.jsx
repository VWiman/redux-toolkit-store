import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { removedProduct } from "../features/cart/cartSlice";
import { X } from "lucide-react";
import { FaCoins } from "react-icons/fa6";


export default function Cart() {
	const dispatch = useDispatch();
	const [total, setTotal] = useState(0);
	const [deletingProduct, setDeletingProduct] = useState(null);
	const cart = useSelector((state) => state.cart);
	console.log(cart);

	useEffect(() => {
		if (cart.length !== 0) {
			cart.forEach((product) => {
				const newTotal = total + product.price;
				setTotal(newTotal);
			});
		}
	}, [cart]);

	useEffect(() => {
		if (deletingProduct !== null) {
			const newTotal = total - deletingProduct.price;
			setTotal(newTotal);
			setDeletingProduct(null);
		}
	}, [deletingProduct]);

	function handleRemove(product) {
		dispatch(removedProduct(product.id));
		setDeletingProduct(product);
	}

	return (
		<div className="flex flex-col bg-stone-300 col-span-3 md:col-span-1 mb-auto p-4 shadow-lg text-xs lg:text-sm order-1 md:order-2">
			<h2 className=" text-xl font-bold">Cart</h2>
			<hr className="my-2 text-stone-400" />
			<ul className="flex flex-col gap-2">
				{cart.map((product) => (
					<li
						key={product.id}
						className="bg-gray-500/10 p-1 shadow-sm relative overflow-hidden hover:shadow-md select-none">
						<dl className="flex flex-row gap-1 md:gap-2 capitalize lg:justify-between font-semibold">
							<dd className="uppercase text-xs lg:text-sm">{product.name}</dd>
							<dd className="absolute lg:mr-auto text-white/25 uppercase text-3xl top-[2px] right-5 select-none">
								{product.type}
							</dd>
							<dd className="ml-auto">{product.price}:-</dd>
							<button onClick={() => handleRemove(product)}>
								<X size={"16px"} strokeWidth={1.25} className="hover:border hover:rounded-full border-black" />
							</button>
						</dl>
					</li>
				))}
			</ul>
			<hr className="my-2 text-stone-400" />
			<div className="flex flex-row w-full justify-between">
				<p className="uppercase font-semibold">total</p>
				<p className="uppercase font-semibold">{total}:-</p>
			</div>
			<button className="flex flex-row bg-black text-white hover:bg-gray-800 text-sm font-bold rounded-3xl px-4 py-2 uppercase mt-10 justify-center items-center gap-1">
				checkout
				<FaCoins className="text-white" />
			</button>
		</div>
	);
}
