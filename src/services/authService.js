import Cookies from 'js-cookie';
import { authFb } from "../config/firebase";
import { signInWithEmailAndPassword } from 'firebase/auth';

let currentUser = null;


export const login = async (userData) => {
  let username = userData.email;
  let password = userData.password;
  console.log(password);

  let cred  = await signInWithEmailAndPassword(authFb, username, password);
  let email = cred.user.email || "";
  let currentUser = {
    uid: cred.user.uid,
    email: email,
    role: (email.includes("admin") ? "admin" : email.includes("user") ? "user" : "guest")
  }
  
  Cookies.set('qpi-frm', JSON.stringify(currentUser) || null, { expires: 7 });
  return currentUser;
};

export const logout = async () => {
  await authFb.signOut();
  currentUser = null;
  Cookies.remove('qpi-frm');
};

export const getCurrentUser = () => {
  const name = Cookies.get('qpi-frm');
  
  try {
    return JSON.parse(name);
  }
  catch (e) {
    return null
  }
};
