import { db } from "../config/firebase"
import { getDoc, doc } from "firebase/firestore"


const getUserDataByID = async (id) => {
    const docRef = doc(db, "users", id)
    const docSnap = await getDoc(docRef)
    const data = docSnap.data()
    data["Email"] = data["Email"] || `${data.Name.replace(/\s/g, "").toLowerCase()}@example.com`
    return data
}

export { getUserDataByID }
