import React from 'react';

interface MechcardProps {
  img: string;
  alt: string;
  name: string;
  desc: string;
  specialist: string;
  contact: number;
  hourlyrate: number;
  rating: number[];
}

const Mechcard: React.FC<MechcardProps> = (
        { img, alt, name, desc, specialist, contact, hourlyrate, rating}
    ) => {

  return (
    <>
    <div className="p-3 bg-white sha rounded-lg grid grid-cols-6 gap-4">
        <div className='col-span-2 flex flex-col items-center'>
            <img src={img} alt={alt} className="w-24 h-24 rounded-full border-2 border-pink-600" />
            <button>Book Now</button>
        </div>
      <div className="col-span-4 rounded-lg p-2">
        <h2 className="font-extrabold">{name}</h2>
        <h3 className="font-thin text-sm">{desc}</h3>
        <h3 className="font-bold text-sm">Specialist : {specialist}</h3>
        <h3 className="font-bold text-sm">Contact : {contact}</h3>
        <h3 className="font-bold text-sm">Contact : Rs.{hourlyrate}/-</h3>
        <h3 className="font-bold text-sm">Rating : {rating}⭐</h3>
      </div>
    </div>
    </>
  );
};

export default Mechcard;