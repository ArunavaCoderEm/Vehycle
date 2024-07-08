import { FC } from 'react'

const ImageFade: FC = (): React.ReactNode => {
  return (
    <div>
      <div className="relative flex max-w-6xl justify-center overflow-hidden">
        <img
          src="./heropicjpg.jpeg"
          alt="Heropic"
          className="h-[28rem] sha w-96 rounded-lg object-cover md:w-[1300px]"
          style={{
            maskImage: `linear-gradient(to top, transparent, black 20%)`,
          }}
        />
      </div>
    </div>
  )
}

export default ImageFade