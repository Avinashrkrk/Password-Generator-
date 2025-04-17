import { useState, useEffect, useRef, useCallback } from "react"

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")
  const [copied, setCopied] = useState(false)
  
  const passwordRef = useRef(null)
  
  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    
    if(numberAllowed) str += "0123456789"
    if(charAllowed) str += "!@#$%^&*()_~`"
    
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    
    setPassword(pass)
  }, [length, numberAllowed, charAllowed, setPassword])
  
  const copyPassword = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0, 99)
    window.navigator.clipboard.writeText(password)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [password])
  
  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          <span className="mr-2">🔐</span>
          Password Generator
        </h1>
        
        <div className="relative mb-6">
          <input
            type="text"
            value={password}
            className="w-full p-3 pr-20 text-lg rounded-lg bg-gray-50 border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPassword}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        
        <div className="space-y-4">
        
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between">
              <label className="text-gray-700 font-medium">Password Length:</label>
              <span className="font-bold text-blue-600">{length}</span>
            </div>
            <input
              type="range"
              min={4}
              max={24}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-gray-500 text-sm">
              <span>4</span>
              <span>24</span>
            </div>
          </div>
          
          <div className="flex flex-col space-y-3">
            <label className="text-gray-700 font-medium">Include:</label>
            <div className="flex items-center space-x-2 ml-2">
              <input
                type="checkbox"
                id="numberInput"
                checked={numberAllowed}
                onChange={() => setNumberAllowed(prev => !prev)}
                className="w-4 h-4 accent-blue-600"
              />
              <label htmlFor="numberInput" className="text-gray-700">Numbers (0-9)</label>
            </div>
            <div className="flex items-center space-x-2 ml-2">
              <input
                type="checkbox"
                id="charInput"
                checked={charAllowed}
                onChange={() => setCharAllowed(prev => !prev)}
                className="w-4 h-4 accent-blue-600"
              />
              <label htmlFor="charInput" className="text-gray-700">Special Characters (!@#$%^&*)</label>
            </div>
          </div>
          
          <button
            onClick={passwordGenerator}
            className="w-full py-3 mt-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
          >
            Generate New Password
          </button>
        </div>
      </div>
    </div>
  )
}

export default App