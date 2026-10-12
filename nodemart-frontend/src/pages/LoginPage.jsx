import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage({onLogin}){
     const Navigate = useNavigate()
     const [formData, setFormData] = useState(
        {
            email: '',
            password: ''
        }
     )

     const [message, setMessage]= useState('');
     const [error, setError]= useState('');
     const [isSubmitting, setIsSubmitting]= useState(false);

 const handleChange = (event)=>{
    
  const {name, value}= event.target;

  setFormData((currentData)=>(
    {
        ...currentData,
        [name]: value
    }
  ))

 }
   const handleSubmit= async (event)=>{

     event.preventDefault();
       
     setMessage('');
     setError('');
     setIsSubmitting(true);



      try{
    const response= await fetch(
        `${import.meta.env.VITE_API_URL}/users/login`,
        {
        method : 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData) 
        }
    )

 const data= await response.json()

    if(!response.ok){
      throw new Error (data.message || 'Login failed' )
    }

    localStorage.setItem('token', data.token);
    onLogin();
    Navigate('/');
 setMessage('Login successful. Your token has been saved.')
   
 setFormData({
    email: '',
    password: ''
 })
 }
 catch(error){
    setError(error.message);
 }
 finally{
    setIsSubmitting(false)
 }
   }

    return(
          <main>
        <form onSubmit={handleSubmit} >
        
        <label >
            Email
            <input 
            type="email"
             name="email" 
             placeholder="Enter email"
             value={formData.email}
             onChange={handleChange}
             />
        </label>
        <label >
            password
            <input 
            type="password"
             name="password" 
             placeholder="Enter password"
             value={formData.password}
             onChange={handleChange}
             />
        </label>

          <button type="submit" disabled={isSubmitting}>
             { isSubmitting? 'Logging in...' : 'Login'}
          </button>

        </form>

        {message && <p>{message}</p>}
        {error && <p>{error}</p>}

        </main>
    )
}

export default LoginPage;