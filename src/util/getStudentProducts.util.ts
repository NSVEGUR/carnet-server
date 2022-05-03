


export default (rollNumber: string, products: any[]) => {
	let myProducts: any[] = [];
	products.forEach(product => {
		if (product.lendHistory.rollNumber === rollNumber)
			myProducts.push(product);
	});
	return myProducts;
}

