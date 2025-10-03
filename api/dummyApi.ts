const BASE = 'https://dummyjson.com';

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  brand: string;
  category: string;
  rating: number;
  thumbnail: string;
}

export async function fetchProducts(limit = 30, skip = 0): Promise<{ products: Product[] }> {
  const res = await fetch(`${BASE}/products?limit=${limit}&skip=${skip}`);
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

export async function fetchProductById(id: number): Promise<Product> {
  const res = await fetch(`${BASE}/products/${id}`);
  if (!res.ok) throw new Error('Failed to fetch product detail');
  return res.json();
}

export async function deleteProduct(id: number): Promise<any> {
  const res = await fetch(`${BASE}/products/${id}`, { method: 'DELETE' });
  return res.json();
}