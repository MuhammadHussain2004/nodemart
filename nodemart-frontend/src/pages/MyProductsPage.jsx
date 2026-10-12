import { useEffect, useState } from "react";
import {Link} from "react-router-dom"
function MyProductsPage() {
  const [error, setError] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState('');

  useEffect(() => {
    const fetchMyProducts = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please log in first.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/products/my-products`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            },
          },
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Could not load your products");
        }

        setProducts(data);
      } catch (error) {
        setError(error.message);
      }
      finally{
        setLoading(false)
      }
    };
    fetchMyProducts();
  }, []);
 


  const handleDelete = async (productId) => {
    const token = localStorage.getItem('token');

     if(!token){
        setError('Please log in before deleting a product.');
        return;
     }

     const shouldDelete = window.confirm('Are you sure you want to delete this product?');

     if(!shouldDelete){
        return;
     }

     setError('');
     setDeletingId(productId);
 

     try{
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/products/${productId}`,
            {
                method: 'DELETE',
                headers: {
                    Authorization : `Bearer ${token}`
                },
            }
        );

        const data = await response.json();

        if(!response.ok){
            throw new Error(data.message || 'Product could not be deleted');
        }

        setProducts( (currentProducts)=>(
              currentProducts.filter((product)=> product._id !== productId)
        ));
     }
     catch(error){
         setError(error.message);
     }
     finally{
        setDeletingId('')
     }

  }

   if(loading){
    return <main><p>Loading your products...</p></main>
   }

   if(error){
    return <main><p>{error}</p></main>
   }



  return (
    <main>
      <h1>My products</h1>

      {products.length === 0 ? (
        <p>You have not created any products yet.</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product._id}>
              {product.image && (
  <img
    className="product-image"
    src={
      product.image.startsWith("http")
        ? product.image
        : `${import.meta.env.VITE_API_URL}${product.image}`
    }
    alt={product.title}
  />
)}
              <strong> {product.title}</strong> - Rs. {product.price}
              <Link to={`/products/${product._id}/edit`} >Edit</Link>
              <button
              type="button"
              onClick={()=> handleDelete(product._id)}
              disabled={deletingId === product._id}
              >
               {deletingId === product._id ? 'Deleting...' : 'Delete'}
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

export default MyProductsPage;
