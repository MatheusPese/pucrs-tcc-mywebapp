// Directive used to delare a boundary between a server and a client component module.
"use client";

// Import necessary modules and components
import type { NextPage } from "next";
import { useForm } from "react-hook-form";
import { useUserService } from "@/app/_services";
import { useState } from "react";
import RegisterForms from "@/app/_components/account/register/RegisterForms";
import Link from "next/link";
import Button from "@/app/_components/globals/Button";

// Define the Register page
const Register: NextPage = () => {
  // HOOKS

  // useUserService hooks
  const userService = useUserService();

  // useForm hooks
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  // useState hooks
  const [isProfile, setIsProfile] = useState(true);

  // Define form fields with validation rules
  const fields = {
    firstName: register("firstName", { required: "First Name is required" }),
    lastName: register("lastName", { required: "Last Name is required" }),
    email: register("email", { required: "E-mail is required" }),
    phone: register("phone", { required: "Phone is required" }),
    password: register("password", {
      required: "Password is required",
      minLength: {
        value: 6,
        message: "Password must be at least 6 characters",
      },
    }),
    password_confirmation: register("password_confirmation", {
      required: "Password confirmation is required",
    }),
  };

  // Function to toggle between profile and password pages
  const changePage = () => {
    setIsProfile(!isProfile);
  };

  // Function to handle form submission
  const onSubmit = async (user: any) => {
    await userService.register(user);
  };

  // Render the component
  return (
    <>
      <div className="flex-1 flex flex-col justify-center items-center">
        <form className="semitransparent-box" onSubmit={handleSubmit(onSubmit)}>
          {/* Render profile form if isProfile is true */}
          {isProfile && (
            <>
              {/* Profile form */}
              <h2 className="text-2xl pb-3">Cadastro</h2>
              <RegisterForms
                firstName={fields.firstName}
                lastName={fields.lastName}
                email={fields.email}
                phone={fields.phone}
                type="profile"
              />
              {/* Navigation buttons */}
              <div className="flex flex-row justify-between gap-2 pt-4">
              <Link href="/account/login">
                <Button type="button" customStyle="transparent" size="medium">
                    Cancelar
                </Button>
              </Link>
                <Button type="button" customStyle="transparent" size="medium" onClick={changePage}>
                  Avançar
                </Button>
              </div>
            </>
          )}
          {/* Render password form if isProfile is false */}
          {!isProfile && (
            <>
              {/* Password form */}
              <h2 className="text-2xl pb-3">Cadastro - Senha</h2>
              <RegisterForms
                password={fields.password}
                confirmPassword={fields.password_confirmation}
                type="password"
              />
              {/* Navigation buttons */}
              <div className="flex flex-row justify-between gap-2 pt-4">
                <Button type="button" customStyle="transparent" size="medium" onClick={changePage}>
                  Voltar
                </Button>
                <Button
                  type="submit" customStyle="transparent" size="medium"
                  disabled={formState.isSubmitting}
                >
                  {/* Show spinner while form is submitting */}
                  {formState.isSubmitting && (
                    <span className="spinner-border spinner-border-sm me-1"></span>
                  )}
                  Enviar
                </Button>
              </div>
            </>
          )}
        </form>
      </div>
    </>
  );
};

// Export the Register component as the default export
export default Register;
