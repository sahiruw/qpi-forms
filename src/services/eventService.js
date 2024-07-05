import { db } from "../config/firebase";
import { collection, doc, getDocs } from "firebase/firestore";
import { query, orderBy, limit } from "firebase/firestore";

import { calculateScoreOfEvent } from "./scoreService";

const getEvents = async () => {

  const querySnapshot = await getDocs(collection(db, "events"));
  let data = querySnapshot.docs.map((doc) => {return {...doc.data(), id: doc.id}});
  
  return calculateScoreOfEvent(data)
};

export { getEvents };
