import {useState, useRef} from "react";

function CreateProductPage() {
  const [formData, setFormData] = useState({
    title: "",
    price: ""
  });
  const [image , setImage]= useState (null);
  const imageInputRef = useRef(null);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmittng, setIsSubmitting] = useState(false);

  const handleChange = async (event) => {
    const { name, value } = event.target;
    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");
    setError("");
    setIsSubmitting(true);

    const token = localStorage.getItem("token");

    if (!token) {
      setError("Please log in before creating a product");
      setIsSubmitting(false);
      return;
    }
 
    try {
      const productData = new FormData();

      productData.append('title', formData.title);
      productData.append('price', formData.price);

      if(image){
        productData.append('image', image);
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/products`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: productData,
      });

      const data = await  response.json();

      if (!response.ok) {
        throw new Error(data.message || "Product could not be created");
      }

      setMessage("Product created successfully");
      setFormData({
        title: "",
        price: "",
      });
      setImage(null);

      if(imageInputRef.current){
        imageInputRef.current.value= "";
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main>
      <h1>Add Product</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Product Title
          <input
            type="text"
            name="title"
            value={formData.title}
            placeholder="Example: Wireless Mouse"
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
            placeholder="Example: 2500"
            min="0"
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Product Image
          <input 
          ref={imageInputRef}
          type="file"
          accept="image/*"
          onChange={(event)=> setImage(event.target.files[0])}
          />

        </label>

        <button type="submit" disabled={isSubmittng}>
          {isSubmittng ? "Adding product..." : "Add Product"}
        </button>
      </form>

      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
    </main>
  );
}

export default CreateProductPage;
