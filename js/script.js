const renderData = () => {
	const dataList = menuItems.map((item) => {
		return `
			<div class="food" onclick="pushProduct(${item.id})">
				<img src="${item.img}" alt="${item.title}" />
				<h1>${item.title}</h1>
				<p>${item.price}</p>
			</div>
		`;
	});
	const getHtml = document.getElementById("menuItems");
	getHtml.innerHTML = dataList.join("");
};

const renderOrder = () => {
	const dataList = orderBasket.map((item, index) => {
		return `
			<div class="product">
				<h5>${item.title}</h5>
				<p>count: ${item.count}</p>
				<p>price: ${item.price}</p>
				<button onclick="deleteProduct(${item.id}, ${index})">delete</button>
			</div>
		`;
	});
	const getHtml = document.getElementById("orderList");
	getHtml.innerHTML = dataList.join("");
};

const renderTotalOrder = () => {
	let totalQuantity = 0;
	let totalPrice = 0;

	orderBasket.map((item) => {
		totalQuantity += item.count;
		totalPrice += item.price;
	});

	const dataList = [
		`
			<div class="total">
				<h1>You have ${totalQuantity} items in the basket.</h1>
				<h2>Sum: ${totalPrice} som</h2>
				${orderBasket.length === 0 ? "<h3>orders list empty</h3>" : ""}
			</div>
		`,
	];
	const getHtml = document.getElementById("totalOrder");
	getHtml.innerHTML = dataList.join("");
};

const pushProduct = (id) => {
	const existingProduct = orderBasket.find((item) => item.id === id);

	if (existingProduct) {
		const newData = menuItems.find((item) => item.id === id);
		existingProduct.count += 1;
		existingProduct.price += newData.price;
	} else {
		const newData = menuItems.find((item) => item.id === id);
		const newProduct = { ...newData, count: 1 };
		orderBasket.push(newProduct);
	}

	renderOrder();
	renderTotalOrder();
};

const deleteProduct = (id, index) => {
	const deletedProduct = orderBasket[index];

	if (deletedProduct.count > 1) {
		const newData = menuItems.find((item) => item.id === id);
		deletedProduct.count -= 1;
		deletedProduct.price -= newData.price;
	} else {
		orderBasket.splice(index, 1);
	}

	renderOrder();
	renderTotalOrder();
};

renderData();
renderOrder();
renderTotalOrder();
