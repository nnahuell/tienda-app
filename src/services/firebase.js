import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDstq5-fRu_ojgB6TZO5_ciHv5jsCFw-m0",
  authDomain: "tiendapp-90cb3.firebaseapp.com",
  databaseURL: "https://tiendapp-90cb3-default-rtdb.firebaseio.com", 
  projectId: "tiendapp-90cb3",
  storageBucket: "tiendapp-90cb3.firebasestorage.app",
  messagingSenderId: "170333302452",
  appId: "1:170333302452:web:bc8f7320618732b540f1e1",
};

const app = initializeApp(firebaseConfig);

// Auth anónima
export const auth = getAuth(app);
export const signInAnon = async () => {
  const cred = await signInAnonymously(auth);
  return cred.user.uid;
};

// Realtime Database
const rtdb = getDatabase(app);

// Guardar orden 
export const pushOrder = async ({ uid, orderId, total, itemsCount }) => {
  await set(ref(rtdb, `orders/${uid}/${orderId}`), {
    orderId,
    total,
    itemsCount,
    createdAt: new Date().toISOString()
  });
};
