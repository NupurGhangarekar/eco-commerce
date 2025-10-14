import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { state } = useCart();
  const count = state.cart.reduce((s, i) => s + i.qty, 0);
  return (
    <nav className="bg-lavender-200 border-b border-lavender-300">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link to="/" className="text-lavender-900 font-bold text-xl">EcoMart</Link>
        <div className="flex-1 mx-4">
          <input placeholder="Search products..." className="w-full max-w-md px-3 py-2 rounded-lg border" />
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/contact" className="text-lavender-800">Contact</Link>
          <Link to="/cart" className="relative">
            <span className="btn">Cart</span>
            {count > 0 && <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 text-xs">{count}</span>}
          </Link>
            <Link to="/login" className="text-lavender-800">Login</Link> {/* 👈 Add this */}
            <Link to="/signup" className="text-lavender-800">Sign Up</Link>



        </div>
      </div>
    </nav>
  );
}
