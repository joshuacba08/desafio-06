const { Router } = require('express');
const { productsGet, productsPut, productsPost, productsDelete, productGetById } = require('../controllers/products.controllers');

const router = Router();

router.get('/', productsGet);

router.get('/:id', productGetById)

router.post('/', productsPost);

router.put('/:id', productsPut);

router.delete('/:id', productsDelete);

module.exports = router;