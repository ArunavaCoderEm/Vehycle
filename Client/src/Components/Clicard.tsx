import React from 'react';

interface MechcardProps {
  img: string;
  alt: string;
  name: string;
  contact: number;
  defect: string
}

const applyclient = () => {
    
}

const Clicard: React.FC<MechcardProps> = (
        { img, alt, name, contact, defect}
    ) => {

  return (
    <>
    <div className="p-3 bg-white h-52 sha rounded-lg grid grid-cols-6 gap-4">
        <div className='col-span-3 flex flex-col items-center'>
            <img src={img} alt={alt} className="w-24 h-24 rounded-full border-2 border-pink-600" />
            <h2 className="font-extrabold mt-3">{name}</h2>
        </div>
      <div className="col-span-3 bg-gray-100 rounded-lg p-2">
        <h3 className="font-bold text-sm">Contact : {contact}</h3>
        <h3 className="font-bold text-sm">Defect : {defect}</h3>
        <div className='mt-7 flex justify-center'>
          <button 
          onClick={applyclient}
          className='bg-gradient-to-b from-pink-600 to-pink-700 p-2 my-1 rounded-lg font-bold text-white transition-all duration-200 hover:scale-95'>Apply Now</button>
        </div>
      </div>
    </div>
    </>
  );
};

export default Clicard;