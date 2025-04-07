import express from 'express'
import {deleteProduct, getAllProducts, getProductById, getProductsByFilters, patchProduct, saveProduct, statistics, updateProduct, } from '../controllers/product.controller.js'

const router = express.Router()

router.get('/', getAllProducts)
router.post('/', saveProduct)
router.put('/:id', updateProduct)
router.patch('/:id', patchProduct)
router.delete('/:id', deleteProduct)
router.get('/:id', getProductById)
router.get('/by-filters', getProductsByFilters)
router.get('/statistics', statistics)

export default router