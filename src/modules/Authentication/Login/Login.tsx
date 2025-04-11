import { Link, useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useContext, useState } from "react";
import { EMAIL_VALIDATION, PASSWORD_VALIDATION } from "../../services/validation/validation.ts";
import { USER_URLS } from "../../services/api/apiConfig.ts";
import {puplicAxiosInstance} from "../../services/api/apiInstance.ts";
import {AxiosError} from "axios";
import styles from './login.module.css';
import {LoginFormData, LoginResponse} from "../../Interfaces/User.ts";
import { Authcontext } from "../../AuthContext/AuthContext.tsx";

export default function Login() {
  const authContext = useContext(Authcontext);

  if (!authContext) {
    throw new Error("Authcontext is not provided");
  }
  const { saveLoginData } = authContext;
  const {
    register,
    formState: { errors , isSubmitting },
    handleSubmit } = useForm<LoginFormData>();

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await puplicAxiosInstance.post<LoginResponse>(
          USER_URLS.LOGIN,
          data
      );
      localStorage.setItem('token', response.data.token);
      saveLoginData();
      toast.success('welcome');
      navigate('/dashboard');
    } catch (error) {
        if (error instanceof AxiosError ) {
          toast.error(error.response?.data?.message || 'An error occurred');
        } else {
          toast.error('An unexpected error occurred');
        }
    }
  }

  return (
      <>
        <div className="mt-5 p-5 position-relative text-start rounded-3" id={styles.loginForm}>
          <div className="title my-3">
            <p>welcome to PMS</p>
            <h1 className="text-warning">Login</h1>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-3 mb-2">
              <Form.Label htmlFor="inputPassword5" className="text-warning">Email</Form.Label>
              <input {...register("email", EMAIL_VALIDATION)} autoComplete="current-password" type="text" className="form-control"
                     placeholder="Enter your E-mail" aria-label="Username" aria-describedby="basic-addon1" />
            </div>
            {errors.email && <span className="text-danger">{errors.email.message}</span>}
            <div className="mt-3 mb-2">
              <Form.Label htmlFor="inputPassword5" className="text-warning" vali>Password</Form.Label>
              <div className="position-relative">
                <input
                    {...register("password", PASSWORD_VALIDATION)}
                    type={showPassword ? "text" : "password"}
                    className="form-control pe-5"  // Add right padding for the eye icon
                    placeholder="Password"
                    id="inputPassword5"
                />
                <button
                    type="button"
                    className="btn btn-link position-absolute end-0 top-50 translate-middle-y me-2"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ zIndex: 2 }}
                >
                  <i className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
            </div>
            {errors.password && <span className="text-danger">{errors.password.message}</span>}
            <div className="links d-flex justify-content-between my-4">
              <Link to="/register" className="text-white text-decoration-none">Register Now ?</Link>
              <Link to="/forget-password" className="text-white text-decoration-none">Forget Password ?</Link>
            </div>
            {/*#EF9B28*/}
            <button type="submit" disabled={isSubmitting} className="rounded-5 btn w-100 btn-warning">
              {isSubmitting? <i className="fa fa-spin fa-spinner"></i> :'Login'}</button>
          </form>
        </div>

      </>
  )
}