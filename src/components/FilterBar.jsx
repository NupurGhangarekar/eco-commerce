import React from 'react';

export default function FilterBar({ categories, selected, onSelect, sort, onSort, priceRange, onPriceRange }) {
  return (
    <div className="p-4 bg-white rounded shadow mb-4 flex flex-col md:flex-row md:items-center md:space-x-4">
      <div>
        <label className="block text-sm">Category</label>
        <select value={selected} onChange={(e) => onSelect(e.target.value)} className="mt-1 px-2 py-1 border rounded">
          <option value="">All</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-sm">Sort</label>
        <select value={sort} onChange={(e) => onSort(e.target.value)} className="mt-1 px-2 py-1 border rounded">
          <option value="">Default</option>
          <option value="price-asc">Price low to high</option>
          <option value="price-desc">Price high to low</option>
        </select>
      </div>
      <div>
        <label className="block text-sm">Max Price</label>
        <input type="range" min="0" max="5000" value={priceRange} onChange={(e) => onPriceRange(e.target.value)} className="mt-1" />
        <div className="text-sm">Up to ₹{priceRange}</div>
      </div>
    </div>
  );
}
