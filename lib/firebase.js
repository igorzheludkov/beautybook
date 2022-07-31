// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCihW41rPoLIKdPa467oZrecsrrHBgZAVU",
  authDomain: "test-secret-354517.firebaseapp.com",
  projectId: "test-secret-354517",
  storageBucket: "test-secret-354517.appspot.com",
  messagingSenderId: "264392622790",
  appId: "1:264392622790:web:ffea57ef7962eb581e8dc7",
  measurementId: "G-JR6HFZ9DX0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);



