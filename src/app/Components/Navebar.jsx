import React from 'react'

const Navebar = () => {
  return (
      <div className='px-3 bg-blue-200 border border-black'>
          <div className='flex py-3 flex-wrap justify-between'>
          <h1>
              TODO App
          </h1>
          <ul className='flex gap-2 px-2 '>
              <li>Home</li>
              <li>About</li>
              <li>Setting</li>
              <li>Contact</li>
              
          </ul>
    </div>
      </div>
  )
}

export default Navebar