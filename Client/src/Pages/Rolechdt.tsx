import React, { useState } from 'react';

const Rolechdt: React.FC = () => {

  const[role, setrole] = useState<string>("consumer")

  return (
    <div className="min-h-screen p-6 bg-transparent flex items-center justify-center">
      <div className="container max-w-screen-lg mx-auto">
        <div>
          <div className="bg-gradient-to-b from-gray-200 to-gray-300 sha rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
              <div className="text-gray-600">
                <p className="font-medium text-lg ">Personal Details</p>
                <p>Please fill out all the fields.</p>
              </div>

              <div className="lg:col-span-2">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                  <div className="md:col-span-3 font-semibold">
                    <label htmlFor="address">Address / Street</label>
                    <input
                      type="text"
                      name="address"
                      id="address"
                      className="h-10 border mt-1 rounded px-4 focus:outline-none w-full bg-gray-50"
                      defaultValue=""
                      placeholder="4th cross of MG road ..."
                    />
                  </div>

                  <div className="md:col-span-2 font-semibold">
                    <label htmlFor="city">City</label>
                    <input
                      type="text"
                      name="city"
                      id="city"
                      className="h-10 border mt-1 focus:outline-none rounded px-4 w-full bg-gray-50"
                      defaultValue=""
                      placeholder="Kolkata ..."
                    />
                  </div>

                  <div className="md:col-span-2 font-semibold">
                    <label htmlFor="country">Landmark</label>
                    <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                      <input
                        name="country"
                        id="country"
                        placeholder="Near the statue ..."
                        className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                        defaultValue=""
                      />

                    </div>
                  </div>

                  <div className="md:col-span-2 font-semibold">
                    <label htmlFor="state">Contact</label>
                    <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                      <input
                        type='number'
                        placeholder="9883623445 ..."
                        className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                        defaultValue=""
                      />
                      
                    </div>
                  </div>

                  <div className="md:col-span-2 font-semibold">
                    <label htmlFor="state">Role</label>
                    <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                     
                     <select 
                     value={role}
                     onChange={(e:any) => setrole(e.target.value)}
                     className='w-full h-full bg-white p-2'>
                      <option value="" disabled>Select Below</option>
                      <option value="consumer">Consumer</option>
                      <option value="supplier">Supplier</option>
                     </select>
                      
                    </div>
                  </div>

                {role === "supplier" &&
                <>
                    <div className="md:col-span-2 font-semibold">
                    <label htmlFor="state">Specialist</label>
                    <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                      <input
                        type='name'
                        placeholder="Cleaner ..."
                        className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                        defaultValue=""
                      />
                      
                    </div>
                  </div>
                    <div className="md:col-span-2 font-semibold">
                    <label htmlFor="state">Hourly Rate Rs.</label>
                    <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                      <input
                        type='name'
                        placeholder="351 ..."
                        className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                        defaultValue=""
                      />
                      
                    </div>
                  </div>
                    <div className="md:col-span-2 font-semibold">
                    <label htmlFor="state">Description</label>
                    <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                      <input
                        type='name'
                        placeholder="I am a pretty good worker ..."
                        className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                        defaultValue=""
                      />
                      
                    </div>
                  </div>
                  </>
                }

                  <div className="md:col-span-5 text-right">
                    <div className="inline-flex items-end">
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <a
          href="https://www.buymeacoffee.com/dgauderman"
          target="_blank"
          rel="noopener noreferrer"
          className="md:absolute bottom-0 right-0 p-4 float-right"
        >
          <img
            src="https://www.buymeacoffee.com/assets/img/guidelines/logo-mark-3.svg"
            alt="Buy Me A Coffee"
            className="transition-all rounded-full w-14 -rotate-45 hover:shadow-sm shadow-lg ring hover:ring-4 ring-white"
          />
        </a>
      </div>
    </div>
  );
};

export default Rolechdt;
