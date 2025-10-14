import React from 'react';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { state, dispatch } = useCart();
  const total = state.cart.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
      {state.cart.length === 0 ? <p>Your cart is empty</p> : (
        <div className="space-y-4">
          {state.cart.map(item => (
            <div key={item.id} className="flex items-center bg-white rounded p-3">
              <img src={item.image} className="w-20 h-20 object-cover rounded" />
              <div className="ml-4 flex-1">
                <h3 className="font-medium">{item.name}</h3>
                <p>₹{item.price} x {item.qty}</p>
                <div className="mt-2">
                  <button onClick={()=> dispatch({type:'UPDATE_QTY', payload:{id:item.id, qty: item.qty - 1}})} disabled={item.qty<=1} className="px-2 py-1 border rounded mr-2">-</button>
                  <button onClick={()=> dispatch({type:'UPDATE_QTY', payload:{id:item.id, qty: item.qty + 1}})} className="px-2 py-1 border rounded">+</button>
                  <button onClick={()=> dispatch({type:'REMOVE_ITEM', payload:item.id})} className="ml-4 text-red-500">Remove</button>
                </div>
              </div>
            </div>
          ))}
          <div className="text-right font-semibold">Total: ₹{total}</div>
          <div className="text-right">
            <button onClick={()=> dispatch({type:'CLEAR_CART'})} className="btn">Clear Cart</button>
          </div>
        </div>
      )}
    </div>
  );
}
