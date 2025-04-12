import { db } from "../firebase.config";
import { collection, getDocs, getDoc, query, where, getCountFromServer } from "firebase/firestore";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency?: string;
  brand?: string;
  category: string;
  imageUrl?: string;
  stock: number;
  salonId: string;
}

// Function to fetch products by salon ID from Firestore
export const getProductsBySalonId = async (salonId: string): Promise<Product[]> => {
 try {
    const productsRef = collection(db, "products");
    const q = query(productsRef, where("salonId", "==", salonId));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Product[];
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
