import { db } from "../firebase.config";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";

export interface Salon {
  id: string;
  name: string;
  location: string; 
  description: string;
  services: Array<{ 
    serviceId: string; 
    name: string; 
    price: number; 
    duration: number; 
    currency?: string; 
  }>; 
  images: {
    interior: string[];
    exterior?: string[]; 
    logo?: string;
  };
  isLadiesOnly: boolean;
  hasHijabFriendlyAreas?: boolean; 
  rating?: number; 
  operatingHours: { [key: string]: string }; 
}

// Function to fetch salons from Firestore
export const getSalons = async (): Promise<Salon[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "salons"));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Salon[];
  } catch (error) {
    console.error("Error fetching salons:", error);
    throw error; // Re-throw to be caught by the component
  }
};

// Function to fetch a single salon by ID from Firestore
export const getSalonById = async (id: string): Promise<Salon | undefined> => {
  try {
    const docRef = doc(db, "salons", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      } as Salon;
    } else {
      console.log("No such document!");
      return undefined;
    }
  } catch (error) {
    console.error("Error fetching salon by ID:", error);
    throw error;
  }
};
