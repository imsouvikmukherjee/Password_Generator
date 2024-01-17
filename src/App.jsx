import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [character, setCharacter] = useState(false);
  const [password, setPassword] = useState("");
  const [btnName, setBtnName] = useState("Copy");
  const [hintMessage, setHintMessage] = useState("Weak");
  const [hintMessageColor, setHintMessageColor] = useState("text-red-400");


  const passwordRef = useRef(null);
 
  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTWXYZabcdefghijklmnopqrstuvwxyz"
    let num = "0123456789"
    let char = "~!@#$%^&*(){}+_?/"

    if(number){
      str += num;
    }

    if(character){
      str += char;
    }

    for (let i = 1; i <= length; i++) {
      const generatepass = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(generatepass);
      
    }
    
    setPassword(pass);
    setBtnName("Copy")

    if (length >= 18) {
      setHintMessage("strong");
      setHintMessageColor("text-green-400");
    } else if (length >= 13) {
      setHintMessage("moderate");
      setHintMessageColor("text-orange-400");
    } else {
      setHintMessage("weak");
      setHintMessageColor("text-red-400");
    }

    if (length >= 8 && (number || character)) {
      setHintMessage("strong");
      setHintMessageColor("text-green-400");
    }

  }, [length, number, character, setPassword]);

  useEffect(()=>{
    passwordGenerator()
  },  [length, number, character, passwordGenerator])


  const regeneratePassword = (e) =>{
   e.preventDefault()
   passwordGenerator()
  }

  const copyPassword = useCallback((e)=>{
    e.preventDefault();
    passwordRef.current?.select();
    setBtnName("Copied")
    // passwordRef.current?.setSelectionRange(0,20)
    window.navigator.clipboard.writeText(password);
  }, [password])

  return (
    <>
   <div className="max-w-sm w-full rounded overflow-hidden shadow-lg p-5 m-10 bg-neutral-800 text-center">
  
   <h2 className='text-2xl text-center my-3 text-orange-500'>Password Generator</h2>
   <form action="">
   <label htmlFor="password" className='text-center text-white px-4 my-3'>Password</label>
   
   <input type="text" placeholder='Password' value={password} ref={passwordRef} readOnly className='px-4 py-2 rounded-xl border-red-500 w-full my-3'/>
   
   
   <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2  px-5 rounded-lg" onClick={copyPassword}>
  {btnName}
</button>

<button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 mx-5  px-5 rounded-lg" onClick={regeneratePassword}>
  Regenerate
</button>

<div className="flex justify-between mt-4">
  <input type="range" min={8} max={30} value={length} onChange={(e) => setLength(e.target.value)} />
  <label htmlFor="letter" className='text-white px-3'>Length : {length}</label>
</div>

<div className="flex  mt-4">
  <div className="flex-item-center">
  <input type="checkbox" onChange={() => setNumber((prev) => !prev)} className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
  <label htmlFor="letter" className='text-white px-3'>Numbers</label>
  </div>
</div>

<div className="flex  mt-4">
  <div className="flex-item-center">
  <input type="checkbox" onChange={() => setCharacter((prev) => !prev)} className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
  <label htmlFor="letter" className='text-white px-3'>Special characters</label>
  </div>
</div>

   </form>
   <p className={`mt-4 ${hintMessageColor}`}>Your password is {hintMessage}</p>
   </div>

   

    </>
  )
}

export default App
