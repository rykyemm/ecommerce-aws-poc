// Tests pour l'endpoint GET /api/products
pm.test("Get All Products - Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Get All Products - Response has data array", function () {
    const response = pm.response.json();
    pm.expect(response).to.have.property('data');
    pm.expect(response.data).to.be.an('array');
});

// Tests pour l'endpoint GET /api/products/{id}
pm.test("Get Single Product - Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Get Single Product - Response has correct product data", function () {
    const response = pm.response.json();
    pm.expect(response).to.have.property('data');
    pm.expect(response.data).to.have.property('id');
    pm.expect(response.data).to.have.property('name');
    pm.expect(response.data).to.have.property('description');
    pm.expect(response.data).to.have.property('price');
    pm.expect(response.data).to.have.property('stock_quantity');
    pm.expect(response.data).to.have.property('category_id');
});

// Tests pour l'endpoint POST /api/products
pm.test("Create Product - Status code is 201", function () {
    pm.response.to.have.status(201);
});

pm.test("Create Product - Response has created product ID", function () {
    const response = pm.response.json();
    pm.expect(response).to.have.property('data');
    pm.expect(response.data).to.have.property('id');
    pm.expect(response.data.id).to.be.a('number');
});

// Tests pour l'endpoint PUT /api/products/{id}
pm.test("Update Product - Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Update Product - Response has success message", function () {
    const response = pm.response.json();
    pm.expect(response).to.have.property('data');
    pm.expect(response.data).to.have.property('message');
    pm.expect(response.data.message).to.equal('Product updated successfully');
});

// Tests pour l'endpoint DELETE /api/products/{id}
pm.test("Delete Product - Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Delete Product - Response has success message", function () {
    const response = pm.response.json();
    pm.expect(response).to.have.property('data');
    pm.expect(response.data).to.have.property('message');
    pm.expect(response.data.message).to.equal('Product deleted successfully');
});

// Tests de validation
pm.test("Create Product - Missing required fields", function () {
    const response = pm.response.json();
    pm.expect(response).to.have.property('error');
    pm.expect(response.error).to.include('Missing required fields');
});

pm.test("Update Product - Invalid ID", function () {
    pm.response.to.have.status(404);
    const response = pm.response.json();
    pm.expect(response).to.have.property('error');
    pm.expect(response.error).to.equal('Product not found');
});

pm.test("Delete Product - Invalid ID", function () {
    pm.response.to.have.status(404);
    const response = pm.response.json();
    pm.expect(response).to.have.property('error');
    pm.expect(response.error).to.equal('Product not found');
}); 