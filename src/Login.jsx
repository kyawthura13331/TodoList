import { useState } from 'react'
import bg from './assets/media/universebg.jpg'
const Login = () => {
 const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const handleLogin = (e) => {
        e.preventDefault();
        console.log('Username:', username);
        console .log('Password:', password);
        console.log('Email:', email);
        setPassword('');
        setUsername('');
        setEmail('');
    }
  return (
    <div className='flex justify-center items-center bg-[url("./assets/media/universebg.jpg")] bg-cover  w-screen h-screen'>
        <div className='w-[60vw] h-[80vh] bg-black/50 blur-none rounded-lg text-center '>
            <form onSubmit={handleLogin} action="" className='flex flex-col justify-center items-center h-full'>

            <input value={username} type="text" onChange={(e)=>setUsername(e.target.value)} placeholder='Username' className='w-[60%] h-[10%] bg-white/50 rounded-lg m-5 p-2 text-black' />
            <input value={email} type='email' onChange={(e)=>setEmail(e.target.value)} placeholder='Email' className='w-[60%] h-[10%] bg-white/50 rounded-lg m-5 p-2 text-black' />
            <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder='Password' className='w-[60%] h-[10%] bg-white/50 rounded-lg m-5 p-2 text-black' />

            <button className='w-[60%] h-[10%] bg-white/50 rounded-lg m-5 p-2 text-black hover:bg-white/70 transition-all duration-100 active:bg-cyan-950 active:text-white'>
               Sign Up  
            </button>
            <p className='text-white'>Don't have an account? <span className='text-blue-500 hover:underline cursor-pointer'>Log in</span></p>
            </form>
            
        </div>
        
    </div>
  )
}

export default Login