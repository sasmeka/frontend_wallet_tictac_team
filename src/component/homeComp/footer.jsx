import React from 'react'

function footer() {
    return (
        <>
            <footer className='bg-primary w-full relative right-0 left-0 bottom-0 '>
                <div className='max-w-7xl mx-auto px-5 pb-5 md:pb-0'>
                    <div className='flex md:flex-row flex-col py-5 justify-between h-20 mx-auto items-center'>
                        <div>
                            <p className='text-white text-sm md:text-base'>2020 Zwallet. All right reserved.</p>
                        </div>
                        <div className='flex md:flex-row flex-col gap-x-5'>
                            <p className='text-white text-sm md:text-base'>+62 5637 8882 9901</p>
                            <p className='text-white text-sm md:text-base'>contact@zwallet.com</p>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default footer