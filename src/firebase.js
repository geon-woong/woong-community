import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyCi97W0_FPm0LGyk7_YmhmRiY1yuaC3ux0",
  authDomain: "woong-board.firebaseapp.com",
  projectId: "woong-board",
  storageBucket: "woong-board.appspot.com",
  messagingSenderId: "177987275237",
  appId: "1:177987275237:web:50affecee536ba8115870c",
  measurementId: "G-7HBR4WM438"
};

const app = initializeApp(firebaseConfig);

const authService = getAuth()
const firebaeDb = getFirestore();
const fireStorage = getStorage();
export { authService,firebaeDb,fireStorage }