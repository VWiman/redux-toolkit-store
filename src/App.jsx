
import Cart from "./components/Cart";
import Header from "./components/Header";
import Products from "./components/products";

function App() {

  return (
	  <main className="bg-gray-200">
		  <Header />
			<div className="grid grid-flow-row md:grid-cols-4 p-10 gap-4">
				<Products />
				<Cart />
			</div>
		</main>
	);
}

export default App;
