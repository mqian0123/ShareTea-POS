import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode'


function ManagerLogin () {
    const navigate = useNavigate();

    return (


        <>
            <section class="bg-gray-50 dark:bg-gray-900">
            <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

                {/* Heading */}
                <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    {/* <img class="w-8 h-8 mr-2" src={logo} alt="logo" /> */}
                    Share Tea    
                </a>

                {/* Login Card */}
                <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>
                        <form class="space-y-4 md:space-y-6" action="#">

                            {/* Email */}
                            <div>
                                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                            </div>

                            {/* Password */}
                            <div>
                                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                            </div>

                            {/* Divider */}
                            <div class="inline-flex items-center justify-center w-full">
                                <hr class="w-64 h-px my-8 bg-gray-200 border-0" />
                                <span class="absolute px-3 font-medium text-gray-900 -translate-x-1/2 left-1/2 dark:text-white bg-gray-800 ">or</span>
                            </div>

                            {/* Google Login */}
                            <div className='flex justify-center'>
                                <GoogleLogin shape='pill'
                                            onSuccess={(response) => {
                                                const userName = jwtDecode(response.credential).name;
                                                const email = jwtDecode(response.credential).email;
                                                navigate('/manager/dashboard',  { state: {userName, email} });
                                            }
                                            }
                                            onError={() => {
                                                console.log('Login Failed');
                                            }}
                                />
                            </div>
                            
                            <div class="flex items-center justify-between">
                                <div class="flex items-start">
                                    <div class="flex items-center h-5">
                                        <input id="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                                    </div>
                                    {/* //TODO: Implement the funcionality of remembering users */}
                                    <div class="ml-3 text-sm">
                                        <label for="remember" class="text-gray-500 dark:text-gray-300">Remember me</label>
                                    </div>
                                </div>
                                {/* //TODO: Implement the funcionality for resetting the password */}
                                <a href="#" class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                            </div>

                            {/* Sign in button 
                                //TODO: Check user credentials before logging in
                            */}
                            <button onClick = {() => navigate('/manager/dashboard')} type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                    
                        </form>
                    </div>
                </div>
            </div>
            </section>
        </>
        
    )
}

export default ManagerLogin