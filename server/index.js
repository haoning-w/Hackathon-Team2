import express from "express";
import pkg from "@prisma/client";
import morgan from "morgan";
import cors from "cors";

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

const { PrismaClient } = pkg;
const prisma = new PrismaClient();


// 1. find all suppliers
app.get("/suppliers", async (req, res) => {
    const allSuppliers = await prisma.supplier.findMany({
        include: {
            // Include the project information
            products: true,
        }
    });

    res.json(allSuppliers);
});




// 2. create a new supplier (with at least one product)
// app.post("/supplier", async (req, res) => {
//     const { userType, email, organizationName, address, products } = req.body;

//     try {
//         // Check if a supplier with the given email already exists
//         let supplier = await prisma.supplier.findUnique({
//             where: { email: email }
//         });

//         if (supplier) {
//             // Supplier exists, so update their product list
//             await Promise.all(products.map(async product => {
//                 await prisma.supplierProduct.create({
//                     data: {
//                         ...product,
//                         supplierId: supplier.id
//                     }
//                 });
//             }));
//             supplier = await prisma.supplier.findUnique({ 
//                 where: { email: email },
//                 include: { products: true }
//             });
//         } else {
//             // Supplier does not exist, create a new one
//             supplier = await prisma.supplier.create({
//                 data: {
//                     userType,
//                     email,
//                     organizationName,
//                     address,
//                     products: {
//                         create: products
//                     }
//                 },
//                 include: {
//                     products: true
//                 }
//             });
//         }

//         res.status(201).json(supplier);
//     } catch (error) {
//         res.status(500).send("Error processing supplier: " + error.message);
//     }
// });

app.post("/supplier", async (req, res) => {
    const { email, organizationName, address, products } = req.body;

    try {
        let supplier = await prisma.supplier.findUnique({
            where: { email: email }
        });

        if (supplier) {
            // Supplier exists, so update their product list
            await Promise.all(products.map(async product => {
                await prisma.supplierProduct.create({
                    data: {
                        ...product,
                        historicalQuantity: product.quantity, // Set historicalQuantity to the initial quantity
                        supplierId: supplier.id
                    }
                });
            }));
            supplier = await prisma.supplier.findUnique({ 
                where: { email: email },
                include: { products: true }
            });
        } else {
            // Supplier does not exist, create a new one with products
            supplier = await prisma.supplier.create({
                data: {
                    email,
                    organizationName,
                    address,
                    products: {
                        create: products.map(product => ({
                            ...product,
                            historicalQuantity: product.quantity // Set historicalQuantity to the initial quantity
                        }))
                    }
                },
                include: {
                    products: true
                }
            });
        }

        res.status(201).json(supplier);
    } catch (error) {
        res.status(500).send("Error processing supplier: " + error.message);
    }
});


// 3. find all demanders
app.get("/demanders", async (req, res) => {
    const allDemanders = await prisma.demander.findMany({});
    res.json(allDemanders);
});

// 4. create a new demander (with at least one product)
app.post("/demander", async (req, res) => {
    const { email, organizationName, address, products } = req.body;

    try {
        // Check if a supplier with the given email already exists
        let demander = await prisma.demander.findUnique({
            where: { email: email }
        });

        if (demander) {
            // Supplier exists, so update their product list
            await Promise.all(products.map(async product => {
                await prisma.demanderProduct.create({
                    data: {
                        ...product,
                        historicalQuantity: product.quantity, 
                        demanderId: demander.id
                    }
                });
            }));
            demander = await prisma.demander.findUnique({ 
                where: { email: email },
                include: { products: true }
            });
        } else {
            // demander does not exist, create a new one
            demander = await prisma.demander.create({
                data: {
                    email,
                    organizationName,
                    address,
                    products: {
                        create: products.map(product => ({
                            ...product,
                            historicalQuantity: product.quantity // Set historicalQuantity to the initial quantity
                        }))
                    }
                },
                include: {
                    products: true
                }
            });
        }

        res.status(201).json(demander);
    } catch (error) {
        res.status(500).send("Error processing supplier: " + error.message);
    }
});





// 4. find the supplier by email
app.get("/supplier/:email", async (req, res) => {
    const email = req.params.email;
    const supplier = await prisma.supplier.findUnique({
        where: {
            email: email
        },
        include: {
            // Include the project information
            products: true,
        }
    });
    res.json(supplier);
});

// 5. find the demander by email
app.get("/demander/:email", async (req, res) => {
    const email = req.params.email;
    const demander = await prisma.demander.findUnique({
        where: {
            email: email
        },
        include: {
            // Include the project information
            products: true,
        }
    });
    res.json(demander);
});

// 6. get supplierProduct by id
app.get("/sproduct/:id", async (req, res) => {
    const supplierProductID = parseInt(req.params.id);
  
    const post = await prisma.supplierProduct.findUnique({
      where: {
        id: supplierProductID,
      },
      include: {
        supplier: true,
      },
    });
  
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ error: 'supplierProduct not found' });
    }
  });

// 7. update the quantity of supplierProduct
app.put("/sproduct/:id", async (req, res) => {
    const supplierProductId = parseInt(req.params.id);
    const { newQuantity } = req.body;

    // console.log(newQuantity);
    // 这里测试的时候用
    // {
    // "newQuantity": 10
    // }


    try {
        const updatedProduct = await prisma.supplierProduct.update({
            where: {
                id: supplierProductId,
            },
            data: {
                quantity: newQuantity
            }
        });

        if (updatedProduct) {
            res.json(updatedProduct);
        } else {
            res.status(404).json({ error: 'SupplierProduct not found' });
        }
    } catch (error) {
        res.status(500).send("Error updating SupplierProduct: " + error.message);
    }
});


// 8. update the quantity of demanderProduct
app.put("/dproduct/:id", async (req, res) => {
    const demanderProduct = parseInt(req.params.id);
    const { newQuantity } = req.body;

    // console.log(newQuantity);
    // 这里测试的时候用
    // {
    // "newQuantity": 10
    // }


    try {
        const updatedProduct = await prisma.demanderProduct.update({
            where: {
                id: demanderProduct,
            },
            data: {
                quantity: newQuantity
            }
        });

        if (updatedProduct) {
            res.json(updatedProduct);
        } else {
            res.status(404).json({ error: 'DemanderProduct not found' });
        }
    } catch (error) {
        res.status(500).send("Error updating SupplierProduct: " + error.message);
    }
});




// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT} 🎉 🚀`);
});
  