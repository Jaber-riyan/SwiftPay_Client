import React, { useEffect, useRef, useState } from 'react';
import { FiMail, FiLock } from 'react-icons/fi';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
import { FaClosedCaptioning } from "react-icons/fa6";
import { useForm } from 'react-hook-form';
import useAuth from '../../../Hooks/UseAuth/UseAuth';
import SocialLogin from '../../../Components/SocialLogin/SocialLogin';
import UseAxiosNormal from '../../../Hooks/UseAxiosSecureAndNormal/UseAxiosNormal';
import { v4 as uuidv4 } from "uuid";



const Login = () => {
    const { handleLogin, user, googleRegister, setLoading, setUser } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const captchaRef = useRef(null);
    const [captchaMatch, setCaptchaMatch] = useState(false);
    const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm();
    const axiosInstanceNormal = UseAxiosNormal();
    const emailRef = useRef(null)
    const passwordRef = useRef(null)


    useEffect(() => {
        loadCaptchaEnginge(7);
        setCaptchaMatch(false)
    }, [])


    useEffect(() => {
        if (user) {
            toast.info("You Logged in ")
            navigate(location?.state || '/');
        }
    }, [user, navigate, location]);


    const handleValidateCaptcha = (e) => {
        const user_captcha_value = captchaRef.current.value;
        // console.log(user_captcha_value);
        if (validateCaptcha(user_captcha_value)) {
            toast.success("Successfully validated captcha");
            setCaptchaMatch(true);
        }
        else {
            toast.error("Invalid captcha!");
            setCaptchaMatch(false);
        }
    }

    const getDeviceId = () => {
        let deviceId = localStorage.getItem('deviceId'); // Check if a device ID exists
        if (!deviceId) {
            deviceId = uuidv4(); // Generate a new one if not found
            localStorage.setItem('deviceId', deviceId); // Store it in localStorage
        }
        return deviceId;
    };

    const handleSubmitLogin = async (data) => {
        const email = data?.['email'];
        const pin = data?.['pin'];
        const deviceId = getDeviceId()

        if (pin.length !== 6) {
            toast.error("PIN Should Be 6 Character.");
            return;
        }

        console.table({ email, pin, deviceId });

        const userInfo = {
            email, pin, deviceId
        }
        const { data: userInsertInfo } = await axiosInstanceNormal.post('/login-user', userInfo);
        console.log(userInsertInfo);
        if (userInsertInfo.deviceLogin) {
            Swal.fire({
                title: userInsertInfo.message,
                showDenyButton: true,
                confirmButtonText: "Yes",
                denyButtonText: `No`
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const { data } = await axiosInstanceNormal.get(`/logout-all-devices/${email}`)
                    if (data.status) {
                        toast.success(data.message);
                    }
                }
            });
        }

        else if (!userInsertInfo?.status) {
            toast.error(userInsertInfo.message)
        }
        else {
            handleLogin(email, pin)
                .then(async (res) => {
                    // console.log(location);
                    const user = res.user;
                    const userInfo = {
                        name: user?.displayName,
                        email,
                        lastLoginTime: user.metadata.lastSignInTime,
                    }
                    const { data } = await axiosInstanceNormal.post('/users', userInfo);
                    // console.log(data);
                    if (data.data.insertedId || data.status === false) {
                        // console.log(data);
                        Swal.fire({
                            title: 'Successfully Login!',
                            icon: 'success'
                        })
                        navigate(location?.state || '/');
                    }
                })
                .catch(error => {
                    const errorCode = error.code.split("auth/")[1];
                    const formattedError = errorCode
                        ?.split("-")
                        ?.map(word => word.charAt(0).toUpperCase() + word.slice(1))
                        ?.join(" ");
                    toast.error(formattedError);
                    setLoading(false)
                    navigate('/login');
                })
        }

    }

    const fillValidCredentials = (type) => {
        let email, password;

        if (type === "admin") {
            email = import.meta.env.VITE_ADMIN_EMAIL;
            password = import.meta.env.VITE_ADMIN_PASSWORD;
        } else if (type === "agent") {
            email = import.meta.env.VITE_AGENT_EMAIL;
            password = import.meta.env.VITE_AGENT_PASSWORD;
        } else {
            email = import.meta.env.VITE_USER_EMAIL;
            password = import.meta.env.VITE_USER_PASSWORD;
        }

        console.log("Filling credentials:", { email, password });

        if (!email || !password) {
            toast.error("Environment variables not loaded properly!");
            return;
        }

        setValue("email", email);
        setValue("pin", password);
        setCaptchaMatch(true);

        console.log("Filled credentials successfully!");
    };



    return (
        <div className="bg-[url('https://i.ibb.co.com/C5YrLhL/authentication.png')] md:p-20 p-10">
            <div className="flex lg:flex-row flex-col-reverse gap-10 items-center rounded-lg justify-center p-8 shadow-2xl">
                <Helmet>
                    <title>Login | SwiftPay
                    </title>
                </Helmet>
                <img className='animate__animated animate__bounceInLeft' src="https://i.ibb.co.com/9cwJPtr/authentication2.png" onContextMenu={e => e.preventDefault()} draggable={false} alt="" />
                <form onSubmit={handleSubmit(handleSubmitLogin)} className="w-full max-w-md py-20 px-8 space-y-6 animate__animated animate__bounceInRight">
                    <h2 className="text-3xl font-bold text-center text-[#000]">Login</h2>

                    {/* auto credential full fill buttons  */}
                    <div className='border-t-2 border-zinc-300 pt-3 pb-3 border-b-2'>
                        <div className='flex gap-2'>
                            <button onClick={() => fillValidCredentials("user")} className={`w-full py-2 mt-4 rounded-md text-white bg-[#1D4ED8] hover:bg-[#1e3a8a]`}>
                                User
                            </button>

                            <button onClick={() => fillValidCredentials("agent")} className={`w-full py-2 mt-4 rounded-md text-white bg-[#10B981] hover:bg-[#059669]`}>
                                Agent
                            </button>

                            <button onClick={() => fillValidCredentials("admin")} className={`w-full py-2 mt-4 rounded-md text-white bg-[#F59E0B] hover:bg-[#d97706]`}>
                                Admin
                            </button>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-[#000]" htmlFor="email">
                                Email
                            </label>
                            <div className="">
                                <input
                                    type="email"
                                    id="email"
                                    name='email'
                                    {...register("email", { required: true })}
                                    placeholder="Enter your email"
                                    className="w-full px-4 py-2 border rounded-lg outline-none bg-[#ffffffce] focus:border-gray-400"
                                />
                            </div>
                            {errors.email && <span className="text-red-500">This field is required</span>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#000]" htmlFor="pin">
                                Pin (must 6 digit)
                            </label>
                            <div>
                                <input
                                    type="password"
                                    id="pin"
                                    name='pin'
                                    {...register("pin", { required: true })}
                                    placeholder="Enter your 6 digit PIN"
                                    className="w-full px-4 py-2 border rounded-lg outline-none bg-[#ffffffce] focus:border-gray-400"
                                />
                            </div>
                            {errors.pin && <span className="text-red-500">This field is required</span>}
                        </div>
                        <div>
                            <label className="flex items-center gap-2 font-medium text-[#000] mb-2" htmlFor="captcha">
                                <FaClosedCaptioning className="w-5 h-5 text-black" />
                                <LoadCanvasTemplate></LoadCanvasTemplate>
                            </label>
                            <div className="flex items-center mt-1">
                                <FaClosedCaptioning className="w-5 h-5 text-black" />
                                <input
                                    type="text"
                                    id="captcha"
                                    ref={captchaRef}
                                    name='captcha'
                                    placeholder="Type the captcha"
                                    className="w-full px-4 py-2 ml-2 mr-2 border rounded-lg outline-none bg-[#ffffffce] focus:border-gray-400"
                                />
                                <button type='button' onClick={handleValidateCaptcha} className='btn btn-outline btn-xs font-bold bg-black text-white'>Validate</button>
                            </div>
                        </div>
                    </div>
                    <p className="mt-4 text-sm text-[#000]">
                        <Link to={`/forgat-password`} className="underline text-[#000]">
                            Forgat Password?
                        </Link>

                    </p>


                    {/* <button disabled={!captchaMatch} className={`w-full py-2 mt-4 rounded-md  text-white ${!captchaMatch ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#D1A054B3] hover:bg-[#d19f54f8]'}`}>
                        Login
                    </button> */}
                    <button className={`w-full py-2 mt-4 rounded-md  text-white bg-[#D1A054B3] hover:bg-[#d19f54f8]`}>
                        Login
                    </button>
                    <div className="divider"></div>
                    {/* <SocialLogin></SocialLogin> */}

                    <p className="mt-4 text-center text-sm text-[#000]">
                        Don't Have An Account?{' '}
                        <Link to="/register" className="text-red-500 hover:underline">
                            Register
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;