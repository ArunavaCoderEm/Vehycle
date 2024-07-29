import axios from 'axios'
import React, { useState } from 'react'

export default function Chat(): React.ReactNode {
  const [ansarr, setAnsarr] = useState<{ type: string, text: string }[]>([]);
  const [question, setQuestion] = useState<string>("");

  const answerfunc = async (e: any) => {

    e.preventDefault();
    setAnsarr(prevAnsarr => [...prevAnsarr, { type: 'user', text: question }]);

    const vehycleContext = "Always answer not more that 20 words, Vehycle owner is Arunava Dutta, Vehycle is a platform that helps people find reliable mechanics and customers for vehicle repair and maintenance. ";

    try {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${
          import.meta.env.VITE_GEMINI_API
        }`,
        method: "post",
        data: {
          contents: [{ parts: [{ text: vehycleContext + question }] }],
        },
      });

      const newAnswer = response["data"]["candidates"][0]["content"]["parts"][0]["text"];
      setAnsarr(prevAnsarr => [...prevAnsarr, { type: 'chatbot', text: newAnswer }]);
    } catch (error) {
      console.log(error);
      setAnsarr(prevAnsarr => [...prevAnsarr, { type: 'chatbot', text: "Sorry - Something went wrong. Please try again!" }]);
    }

  }

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');


  return (
    <div className='mt-20 gap-2 grid lg:grid-cols-2 grid-cols-1 p-2'>
      <div className='flex flex-col items-center'>
      <h1 className='text-2xl text-center underline underline-offset-4 my-5 p-2 font-extrabold'><span className='text-pink-600'>Y</span>our <span className='text-pink-600'>C</span>hatbot</h1>
        <form 
          onSubmit={answerfunc}
          className='bg-gray-200/80 overflow-y-auto p-3 w-full rounded-md flex flex-col justify-start items-start text-center h-[27rem]'
        >
          <div className='flex gap-x-2 w-full my-3'>
            <input 
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
              placeholder='Ask about vehycle ...'
              className='w-full outline-none font-semibold text-sm ring-0 focus:ring-2 ring-pink-600 transition-all duration-300 text-center rounded-md h-10'
              type="text" 
            />
           <button className="relative inline-flex items-center justify-center p-4 px-6 py-1 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-pink-500 rounded-full shadow-md group">
            <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-pink-500 group-hover:translate-x-0 ease">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </span>
            <span className="absolute flex items-center justify-center w-full h-full text-pink-500 transition-all duration-300 transform group-hover:translate-x-full ease">Ask</span>
            <span className="relative invisible">Ask</span>
            </button>
          </div>
          <div className='w-full flex bg-gray-300/80 rounded-lg p-3 flex-col gap-y-2'>
            {ansarr.map((ans, index) => (
              <p 
                key={index}
                className={`p-2 rounded-md ${
                  ans.type === 'user' ? 'bg-pink-500/80 self-end text-right text-white text-sm font-semibold tracking-tight' : 'bg-black/80 text-left text-white text-sm font-semibold tracking-tight self-start'
                }`}
              >
                {ans.text}
              </p>
            ))}
          </div>
        </form>
      </div>
      <div>
      <h1 className='text-2xl text-center underline underline-offset-4 my-5 p-2 font-extrabold'><span className='text-pink-600'>C</span>ontact <span className='text-pink-600'>U</span>s</h1>

      <div className="flex flex-col items-center">

      <form action="https://api.web3forms.com/submit" method="POST" className="bg-white/30 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 w-full max-w-md">

        <input type="hidden" name="access_key" value="ce4c21f7-d1c4-4d17-82f5-4d88fd62625f" />
        <div className="mb-4">
          <label className="block text-black text-sm font-semibold mb-2" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-black text-sm font-semibold leading-tight focus:outline-none focus:shadow-outline ring-pink-600 focus:ring-2 transition-all duration-300"
          />
        </div>
        <div className="mb-4">
          <label className="block text-black text-sm font-semibold  mb-2" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-black text-sm font-semibold leading-tight focus:outline-none focus:shadow-outline ring-pink-600 focus:ring-2 transition-all duration-300"
          />
        </div>
        <div className="mb-4">
          <label className="block text-black text-sm font-semibold  mb-2" htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className="shadow min-h-20 max-h-20 appearance-none border rounded w-full py-2 px-3 text-black text-sm font-semibold leading-tight focus:outline-none focus:shadow-outline ring-pink-600 focus:ring-2 transition-all duration-300"
          ></textarea>
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-gradient-to-b from-pink-700 to-pink-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all duration-200 hover:scale-95"
          >
            Send
          </button>
        </div>
      </form>
    </div>
      </div>
    </div>
  )
}
