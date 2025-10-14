import React, { useState, useEffect, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import FilterBar from '../components/FilterBar';
import ChatBox from "../components/ChatBox";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sort, setSort] = useState('');
  const [priceRange, setPriceRange] = useState(5000);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error("Unexpected response:", data);
          setError("Unexpected response from server");
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching products:", err);
        setError("Failed to load products");
        setLoading(false);
      });
  }, []);

  const categories = useMemo(() => {
    return Array.isArray(products)
      ? [...new Set(products.map(p => p.category))]
      : [];
  }, [products]);

  let filtered = Array.isArray(products) ? [...products] : [];
  filtered = filtered
    .filter(p => (selectedCategory ? p.category === selectedCategory : true))
    .filter(p => p.price <= priceRange)
    .filter(p => p.name.toLowerCase().includes(query.toLowerCase()));

  if (sort === 'price-asc') filtered = filtered.sort((a, b) => a.price - b.price);
  if (sort === 'price-desc') filtered = filtered.sort((a, b) => b.price - a.price);

  if (loading) return <p className="text-center mt-10">Loading products...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div>
      <div className="mb-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          className="w-full p-3 rounded border"
        />
      </div>

      <FilterBar
        categories={categories}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
        sort={sort}
        onSort={setSort}
        priceRange={priceRange}
        onPriceRange={setPriceRange}
      />

      <div className="grid md:grid-cols-3 gap-4">
        {filtered.length > 0 ? (
          filtered.map(p => <ProductCard key={p._id} product={p} />)
        ) : (
          <p className="col-span-3 text-center text-gray-500">No products found</p>
        )}
      </div>

      {/* 🔌 Chatbox */}
      <div className="mt-10">
        <ChatBox />
      </div>
    </div>
  );
}
