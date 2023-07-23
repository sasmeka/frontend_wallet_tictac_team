import React, { useEffect, useState, useContext } from 'react'
import Header from '../../component/homeComp/header'
import Footer from '../../component/homeComp/footer'
import Sidebar from '../../component/homeComp/sidebar'

import { useNavigate } from 'react-router-dom'
import useApi from '../../helper/useApi'
import { logout } from '../../store/reducer/user'
import { useDispatch } from "react-redux";

import SuccessContext from "../../helper/context_success";
import ErrorContext from "../../helper/context_error";
import authChecked from '../../helper/authCheck'




function changePin() {
    const navigates = useNavigate()
    const api = useApi()
    const dispatch = useDispatch()

    const [otp, setOtp] = React.useState(new Array(6).fill(""));
    const { error_message, seterror_message } = useContext(ErrorContext);
    const { success_message, setsuccess_message } = useContext(SuccessContext);

    //input value get
    const handleChange = (el, index) => {
        if (isNaN(el.value)) return false

        setOtp([...otp.map((data, i) => (i === index ? el.value : data))])

        if (el.nextSibling) {
            el.nextSibling.focus()
        }
    }

    const changePIN = async () => {
        try {
            await api({
                method: 'PUT',
                url: 'user/change_pin',
                data: {
                    pin: otp.join("")
                }
            })
            dispatch(logout())
            setsuccess_message('success-create-otp')
        } catch (error) {
            seterror_message(error.response.data.message)
        }
    }

        //onClick event
        const submintOtp = () => {
            if (otp.join("").length === 6) {
                changePIN()
            } else {
                seterror_message('need 6 number')
            }
        }
        useEffect(() => {
            document.title = 'Create PIN';
        }, []);
        useEffect(() => {
            setTimeout(() => {
                seterror_message('')
            }, 7000)
        }, [error_message])
    return (
        <>
            <Header />
            <div className='bg-gray-200'>
                <div className="p-5 bg-gray-200 max-w-7xl mx-auto">
                    <div className="md:grid flex flex-col grid-rows-4 grid-flow-col gap-4">
                        <div className="hidden md:flex row-span-4 w-full bg-white auto-cols-min rounded-lg">
                            <Sidebar />
                        </div>
                        <div class="max-h-7xl row-span-4 col-span-10 bg-white rounded-lg overflow-auto">
                            <div className='flex flex-col gap-y-10 justify-between md:text-start text-center p-10 mt-5'>
                                <h1 className='text-lg font-bold'>Add PIN</h1>
                                <p className='text-sm text-gray-400'>
                                Enter your current 6 digits Zwallet PIN below to <br />continue to the next steps.
                                </p>
                            </div>
                            <div className='max-w-7xl md:h-auto h-96 md:mt-24 mt-10'>
                                <div className="flex flex-row items-center justify-center px-2 gap-x-2 md:gap-x-5 mx-auto">
                                        <div className="flex flex-row md:gap-x-1 gap-x-2 mx-auto">
                                        {otp.map((data, i) => {
                                            return (
                                                <input
                                                    type="text"
                                                    name="otp"
                                                    className="md:w-20 md:h-24 w-12 h-16 items-center justify-center text-center md:px-5 px-1 outline-none rounded-xl border border-gray-200 text-2xl md:text-3xl bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                                                    maxLength={1}
                                                    key={i}
                                                    value={data}
                                                    onChange={e => handleChange(e.target, i)}
                                                    onFocus={e => e.target.select()}
                                                />
                                            );
                                        })}
                                    </div>
                                </div>
                                <div className='mx-auto flex justify-center '>
                                    <button onClick={submintOtp} className='bg-gray-200 text-gray-500 md:w-96 w-72 mt-16 h-12 rounded-lg hover:bg-gray-600 hover:text-white'>Continue</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>

    )
}

export default authChecked(true, changePin, ['user'])