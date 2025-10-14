import React from 'react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { dispatch } = useCart();
  return (
    <div className="card">
      <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded" />
      <h3 className="mt-2 font-semibold text-lavender-900">{product.name}</h3>
      <p className="text-gray-600">₹{product.price}</p>
      <p className="text-sm mt-1">Eco Score: <span className="font-medium">{product.ecoScore}</span></p>
      <div className="mt-3 flex items-center justify-between">
        <button onClick={() => dispatch({ type: 'ADD_ITEM', payload: product })} className="btn">Add to Cart</button>
        <button className="px-3 py-1 border rounded text-sm">Details</button>
      </div>
    </div>
  );
}
