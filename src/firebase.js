import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDtoJuEtI8tFYDPjRlXqO1surQbVadt9rY",
  authDomain: "project-travel-react-final.firebaseapp.com",
  projectId: "project-travel-react-final",
  storageBucket: "project-travel-react-final.appspot.com",
  messagingSenderId: "603604205563",
  appId: "1:603604205563:web:1e5aabb86dbf249fa9d55e",
  measurementId: "G-BQFS8PZJNJ"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
