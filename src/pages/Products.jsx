import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  addToFavorites,
  removeFromFavorites,
  increaseQuantity,
  decreaseQuantity,
} from "../Store/Slice/ProductSlice";

export default function Products() {
  const dispatch = useDispatch();
  const { products, favorites, loading, error } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const isFavorite = (id) => favorites.find((item) => item.id === id);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>All Products</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "20px" }}>
        {products.map((product) => (
          <div key={product.id} style={{ border: "1px solid #ccc", padding: "15px", borderRadius: "10px" }}>
            <img src={product.image} alt={product.title} style={{ width: "100%", height: "200px", objectFit: "contain" }} />
            <h3>{product.title}</h3>
            <h4>${product.price}</h4>
            {isFavorite(product.id) ? (
              <button onClick={() => dispatch(removeFromFavorites(product.id))}>
                Remove Favorite
              </button>
            ) : (
              <button onClick={() => dispatch(addToFavorites(product))}>
                Add Favorite
              </button>
            )}
          </div>
        ))}
      </div>

      <hr style={{ margin: "40px 0" }} />

      <h1>Favorite Products</h1>
      {favorites.length === 0 ? (
        <h3>No Favorite Products</h3>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "20px" }}>
          {favorites.map((product) => (
            <div key={product.id} style={{ border: "1px solid red", padding: "15px", borderRadius: "10px" }}>
              <img src={product.image} alt={product.title} style={{ width: "100%", height: "200px", objectFit: "contain" }} />
              <h3>{product.title}</h3>
              <h4>${product.price}</h4>

              {/* ✅ Quantity Controls */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px", margin: "10px 0" }}>
                <button onClick={() => dispatch(decreaseQuantity(product.id))}>-</button>
                <span style={{ fontSize: "18px", fontWeight: "bold" }}>{product.quantity}</span>
                <button onClick={() => dispatch(increaseQuantity(product.id))}>+</button>
              </div>

              <button onClick={() => dispatch(removeFromFavorites(product.id))}>
                Remove Favorite
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}