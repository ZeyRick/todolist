import { mycollection } from "@/firebase"
import { addDoc, serverTimestamp } from "firebase/firestore"

export async function POST(request){
    const myinput = await request.json()

    const docRef = await addDoc(mycollection, {
        todo: myinput,
        isCompleted: false,
        timestamp: serverTimestamp()
    })
    return new Response(JSON.stringify(docRef.id))
}