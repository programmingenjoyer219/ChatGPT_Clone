import { BoltIcon, ExclamationTriangleIcon, SunIcon } from '@heroicons/react/24/outline'

export default function Home() {
  return (
    <div className='flex flex-col items-center justify-center h-screen text-white px-2'>
      <h1 className='text-5xl font-bold mb-20'>ChatGPT</h1>

      <div className='flex space-x-2 text-center'>
        <div id='home-page-col-1'>

          <div className='flex flex-col justify-center items-center mb-5'>
            {/* Sun icon */}
            <SunIcon className='h-6 w-6' />
            <h2>Examples</h2>
          </div>

          <div className='space-y-2'>
            <p className='infoText'>"Explain something to me"</p>
            <p className='infoText'>"What is the difference between a dog and a cat?"</p>
            <p className='infoText'>"What is the color of the sun?"</p>
          </div>

        </div>

        <div id='home-page-col-2'>

          <div className='flex flex-col justify-center items-center mb-5'>
            {/* Sun icon */}
            <BoltIcon className='h-6 w-6' />
            <h2>Capabilities</h2>
          </div>

          <div className='space-y-2'>
            <p className='infoText'>Change the ChatGPT model to use</p>
            <p className='infoText'>Messages are stored in Firebase's Firestore</p>
            <p className='infoText'>Hot toast notifications when ChatGPT is thinking</p>
          </div>

        </div>

        <div id='home-page-col-3'>

          <div className='flex flex-col justify-center items-center mb-5'>
            {/* Sun icon */}
            <ExclamationTriangleIcon className='h-6 w-6' />
            <h2>Limitations</h2>
          </div>

          <div className='space-y-2'>
            <p className='infoText'>May ocassionaly generate incorrect information</p>
            <p className='infoText'>My ocassionaly produce harmful instructions or biased content</p>
            <p className='infoText'>Limited knowledge of world and events after 2021</p>
          </div>

        </div>
      </div>
    </div>
  )
}
