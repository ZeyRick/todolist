
import React from 'react'

const ReadSection = ({todos, myinput, setInput, isEditing, curID, isLoading, setLoading}) => {

    async function handleCompleted(e){
        if (isLoading) return
        setLoading(true)
        var myComplete = null
        if(e.target.checked){
            myComplete = true
        }
        else{
            myComplete = false
        }

        const dataF = await fetch("./api/todo/" + e.target.id, {
            method: 'PATCH',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                isCompleted: myComplete
            })
        })
        const data = await dataF.json()
        setLoading(false)
        alert(data)

    }
    async function handleUpdate(e){
        if(isLoading) return
        setLoading(true)
        curID.current = e.target.value
        todos.forEach(todo => {
            if(todo.id == e.target.value){
                setInput(todo.todo)
                return
            }
        });
        
        isEditing.current = true
    }

    async function handleDel(e){
        if(isLoading) return
        setLoading(true)
        const dataF = await fetch("./api/todo/" + e.target.value , {
            method: 'DELETE',
        })
        const data = await dataF.json()
        setLoading(false)
        alert(data)
    }


  return (
    
    <div>
        <table>
            <thead>
                <tr>
                    <th>
                        Todo
                    </th>
                    <th>
                        Done
                    </th>
                    <th>
                        Time
                    </th>
                    <th>
                        Edit
                    </th>
                </tr>
            </thead>
            <tbody>
                {todos.map(todo=>(
                    <tr key={todo.id}>
                        <td> {todo.todo}</td>
                        <td><input onChange={e=>handleCompleted(e)} type='checkbox' id={todo.id} checked={todo.isCompleted} /></td>
                        {/* <td> {todo.isCompleted.toString()}</td> */}
                        <td> {todo.timestamp}</td>
                        <td> <button value={todo.id} onClick={e => handleDel(e)}>Delete</button></td>
                        <td> <button value={todo.id} onClick={e => handleUpdate(e)}>Edit</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default ReadSection