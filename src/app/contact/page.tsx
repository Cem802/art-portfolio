import React from 'react'

function Contact() {
  return (
    <div>
        <div
          className="absolute top-0 left-0 w-screen h-screen bg-right bg-no-repeat bg-cover"
          style={{
            backgroundImage: `url('/assets/contactbg.jpg')`,
          }}
        />
        <div className='flex flex-col h-screen justify-center items-center p-4 z-50'>
            <h1 className='text-4xl z-50'>Contact</h1>
            <p className='text-xl z-50'>For any inquiries or commissions, please email me at <a href='mailto:sera.kirciltepeli@gmail.com' className='underline'>sera.kirciltepeli@gmail.com</a></p>
            {/* <p className='text-xl mt-4 z-50'>You can also find me on social media:</p>
            <div className='flex gap-4 z-50'>
                <a href='https://www.instagram.com/aresaiart/' target='_blank' rel='noreferrer noopener' className='text-xl underline'>Instagram</a>
                <a href='https://twitter.com/serakirciltepeli' target='_blank' rel='noreferrer noopener' className='text-xl underline'>Twitter</a>
                <a href='https://www.linkedin.com/in/sera-kirciltepeli/' target='_blank' rel='noreferrer noopener' className='text-xl underline'>LinkedIn</a>
            </div> */}
        </div>
    </div>
  )
}

export default Contact