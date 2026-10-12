import { useEffect, useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import MyProductsPage from "./pages/MyProductsPage";
import CreateProductPage from "./pages/CreateProductPage";
import ProtectedRoute from "./components/ProtectedRoute";
import EditProductPage from "./pages/EditProductPage";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [activeSearch, setActiveSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [sort, setSort] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      const queryParams = new URLSearchParams({
        page: String(page),
        limit: "10",
      });

      if (activeSearch) {
        queryParams.set("search", activeSearch);
      }

      if (sort) {
        queryParams.set("sort", sort);
      }
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/products?${queryParams.toString()}`,
        );

        if (!response.ok) {
          throw new Error("Products could not be loaded");
        }

        const data = await response.json();

        setProducts(data.products);
        setTotalPages(data.totalPages);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [activeSearch, page, sort]);

  if (loading) {
    return (
      <main>
        <p>Loading products...</p>
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

  const handleSearch = (event) => {
    event.preventDefault();
    setPage(1);
    setActiveSearch(searchInput.trim());
  };

  return (
    <main>
      <h1>Products</h1>
      <form onSubmit={handleSearch}>
        <input
          type="search"
          value={searchInput}
          placeholder="Search products by title"
          onChange={(event) => setSearchInput(event.target.value)}
        />

        <label>
          Sort by
          <select
            value={sort}
            onChange={(event) => {
              setSort(event.target.value);
              setPage(1);
            }}
          >
            <option value="">Newest</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
        </label>

        <button type="submit">Search</button>
      </form>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <ul>
          {products.map((product) => {
            return (
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
                <strong>{product.title}</strong> - Rs. {product.price}
              </li>
            );
          })}
        </ul>
      )}
      <button
        type="button"
        onClick={() => setPage((currentPage) => currentPage - 1)}
        disabled={page === 1}
      >
        {" "}
        Previous{" "}
      </button>
      <span>
        Page {page} of {totalPages}{" "}
      </span>
      <button
        type="button"
        onClick={() => setPage((currentPage) => currentPage + 1)}
        disabled={page >= totalPages}
      >
        {" "}
        Next{" "}
      </button>
    </main>
  );
}

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(localStorage.getItem("token")),
  );

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <>
      <nav>
        <Link to="/">NodeMart</Link>
        {isLoggedIn ? (
          <>
            <Link to="/my-products">My Products</Link>
            <Link to="/create-product">Add Product</Link>
            <button type="button" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route
          path="/login"
          element={<LoginPage onLogin={() => setIsLoggedIn(true)} />}
        />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/my-products"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <MyProductsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-product"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <CreateProductPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products/:id/edit"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <EditProductPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
