import { db } from "../firebase.config";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";

export interface Beautician {
  id: string;
  name: string;
  specialty: string[]; 
  bio: string;
  profileImage: string; 
  yearsOfExperience: number;
  salonId?: string; 
  portfolioImages?: string[]; 
  rating?: number; 
  availability?: { [key: string]: string };
}

// Function to fetch beauticians from Firestore
export const getBeauticians = async (): Promise<Beautician[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "beauticians"));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Beautician[];
  } catch (error) {
    console.error("Error fetching beauticians:", error);
    throw error;
  }
};

// Function to fetch a single beautician by ID from Firestore
export const getBeauticianById = async (id: string): Promise<Beautician | undefined> => {
  try {
    const docRef = doc(db, "beauticians", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      } as Beautician;
    } else {
      console.log("No such document!");
      return undefined;
    }
  } catch (error) {
    console.error("Error fetching beautician by ID:", error);
    throw error;
  }
};
