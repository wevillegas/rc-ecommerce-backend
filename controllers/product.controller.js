// en este archivo voy a manejar el CRUD (create, read, update and delete) de los productos

var Product = require('../schemas/product.schema');

// creo una function la cual se encargará de agregar productos
// el parametro res tiene asosiados eventos para realizar una respuesta, el rep tiene todo lo asociado a la peticion que se esta haciendo 
async function addProduct(req, res) {
    try {
        console.log(req.body)
        if (!req.body.name || !req.body.price || !req.body.stock) {
            return res.status(400).send({
                error: 'Falta un campo obligatorio'
            })
        }

        let newProduct = new Product(req.body);
        console.log(newProduct)
        await newProduct.save()
        res.send({
            productoNuevo: newProduct
        })
    } catch (error) {
        res.status(404).send(error)
    }
};

async function getProducts(req, res) {
    // Cantidad de items por página, acá usamos un operador ternario (if/else) en el que vemos si viene como query param la cantidad deseada por el usuario y sino seteamos un valor por defecto en este caso 3
    const itemsPerPage = req.query.itemsPerPage ? req.query.itemsPerPage : Infinity;

    // Si el valor de req.query.page no viene (undefined) arranca desde el valor 0, ahora si viene un valor y tomando como referencia los indices de array, la segunda página (index 1 en un array "segundo elemento") al multiplicar 1* 5 = 5 entonces salteo los primero elementos.
    const itemsToSkip = req.query.page * 5;

    // const searchParams = req.query;
    //variable que guardará los parametros para realizar la busqueda de los productos
    const searchParams = req.query.name ? {
        // en la variable se guardará el parametro del nombre, para que la busqueda sea no solo con los names que coincidan al 100% (o sea, que tienen el nombre identico al parametro), se usa el regex. Si no pongo nada, me devolvera un objeto vacio y por consiguiente me devolderá todos los documentos
        name: {
            '$regex': req.query.name,
            '$options': 'i'
        }
    } : {}
    // Destructurar array, si se que mi array devuelve una cantidad fija de elementos puedo definir un array del lado derecho en el que por indice inicializo una variable con nombre referida a el valor que tiene el array declarado a la derecha de su mismo index
    // **Equivalente
    // const productosDB = result[0]
    // const productsTotal = result[1]

    // con promise all disparo todas las promesas a la vez, y no se asingan los resultados a la variable hasta que no se completen todas. Si falla una se iria al bloque catch. Esta es una forma de agilizar los pedidos a la BD y que sea mas rapido
    const [productosDB, productsTotal] = await Promise.all([
        Product.find(searchParams)
        .populate('clientId')
        // para ordenar basados en alguna propiedad si color el nombre y el valor 1 (ordenamiento ascendente) y -1 (ordenamiento descendente)
        .sort({
            name: -1
        })
        // skip: Cantidad de documentos que voy a saltear en la búsqueda (a partir del cuál voy a buscar)
        .skip(itemsToSkip)
        // limit: Limite de elementos que voy a traer de la DB por consulta
        .limit(itemsPerPage),
        Product.countDocuments(searchParams)
    ])
    // console.log(result)

    res.send({
        products: productosDB,
        total: productsTotal,
    })
}



async function getProduct(req, res) {
    const productId = req.query.product_id;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).send('No se encuntro el producto que busca')
    return res.status(200).send({
        product: product
    });
}

async function deleteProduct(req, res) {
    const ProductIdDelete = req.query.product_id_delete;
    const productDelete = await Product.findByIdAndDelete(ProductIdDelete);
    if (!productDelete) return res.status(404).send('No se encuntro el producto que desea borrar')

    return res.status(200).send(`El producto ${productDelete.name} ha sido borrado correctamente`);
}

async function updateProduct(req, res) {
    const id = req.params.upd_id;
    // Actualizo la propiedad updatedAt al momento de realizar algun cambio en mi DB
    const updatedAt = new Date();
    // return res.status(200).send('Hola')
    // Asignar a productChangesToApply todo lo que tiene el req.body propiedad por propiedad con el spread operator (...) y además lo que tiene la const updatedAt que al colocarla sola estaría asignando a productChagesToApply updatedAt: updatedAt
    const productChangesToApply = {
        ...req.body,
        updatedAt: updatedAt
    };
    // Otra forma de añadir propiedades a un objeto
    // const otraForma = Object.assign({}, req.body, {updatedAt: updatedAt })
    const updatedProduct = await Product.findByIdAndUpdate(id, productChangesToApply, {
        new: true
    });
    if (!updatedProduct) return res.status(404).send('No se encontró el Producto que desea modificar');
    return res.status(200).send(updatedProduct);
}
module.exports = {
    addProduct,
    getProducts,
    getProduct,
    deleteProduct,
    updateProduct,
}