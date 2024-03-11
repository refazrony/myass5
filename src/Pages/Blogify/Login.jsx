import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Field from "../../components/Others/Field"
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../constexts";
import { useProfile } from "../../Hooks/useProfile";
import { actions } from "../../actions";
import { notifyError } from "../../utls/myToast";





function Login() {
    const { user, setUser, BasedUrl } = useContext(AuthContext);
    const nav = useNavigate();
    const { dispatch } = useProfile();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const submitForms = async (formData) => {
        const requestUrl = `${BasedUrl}/auth/login`;
        try {

            const response = await axios.post(requestUrl, formData);
            if (response.status === 200) {

                setUser(response.data);
                // const { user } = response.data;
                dispatch({
                    type: actions.profile.USER_DATA_EDITED,
                    data: response.data,
                });
                nav('/', { replace: true });

            }
            else if (response.status === 500) {
                notifyError(response.data.error);
            }
        }
        catch (error) {
            console.log(error);

        }

    }

    // after login not redirect to login page again
    if (Object.keys(user).length) {
        nav(-1);
    }


    return (
        <main>
            <section className="container">
                {/* Login Form into a box center of the page */}
                <div className="w-full md:w-1/2 mx-auto bg-[#030317] p-8 rounded-md mt-12">
                    <h2 className="text-2xl font-bold mb-6">Login</h2>
                    <form onSubmit={handleSubmit(submitForms)}>
                        <div className="mb-6">

                            <Field label="Email" error={errors.email}>
                                <input
                                    {...register("email", { required: "Email ID is Required" })}
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={"rony@gmail.com"}
                                    className={`w-full p-3 bg-[#030317] border
                                    ${errors.email ? "border-red-500" : "border-white/20"}
                                      rounded-md focus:outline-none focus:border-indigo-500`}
                                />
                            </Field>

                        </div>
                        <div className="mb-6">
                            {/* <label htmlFor="password" className="block mb-2">
                                Password
                            </label> */ }
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
                                    value={"12341234"}
                                    className="w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500"
                                />
                            </Field>
                        </div>
                        <div className="mb-6">
                            <Field>
                                <button

                                    className="w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
                                >
                                    Login
                                </button>
                            </Field>
                        </div>
                        <p className="text-center">
                            Do not have an account?{" "}
                            <Link to="/register" className="text-indigo-600 hover:underline">
                                Register
                            </Link>
                        </p>
                    </form>
                </div>
            </section>
        </main>

    );
}

export default Login;