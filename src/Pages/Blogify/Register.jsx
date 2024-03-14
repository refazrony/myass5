import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Field from "../../components/Others/Field";
import axios from "axios";
import { useRef } from "react";
import { notifySucccess } from "../../utls/myToast";


function Register() {

    const { register, handleSubmit, formState: { errors }, } = useForm();
    const errorTxtfer = useRef();
    const navigator = useNavigate()


    const submitRegterForm = async (values) => {
        try {

            console.log(values);
            const formData = new FormData();
            formData.append("email", values.email)
            formData.append("password", values.password)
            formData.append("firstName", values.firstName)
            formData.append("lastName", values.lastName)


            console.log(formData);
            const response = await axios.post(`${import.meta.env.VITE_SERVER_BASE_URL}/auth/register`, values);



            console.log(response.data)
            navigator("/login");
            notifySucccess("Register Successfully")



        } catch (error) {
            console.error(error);
            errorTxtfer.current.innerText = "User  already exists! Please login.";
        }

    }

    function handleOnchange() {
        errorTxtfer.current.innerText = "";
    }

    return (
        <main>
            <section className="container">
                <div className="w-full md:w-1/2 mx-auto bg-[#030317] p-8 rounded-md mt-12">
                    <h2 className="text-2xl font-bold mb-6">Register</h2>
                    <h2 ref={errorTxtfer} className="text-2xl font-bold mb-6 "></h2>
                    <form onSubmit={handleSubmit(submitRegterForm)} >
                        <div className="mb-6">

                            <Field label="First Name" error={errors.firstName}>
                                <input
                                    {...register("firstName", { required: "First Name is Required" })}
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    className={`w-full p-3 bg-[#030317] border 
                                ${errors.email ? "border-red-500" : "border-white/20"}  
                                rounded-md focus:outline-none focus:border-indigo-500`}
                                />
                            </Field>

                        </div>
                        <div className="mb-6">

                            <Field label="Last Name" error={errors.lastName}>
                                <input
                                    {...register("lastName", { required: "Last Name is Required" })}
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    className={`w-full p-3 bg-[#030317] border 
                                    ${errors.email ? "border-red-500" : "border-white/20"}  
                                    rounded-md focus:outline-none focus:border-indigo-500`}
                                />
                            </Field>

                        </div>
                        <div className="mb-6">


                            <Field label="Email" error={errors.email}>
                                <input
                                    {...register("email", { required: "Email  is Required" })}
                                    type="email"
                                    id="email"
                                    name="email"
                                    onChange={handleOnchange}
                                    className={`w-full p-3 bg-[#030317] border 
                                    ${errors.email ? "border-red-500" : "border-white/20"}  
                                    rounded-md focus:outline-none focus:border-indigo-500`}
                                />
                            </Field>
                        </div>
                        <div className="mb-6">
                            <Field label="Password" error={errors.password}>
                                <input
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 8,
                                            message: "Your password must be at least 8 characters",
                                        },
                                    })}
                                    type="password"
                                    id="password"
                                    name="password"
                                    className={`w-full p-3 bg-[#030317] border 
                                    ${errors.email ? "border-red-500" : "border-white/20"}  
                                    rounded-md focus:outline-none focus:border-indigo-500`}
                                />
                            </Field>
                        </div>
                        <div className="mb-6">
                            <button
                                type="submit"
                                className="w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
                            >
                                Create Account
                            </button>
                        </div>
                        <p className="text-center">
                            Already have account?{" "}
                            <Link to="/login" className="text-indigo-600 hover:underline">
                                Login
                            </Link>
                        </p>
                    </form>
                </div>
            </section>
        </main>);
}

export default Register;