// FileSystem
import fs from 'fs'


//Productos
const products = [
    {
        id: 1,
        nombre: "Camiseta de algodón",
        precio: 19.99,
        descripcion: "Camiseta básica de algodón en varios colores",
        disponible: true,
    },
    {
        id: 2,
        nombre: "Zapatos deportivos",
        precio: 49.99,
        descripcion: "Zapatos deportivos para correr",
        disponible: true,
    },
    {
        id: 3,
        nombre: "Portátil Lenovo",
        precio: 699.99,
        descripcion: "Portátil Lenovo de 15 pulgadas con procesador Intel",
        disponible: true,
    },
    {
        id: 4,
        nombre: "Televisor LED 4K",
        precio: 599.99,
        descripcion: "Televisor LED de 55 pulgadas con resolución 4K",
        disponible: false,
    },
    {
        id: 5,
        nombre: "Silla de oficina",
        precio: 129.99,
        descripcion: "Silla de oficina ergonómica con soporte lumbar",
        disponible: true,
    },
    {
        id: 6,
        nombre: "Teléfono inteligente Samsung",
        precio: 399.99,
        descripcion: "Teléfono inteligente Samsung Galaxy S21",
        disponible: true,
    },
    {
        id: 7,
        nombre: "Tableta Apple iPad",
        precio: 329.99,
        descripcion: "Tableta Apple iPad de 10 pulgadas",
        disponible: true,
    },
    {
        id: 8,
        nombre: "Auriculares inalámbricos",
        precio: 59.99,
        descripcion: "Auriculares inalámbricos con cancelación de ruido",
        disponible: false,
    },
    {
        id: 9,
        nombre: "Cámara digital Canon",
        precio: 499.99,
        descripcion: "Cámara digital Canon EOS Rebel T7i",
        disponible: true,
    },
    {
        id: 10,
        nombre: "Bicicleta de montaña",
        precio: 349.99,
        descripcion: "Bicicleta de montaña con suspensión",
        disponible: false,
    },
    {
        id: 11,
        nombre: "Libro: El Gran Gatsby",
        precio: 9.99,
        descripcion: "Novela clásica de F. Scott Fitzgerald",
        disponible: true,
    },
    {
        id: 12,
        nombre: "Impresora multifunción HP",
        precio: 129.99,
        descripcion: "Impresora multifunción HP DeskJet",
        disponible: true,
    },
    {
        id: 13,
        nombre: "Mesa de comedor",
        precio: 249.99,
        descripcion: "Mesa de comedor rectangular de madera",
        disponible: false,
    },
    {
        id: 14,
        nombre: "Cafetera Nespresso",
        precio: 99.99,
        descripcion: "Cafetera Nespresso con sistema de cápsulas",
        disponible: true,
    },
    {
        id: 15,
        nombre: "Juego de utensilios de cocina",
        precio: 39.99,
        descripcion: "Juego de utensilios de cocina de acero inoxidable",
        disponible: true,
    },
    {
        id: 16,
        nombre: "Mochila para portátil",
        precio: 29.99,
        descripcion: "Mochila resistente para portátil de 15 pulgadas",
        disponible: true,
    },
    {
        id: 17,
        nombre: "Juego de mesa: Ajedrez",
        precio: 19.99,
        descripcion: "Tablero y piezas de ajedrez clásico",
        disponible: true,
    },
    {
        id: 18,
        nombre: "Lámpara de pie",
        precio: 79.99,
        descripcion: "Lámpara de pie con regulador de intensidad",
        disponible: false,
    },
    {
        id: 19,
        nombre: "Cepillo eléctrico para dientes",
        precio: 49.99,
        descripcion: "Cepillo eléctrico recargable con temporizador",
        disponible: true,
    },
    {
        id: 20,
        nombre: "Mesa de ping pong",
        precio: 299.99,
        descripcion: "Mesa de ping pong plegable con red",
        disponible: true,
    },
];


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
        return(JSON.parse(productData));
    }
    
    getProductById(id) {
        const idNumber = parseInt(id)
        const productData = fs.readFileSync(this.path, 'utf8');
        this.products = JSON.parse(productData);
        const product = this.products.find(product => product.id === idNumber);
        if (product) {
            return product
        } else {
            return "Producto no encontrado"
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

export default ProductManager


