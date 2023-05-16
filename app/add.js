import React, { useRef } from 'react'



const AddSection = ({todos, myinput, setInput, isEditing, curID, isLoading, setLoading}) => {

    const isValid = useRef(true)
    function validateInput(){
        if(myinput.trim() == '' ){
            isValid.current = false
        }
        todos.forEach(todo => {
            if(myinput.trim() == todo.todo) {isValid.current = false; return}
        })
        
    }

    //when entered
    async function handleEnter(e){

        isValid.current = true
        validateInput();
        if(!isValid.current) { alert("Is not validate"); return}

        e.target.blur()
        if(isLoading) return
        setLoading(true)
        if(!isEditing.current){
            const dataF = await fetch("./api/todo", {
                method: 'POST',
                head: {
                    'Content-Type' : 'aplication/json'
                },
                body: JSON.stringify(myinput)
            })
            setInput('')
            const data = await dataF.json()
            alert("Document Added With Ref: " + data)
        }
        else if(curID.current.trim != ''){
             
            const dataF = await fetch("./api/todo/" + curID.current, {
                method : 'PATCH',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(myinput)
            })
            const data = await dataF.json()
            alert(data)
        }
        curID.current = ''
        isEditing.current = false
        setLoading(false)
    }

  return (
    <div>
        <input type='text' placeholder='What To Do ?' onChange={e=>{setInput(e.target.value)}} value={myinput}
        onKeyDown={e=>{if(e.key === "Escape") {
            e.target.blur()
            if(isEditing.current){
                setInput('')
                isEditing.current = false
            }
        } 
        else if (e.key === 'Enter') {
            handleEnter(e)
        }}}
     />
     <label hidden={(isEditing.current)? false : true}> Press Escape Key To Cancel Editing</label>
    </div>
  )
}

export default AddSection