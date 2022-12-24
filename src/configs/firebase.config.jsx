import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyAE78vWkx91FUDbKU9Iao6r0JuqBhqpunY",
	authDomain: "todo-app-9e07b.firebaseapp.com",
	projectId: "todo-app-9e07b",
	storageBucket: "todo-app-9e07b.appspot.com",
	messagingSenderId: "861911964848",
	appId: "1:861911964848:web:b6b22ba51f14b9162d6f75",
	measurementId: "G-ELCTE3WTBL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const dbInstance = collection(db, "todoList");
