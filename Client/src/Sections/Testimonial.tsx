import { FC, useEffect, useState } from 'react'

const testimonials = [
    {
        name: 'Sohan Karfa',
        description:
          "Vehycle is an excellent platform for finding reliable mechanics and customers. It's easy to navigate and has a lot of useful features. I've been using it for a while now and I'm really impressed with the results.",
      },
      {
        name: 'Suranjan Nemo',
        description:
          "Vehycle has been a game-changer for finding the right mechanics and customers. It's straightforward to use and packed with features. I've been using it for some time now and couldn't be happier with the experience.",
      },
      {
        name: 'Supratim Nandi',
        description:
          "Vehycle is the perfect platform for anyone looking to connect with mechanics or customers. It's incredibly easy to use and offers everything you need. I've been using it for a while and I'm very pleased with the results.",
      },
      {
        name: 'Krishna Karmakar',
        description:
          "Vehycle is a great tool for finding mechanics and customers. It's simple to use and has a lot of features that make the process smooth. I've been using it for some time now and I'm really happy with how it works.",
      },
      {
        name: 'Nishan Bag',
        description:
          "Vehycle is a top-notch platform for connecting with mechanics and customers. It's very intuitive and loaded with features that make the process seamless. I've been using it for a while and I'm thoroughly impressed with the results.",
      },
      {
        name: 'Arnab Pal',
        description:
          "Vehycle has made finding the right mechanics and customers incredibly easy. It's user-friendly and offers an extensive range of features. I've been using it for some time now and I'm extremely satisfied with the outcomes.",
      },  
]
interface TestimonalCardProps {
  name: string
  description: string
}

const TestimonialCard: FC<TestimonalCardProps> = ({
  name,
  description,
}) => {


  return (
    <div
      className={`card-shadow dark:border-neutral-90 relative flex h-auto max-w-[22rem] bg-gradient-to-b from-black/70 to-black/80 select-none flex-col items-start justify-center overflow-hidden rounded-2xl border border-neutral-100 p-5 shadow-sm transition-all duration-300 ease-in-out hover:scale-[.98] hover:shadow-sm hover:shadow-white/10`}
    >
      <div className="absolute right-0 top-0 h-24 w-24 rounded-2xl bg-gradient-to-r from-pink-400  to-pink-300 opacity-20 blur-3xl"></div>
      <div className="mb-0 flex h-fit flex-row items-center gap-3">
        <div className="mb-0 flex h-fit flex-col items-start">
          <h3 className="m-0 text-base font-semibold text-pink-500">
            {name}
          </h3>
        </div>
      </div>
      <p className="mb-0 mt-3 text-left text-sm font-light text-gray-100 md:text-base dark:text-gray-100">
        {description}
      </p>
    </div>
  )
}

const Testimonals = () => {
    
    const [test, setTest] = useState<TestimonalCardProps[]>([])

    useEffect(() => {
        setTest(testimonials)
    },[test, testimonials])

  return (
    <div className="flex flex-col items-center justify-center gap-5 py-12 p-2">
      <h1 className="mb-1 max-w-2xl text-center text-2xl  underline underline-offset-4tracking-tighter text-gray-900 md:text-4xl font-extrabold">
        <span className='font-extrabold text-pink-600'>W</span>hy <span className='font-extrabold text-pink-600'>V</span>ehycle
      </h1>
      <p className="max-w-2xl text-center text-lg font-light text-black">
      Vehycle provides you with a seamless experience in finding the right mechanics or customers.
      </p>
      <div className="relative mt-12 flex h-full w-full flex-col items-center justify-center gap-5 md:flex-row">
        {[0, 1, 2].map((colIndex) => (
          <div key={colIndex} className="flex flex-col justify-center gap-4">
            {test
              .slice(colIndex * 2, colIndex * 2 + 2)
              .map((testimonial) => (
                <TestimonialCard key={testimonial.name} {...testimonial} />
              ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Testimonals