import {useState} from 'react'
import Card from './Card'

const App = () => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
const [complted, setCompleted] = useState([]);
const [progress,setProgress]=useState([]);
const [isedit,setisedit] = useState(false);
const[id,setid]=useState();
  const handleAdd = (e) => {
    e.preventDefault();
    try {
      if(isedit){
        
      const updatetodo = todos.map(todo => todo.id===id?{
        id: new Date().toLocaleTimeString(),
        text:text
        
      }:
    todo)
    setTodos(updatetodo)
    clear()
      }else{
        setTodos([...todos,{
          id: new Date().toLocaleTimeString(),
          text: text,
          status: 'todo'

        }])
        clear()
      }
    } catch (error) {
      
    }
  }
const clear = ()=>{
  setText("")
  setid()
  setisedit(false)
}
const deletetodo = (id) => {
  setTodos(todos.filter(todo => todo.id !== id));
}
const deleteprogress = (id) => {
  setProgress(progress.filter(progress => progress.id !== id));
}
const doneprogress = (id) => {
  const todoToMove = progress.find(todo => todo.id === id);
  if (todoToMove) {
    setCompleted([...complted, { 
      ...todoToMove,
      id: new Date().toLocaleTimeString(),
       status: 'completed' }]);
    setProgress(progress.filter(todo => todo.id !== id));
  }
};

const donetodo = (id) => {
  const todoToMove = todos.find(todo => todo.id === id);
  if (todoToMove) {
   
    const completedTodo = {
      ...todoToMove,
      id: new Date().toLocaleTimeString(),
      status: 'completed'
    };
    setCompleted([...complted, completedTodo]);
    setTodos(todos.filter(todo => todo.id !== id));
  }
};
const progresstodo = (id) => {
  const todoToMove = todos.find(todo => todo.id === id);
  if (todoToMove) {
    const updatedTodo = {
       ...todoToMove,
      id: new Date().toLocaleTimeString(), 
       status: 'inprogress' };
    setProgress([...progress, updatedTodo]);
    setTodos(todos.filter(todo => todo.id !== id));
  }
}
const deleteCompleted= (id) => {
  setCompleted(complted.filter(complted => complted.id !== id));
} 
  return (
    <>
      <form onSubmit={handleAdd} className='flex flex-col items-center justify-center '>
        <div className='flex justify-center '>
          
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
  
              type="text"
              id='textinput'
              className=' w-[20vw] h-10 bg-blue-300 text-center text-2xl'
              placeholder='Enter To do Task'
            />
            <button type="submit" className={`${isedit? 'bg-red-500': 'bg-green-400'} w-20 h-10 ml-10 active:bg-fuchsia-900`}>
              {
                isedit ? 'Update' : 'Add'
                
              }
              </button>
          </div>
           </form>
        
        <div className='grid grid-cols-3 gap-10 pt-10 m-4 text-center text-2xl p-10'>
          <div className='bg-green-400 w-auto h-[70vh] overflow-auto' >
            <p className='bg-white text-black'>To Do Task </p>
            {todos.map((todo) => (
            <Card
              key={todo.id}
              text={todo.text}
              id={todo.id}
             status='todo'
             deletetodo={deletetodo}
            donetodo={donetodo} 
            setisedit={setisedit}
            settext={setText}
            setid={setid}
            progresstodo={progresstodo}
            
  />
))}
          </div>
          <div className='bg-yellow-400 w-auto h-[70vh]'>
  <p className='bg-white text-black'>Progress </p>
  {
    progress.map((progress) => (
      <Card
        key={progress.id}
        text={progress.text}
        id={progress.id}
        status='inprogress'
       deleteprogress={deleteprogress}
       doneprogress={doneprogress}
      
      
      />
    ))

  }
</div>


          <div className='bg-red-400 w-auto h-[70vh]'>
  <p className='bg-white text-black'>Completed </p>
  {
    complted.map((complted) => (
      <Card
        key={complted.id}
        text={complted.text}
        id={complted.id}
        status='completed'
       deletetodo={deleteCompleted} 
      />
    ))
  }
</div>
        </div>
     
    </>
  )
}

export default App