import React from 'react'

const Card = ({text,id,status,deletetodo,donetodo,settext,setid,setisedit,progresstodo,deleteprogress,doneprogress}) => {
  return (
    <div className=' bg-black/80 text-white p-4 rounded-lg shadow-lg text-center text-xl m-2'>
        <div>{text}</div>
        <div>{id}</div>
        {status === 'todo' && (
        <>
          <button 
        onClick={() => deletetodo(id)

        }
        className='bg-red-500 text-white px-4 py-2 mt-4 rounded hover:bg-red-700'>
      Delete
      </button>

        <button
          onClick={() =>
            {setisedit(true)
              settext(text)
              setid(id)
            }}
          className='bg-blue-500 text-white px-4 py-2 mt-4 ml-4 rounded hover:bg-blue-700'
        >
          Edit
        </button>

          <button 
          onClick={() => progresstodo(id)}
          className='bg-green-400 text-white px-4 py-2 mt-4 ml-4 rounded hover:bg-green-700'>
           
            Progess
            </button>


          <button
          onClick={() => donetodo(id)}
           className='bg-yellow-400 text-white px-4 py-2 mt-4 ml-4 rounded hover:bg-yellow-700'>
            Complete</button>
        </>
      )}


      {
        status === 'inprogress' && (
        <>
        <button
        onClick={() => doneprogress(id)}
        className='bg-yellow-400 text-white px-4 py-2 mt-4 ml-4 rounded hover:bg-yellow-700'>Done</button>
        <button
        onClick={() => deleteprogress(id)}
        className='bg-red-500 text-white px-4 py-2 mt-4 ml-4 rounded hover:bg-red-700'>Delete</button>
        </>
      )
      }

      
      {
        status === 'completed' && (
        <button
        onClick={() => deletetodo(id)}
        className='bg-red-500 text-white px-4 py-2 mt-4 ml-4 rounded hover:bg-red-700'>Delete</button>
      )
      }
    </div>
  )
}

export default Card