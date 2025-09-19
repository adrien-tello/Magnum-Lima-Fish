import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { Product } from '../types';

export async function fetchProducts(max: number = 200): Promise<Product[]> {
  const ref = collection(db, 'products');
  const q = query(ref, orderBy('name'), limit(max));
  const snap = await getDocs(q);
  return snap.docs.map((doc) => ({ id: doc.id, ...(doc.data() as Omit<Product, 'id'>) }));
}
