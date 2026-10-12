// import { useState } from "react";

import { useState } from "react";

// function SignupPage(){

//     const [formData, setFormData] = useState({
//         name:'',
//         email: '',
//         password: ''
//     })

//     const [message, setMessage] = useState('');
//     const [error, setError] = useState('');
//     const [isSubmitting, setIsSubmitting] = useState(false);

//      const handleChange= (event)=>{
//         const {name, value} = event.target;

//         setFormData((currentData)=>(
//             {
//                 ...currentData,
//                 [name]: value
//             }
//         ))
//      }

//     const handleSubmit= async (event)=>{

//        event.preventDefault();

//        setMessage('');
//        setError('');
//        setIsSubmitting(true);

//         try{
//               const response= await fetch(`${import.meta.env.VITE_API_URL}/users/signup`,
//                 {
//                     method: 'POST',
//                     headers:{
//                         'Content-Type': 'application/json'
//                     },
//                     body: JSON.stringify(formData)
//                 }
//               )

//                const data= await response.json();

//                if(!response.ok){
//                    throw new Error(data.message || 'Account could not be created');
//                }

//               setMessage('Account created successfully. you can now log in.');

//               setFormData({
//                 name: '',
//                 email: '',
//                 password: ''
//               });
//         }
//         catch(error){
//               setError(error.message);
//         }
//         finally{
//           setIsSubmitting(false);
//         }

//     }

//     return(
//        <main>
//         <h1>Create Account</h1>

//         <form onSubmit={handleSubmit}>
//     <label>
//         Name
//         <input
//         type="text"
//          name="name"
//          placeholder="Your name"
//          value={formData.name}
//          onChange={handleChange}
//          required
//          />

//     </label>

//     <label>
//         Email
//         <input
//         type="email"
//         name="email"
//         placeholder="you@example.com"
//         value={formData.email}
//         onChange={handleChange}
//         required
//         />
//     </label>

//     <label>
//         Password
//         <input
//         type="password"
//         name="password"
//         placeholder="Create a password"
//         value={formData.password}
//         onChange={handleChange}
//         required
//         />
//     </label>

//      <button type="submit" disabled={isSubmitting}>
//          {isSubmitting ? 'Creating account...' : 'Create Account'}
//      </button>

//         </form>

//         {message && <p>{message}</p>}
//         {error && <p>{error}</p>}

//        </main>
//     )
// }

// export default SignupPage;

function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
 
    event.preventDefault();
     
   setMessage('');
   setError('');
    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData)
        }
      );

      const data = await response.json();

      if (!response.ok) {
         throw new Error(data.message +' Account could not be created'); 
      }

      setMessage(data.message + " successfully You can now log in.");
      console.log(data);
      
      setFormData({
        name: "",
        email: "",
        password: ""
      });
    } catch (error) {
        setError(error.message);
    } finally {
      setIsSubmitting(false);
    }

  };

  return (
    <main>
      <h1>Create Account</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          placeholder="Enter your Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="Enter your password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating Account... " : "Create Account"}
        </button>
      </form>

      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
    </main>
  );
}

export default SignupPage;
