const fs = require('fs');

class Contenedor {
    

    constructor(ruta) {
        this.ruta = ruta;
        this.productos = [];
    };

    async getAll() {

        try {
            const contenido = await fs.promises.readFile(this.ruta,(err,data)=>data);
            return JSON.parse(contenido);

        } catch (error) {
            console.log(error);
        }
    };

    async save(producto){
        try {

            this.productos = await this.getAll();
            producto.id = this.productos.length + 1;
            this.productos.push(producto);
            await fs.promises.writeFile(this.ruta, JSON.stringify(this.productos));
            return producto.id;
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    async getById(id) {
        try {
            const productos = await this.getAll();
            return productos.find( producto => producto.id === id ) || null;
        } catch (error) {
            return null;
        }
    };

    async deleteById(id){
        try {
            if(this.productExist(id)){
                const productos = await this.getAll();
                const newArray = await productos.filter( producto => producto.id !== id);
                await fs.promises.writeFile(this.ruta, JSON.stringify(newArray));
                return true;
            } else{
                return false;
            }
        } catch (error) {
            return null;
        }
    };

    async replaceById(id, newProduct){
        try {
            const productos = await this.getAll();
            let index= productos.findIndex( el => el.id === id);
            await productos.splice( index, 1, newProduct);
            productos[index].id = id;
            await fs.promises.writeFile(this.ruta, JSON.stringify(productos));
            return true;
        } catch (error) {
            return null;
        }
    };


    async deleteAll() {
        await fs.promises.writeFile(this.ruta,"[]");
    };

    async productRandom() {

        const productos = await this.getAll();
        const idRandom =  (min, max) => Math.floor(Math.random() * (max - min)) + min;
        const productoRandom = await this.getById(idRandom(1,productos.length+1));
        return productoRandom;
    };

    async productExist(id) {
        this.productos = await this.getAll();
        return this.productos.some( product => product.id === id);
    }   
}

module.exports = Contenedor;



