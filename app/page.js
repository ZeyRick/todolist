'use client'

import { mycollection } from '@/firebase'
import { onSnapshot, orderBy, query } from 'firebase/firestore'
import React, { useEffect, useRef, useState } from 'react'
import ReadSection from './read'
import AddSection from './add'

const HomePage = () => {
    const [isLoading, setIsLoading] = useState(false)
    const curID = useRef('')
    const isEditing = useRef(false)
    const [myinput, setMyinput] = useState('') // track input
    useEffect(()=>{
        console.log("use effect")
        ReadTodos();
    },[])
    
    const[todos, setTodos] = useState([
        {
            id: '',
            todo: '',
            isCompleted: false,
            timestamp: null,
        }
    ])
    function setLoading(input){
        setIsLoading(input)
    }

    function setInput(input){
        setMyinput(input)
    }

    function ReadTodos(){
        const q = query(mycollection, orderBy('timestamp', 'desc'))
        onSnapshot(q, querySnapped=>{
            setTodos(querySnapped.docs.map(doc=>({
                id: doc.id,
                todo: doc.data().todo,
                isCompleted: doc.data().isCompleted,
                timestamp: doc.data().timestamp?.toDate().getTime(),

            })))
        })
    }


  return (
    <div>
        <div  className={(isLoading) ? "LoadingScreen showLoading" : "LoadingScreen"}>LOADING</div>
        <AddSection setLoading={setLoading} isLoading={isLoading} curID={curID} isEditing={isEditing} setInput={setInput} myinput={myinput} todos={todos}/>
        <ReadSection setLoading={setLoading} isLoading={isLoading} curID={curID}  isEditing={isEditing} setInput={setInput} myinput={myinput} todos={todos} />
    </div>
  )
}

export default HomePage