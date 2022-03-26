const { response } = require('express');
const Contenedor = require('../src/helpers/contenedor');

const contenedor = new Contenedor('./src/data/productos.json');


const productsGet = async (req, res) => {
    
    const arrayProducts = await contenedor.getAll();
    console.log(arrayProducts);
    res.render('products', {arrayProducts, msg: 'todo bien'});
};

const productGetById = async (req, res) => {
    
    const id = parseInt(req.params.id);
    const product = await contenedor.getById(id);

    product?res.render('home'):res.status(404).send('Producto no encontrado');

};

const productsPost = async (req, res) => {

    // validacion
    const errors = [];
    const { title, price, thumbnail } = req.body;

    if(title.trim() === ''){
        errors.push({mensaje:'El nombre está vacío'});
    };
    
    if(price.trim() === ''){
        errors.push({mensaje:'El precio está vacío'});
    };

    if(thumbnail.trim() === ''){
        errors.push({mensaje:'El thumbnail está vacío'});
    };

    if( errors.length > 0) {
        res.redirect('/');
        console.log('error')
    } else {
        //almacenar
        const newId= await contenedor.save(req.body);
        res.redirect('/productos');
    }
};

const productsPut = async (req, res) => {
    const producto = req.body;
    const id = parseInt(req.params.id);
    const result = await contenedor.replaceById(id, producto)
    console.log(result);
    result?res.json({
        msg:'put API - Se reemplazo el producto',
        producto,
        id,
    }):res.status(404).json({
        error: 'Producto no encontrado'
    });
    
};


const productsDelete = async (req, res) => {

    const id = parseInt(req.params.id);
    const result = await contenedor.deleteById(id);

    result?res.json({
        msg:'delete API - se eliminó el producto',
        id,
    }):res.status(404).json({
        error: 'Producto no encontrado'
    });
};




module.exports = {
    productsGet,
    productGetById,
    productsPost,
    productsPut,
    productsDelete,
}