import products from '/products'

// FileSystem
const fs = require('fs');

// Clase ProductManager
class ProductManager {
    constructor(path) {
        this.path = path;
        this.products = products;
        this.roductIdCounter = 1; // Contador para generar ID
    }
    
    // Método para agregar producto
    addProduct(title, description, price, thumbnail, code, stock) {
        // Validar que todos los campos requeridos estén presentes
        if (!title || !description || !price || !thumbnail || !code || stock === undefined) {
            console.error('Todos los campos son obligatorios.');
            return;
        }
    
        // Validar que el campo "code" no se repita
        if (this.products.some(product => product.code === code)) {
            console.error('Ya existe un producto con el mismo código.');
            return;
        }
    
        const product = {
            id: this.productIdCounter++, // Generar un nuevo ID
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        };
        this.products.push(product);
        const productData = JSON.stringify(this.products, null, 2);
        fs.writeFileSync(this.path, productData);
    }
    
    getProducts() {
        const productData = fs.readFileSync(this.path, 'utf8');
        console.log(JSON.parse(productData));
    }
    
    getProductById(id) {
        const productData = fs.readFileSync(this.path, 'utf8');
        this.products = JSON.parse(productData);
        const product = this.products.find(product => product.id === id);
        if (product) {
            console.log(product)
        } else {
            console.error('Not found');
        }
    }
    
    updateProduct(id, updatedProduct){
        const productToUpdate = this.getProductById(id)
        if(!productToUpdate) {
            console.log("No existe este producto")
            return
        }
        Object.assign(productToUpdate, updateProduct)
        const productData = JSON.stringify(this.products, null, 2);
        fs.writeFileSync(this.path, productData);
        console.log('Producto actualizado con éxito.');
    
    }
    
    deleteProduct(id) {
        const productToDelete = this.getProductById(id)
        if(!productToDelete){
            console.log("No existe este producto")
            return
        }
        const deleteIndex = this.products.indexOf(productToDelete)
        this.products.splice(deleteIndex, 1)
        const productData = JSON.stringify(this.products, null, 2);
        fs.writeFileSync(this.path, productData);
        console.log('Producto eliminado con éxito.');
    }
}




