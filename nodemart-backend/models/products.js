const fs= require('fs/promises');
const  path= require('path');

const filePath= path.join(process.cwd(), 'data', 'products.json');

const readProducts = async ()=>{
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
};

const writeProducts = async (products)=>{
   await fs.writeFile(filePath, JSON.stringify(products, null, 2));
};



const  getAllProducts = async ()=> {
    return await readProducts();
}


const getProductsByID = async (id)=>{
    const products= await readProducts();
    return products.find((p)=> p.id === Number(id));
};


const createProduct= async (Data)=>{
    const products= await readProducts();
    const newProducts = {id: Date.now(), title: Data.title, price: Data.price};
    await writeProducts([...products, newProducts]);
    return newProducts;
};


const updateProducts = async (id,data)=>{
   const products = await readProducts();
   const index= products.findIndex((p)=>p.id=== Number(id));
   if (index===-1) return null;
   const {title, price}= data;
   products[index]= {...products[index], ...(title !== undefined && {title}), ...(price !== undefined && {price})};
   await writeProducts(products);
   return products[index];
};


const deleteProducts = async (id)=>{
    const products = await readProducts();
    const filtered= products.filter((p)=> p.id !== Number(id));
    if(filtered.length===products.length) return false;
    await writeProducts(filtered);
    return true;
}


module.exports= {readProducts, createProduct, getAllProducts, getProductsByID, writeProducts, updateProducts, deleteProducts};
