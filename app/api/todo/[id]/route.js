import { db } from "@/firebase"
import { deleteDoc, doc, serverTimestamp, updateDoc } from "firebase/firestore"





export const  PATCH = async (request, {params}) => {
    const todosDoc = doc(db, 'todos', params.id)
    const input = await request.json()
    if(input.isCompleted != null){
        await updateDoc(todosDoc , {
            timestamp: serverTimestamp(),
            isCompleted: input.isCompleted,
        })
        return new Response(JSON.stringify('Is Updated Document =' + params.id))
    }
    else{
        await updateDoc(doc(db, 'todos', params.id), {
            timestamp: serverTimestamp(),
            todo: input,
        })

        return new Response(JSON.stringify('Is Changed Document =' + params.id))
    }
}

export const DELETE = async (request, {params}) => {
    await deleteDoc(doc(db, 'todos',  params.id))

    return new Response(JSON.stringify(params.id));
}

