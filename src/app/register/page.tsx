"use client";

import { useState } from "react";
import { InputField } from "../components/InputField";
import { Button } from "../components/Button";
import { registerUserSchema } from "../common/registerSchema";
import { LoadingIndicator } from "../components/LoadingIndicator";
import { ErrorMessage } from "../components/ErrorMessage";
import { hasFieldError } from "../utils/helpers";
import Link from "next/link";

export default function Register() {
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorFields, setErrorFields] = useState<string[]>([]);

  const handleRegister = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const result = registerUserSchema.safeParse({
      name,
      email,
      password,
      confirmPassword,
    });

    if (!result.success) {
      const errors = result.error.errors
        .map((error, i) => `${i + 1}. ${error.message}`)
        .join("\n");

      setError(errors);
      setErrorFields(Object.keys(result.error.formErrors.fieldErrors));
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          confirmPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Something went wrong! Try again.");
      } else {
        setShowSuccessMessage(true);
        setError("");
        setErrorFields([]);
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center h-screen mt-10">
      <form>
        <div className="flex flex-row justify-center text-2xl mt-2">
          <span className="font-bold">Registration</span>
        </div>
        <div className="flex flex-row justify-center text-sm mt-1">
          <div className="font-light">All fields are mandatory</div>
        </div>
        <div className="w-full max-w-lg min-w-md">
          <InputField
            label="Name"
            onChange={(value: string) => setName(value)}
            value={name}
            hasError={hasFieldError("name", errorFields)}
          />
        </div>
        <div className="w-full max-w-lg min-w-md">
          <InputField
            label="Email"
            onChange={(value: string) => setEmail(value)}
            value={email}
            type="email"
            hasError={hasFieldError("email", errorFields)}
          />
        </div>
        <div className="w-full max-w-lg min-w-md">
          <InputField
            label="Password"
            onChange={(value: string) => setPassword(value)}
            value={password}
            type="password"
            hasError={hasFieldError("password", errorFields)}
          />
        </div>
        <div className="w-full max-w-lg min-w-md">
          <InputField
            label="Confirm Password"
            onChange={(value: string) => setConfirmPassword(value)}
            value={confirmPassword}
            type="password"
            hasError={hasFieldError("confirmPassword", errorFields)}
          />
        </div>
        <LoadingIndicator isLoading={isLoading} loadingText="Registering ..." />
        {showSuccessMessage && (
          <div className="w-full max-w-lg mt-4 mx-auto min-w-sm text-center">
            Registration successful. Please{" "}
            <a href="/login" className="text-green font-bold">
              {" "}
              login
            </a>{" "}
            now to visit the chatrooms 😊.
          </div>
        )}
        <ErrorMessage error={error} />
        <div className="m-auto mt-4 p-4 w-full max-w-sm">
          <Button label="Register" onClick={handleRegister} />
        </div>
      </form>

      <div className="flex flex-row items-center mt-4">
        Already have an account?&nbsp;<Link href={"/login"}>Login here</Link>
      </div>
    </div>
  );
}
