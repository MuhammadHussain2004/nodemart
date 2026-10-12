import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function EditProductPage() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    price: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [message , setMessage]= useState('');
  const [isSubmitting, setIsSubmitting]= useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/products/${id}`,
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Product could not be loaded");
        }

        setFormData({
          title: data.title,
          price: String(data.price),
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value
    }));
  };

 const handleSubmit = async (event)=>{
    event.preventDefault();
          
  setMessage('');
  setError('');
  setIsSubmitting(true);

    const token= localStorage.getItem('token');
    if(!token){
        setError('Please log in before updating a product');
        setIsSubmitting(false);
        return;
    }
try{
    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/products/${id}`,
        {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                Authorization : `Bearer ${token}`
            },
            body: JSON.stringify({ 
                title: formData.title,
                price: Number(formData.price)
            })
        }
    )

    const data= await response.json();

    if(!response.ok){
        throw new Error(data.message || ' Product could not be updated');
    }
    
    setMessage('Product updated successfully.');
 }
 catch(error){
    setError(error.message);
 }
 finally{
    setIsSubmitting(false);
 }

 }


  if (loading) {
    return (
      <main>
        <p>Loading product...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main>
        <p>{error}</p>
      </main>
    );
  }

  return (
    <main>
      <h1>Edit Product</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Product Title
          <input
            type="text"
            name="title"
            value={formData.title}
            placeholder="Product title"
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Price
          <input
            type="number"
            name="price"
            value={formData.price}
            placeholder="Product price"
            onChange={handleChange}
            min="0"
            required
          />
        </label>

        <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving  Changes...' : 'Save Changes'}
        </button>
      </form>

      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
    </main>
  );
}

export default EditProductPage;
