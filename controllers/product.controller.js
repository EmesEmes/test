import { Product } from "../models/product.model.js"


const saveProduct = async(req, res) => {
  try {
    const product = new Product(req.body)
    await product.save()
    res.status(201).send(product)
  } catch (error) {
    res.status(500).send(error)
  }
}

const getAllProducts = async(req, res) => {
  try {
    const products = await Product.find()
    res.send(products)
  } catch (error) {
    res.status(500).send(error)
  }
}

const getProductsByFilters = async(req, res) => {
  try {
    let queryObject = {...req.query}
    const withOutFields = ["sort", "limit", "page", "fields"]
    withOutFields.forEach(field => delete queryObject[field])
    let queryString = JSON.stringify(queryObject)
    queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)
    queryObject = JSON.parse(queryString)
    console.log(queryObject)

    let selected = ""
    if(req.query.fields) {
      selected = req.query.fields.split(",").join(" ")
    }


    let sort =""
    if(req.query.sort) {
       sort = req.query.sort.split(",").join(" ")
    }

    let limit = req.query.limit || 10
    let page = req.query.page  || 1
    let skip = (page - 1) * limit



    const products = await Product.find(queryObject).select(selected).sort(sort).skip(skip).limit(limit)
    res.send(products)
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
}

const statistics = async(req, res) => {
  const statistics = await Product.aggregate([
    {
      $match: {price: {$gte: 10}}
    },
    {
      $group: {
        _id: "$category",
        count: {$sum: 1},
        averagePrice: {$avg: "$price"},
        maxPrice: {$max: "$price"},
        minPrice: {$min: "$price"}
      }
    },
    {
      $sort: {averagePrice: 1}
    }
  ])
  res.send(
    statistics
  )
}

const getProductById = async(req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if(!product){
      return res.status(404).send({message: "Producto no encontrado"})
    }
    res.send(product)
  } catch (error) {
    res.status(500).send(error)
  }
}

const updateProduct = async(req, res) => {
  
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
    if(!product){
      return res.status(404).send({message: "Producto no encontrado"})
    }
    res.send(product)
  } catch (error) {
    res.status(500).send(error)
  }
}

const deleteProduct = async(req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
    if(!product){
      return res.status(404).send({message: "Producto no encontrado"})
    }
    res.send("Producto eliminado")
  } catch (error) {
    res.status(500).send(error)
  }
}

const patchProduct = async(req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
    res.send(product)
  } catch (error) {
    res.status
  }
}

export {
  saveProduct,
  getAllProducts,
  getProductsByFilters,
  statistics,
  getProductById,
  updateProduct,
  deleteProduct,
  patchProduct,
}