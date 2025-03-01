"use client";

import { useState, type FormEvent } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { type ClerkAPIError } from "@clerk/types";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";

export default function Page() {

  const { isLoaded, signUp, setActive } = useSignUp();
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [code, setCode] = useState('');
  const [errors, setErrors] = useState<ClerkAPIError[]>();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Clear any errors that may have occurred during previous form submission
    setErrors(undefined);

    if (!isLoaded) return;

    // Start the sign-up process using the email and password provided
    try {
      await signUp.create({
        emailAddress,
        password,
      })

      // Send the user an email with the verification code
      await signUp.prepareEmailAddressVerification({
        strategy: 'email_code',
      })

      // Set 'verifying' true to display second form
      // and capture the OTP code
      setVerifying(true)
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      if (isClerkAPIResponseError(err)) {
        setErrors((err as { errors: ClerkAPIError[] }).errors);
      }
      console.error(JSON.stringify(err, null, 2))
    }
  }

  // Handle the submission of the verification form
  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isLoaded) return

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      })

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId })
        router.push('/')
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2))
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error('Error:', JSON.stringify(err, null, 2))
    }
  }

  // Display the verification form to capture the OTP code
  if (verifying) {
    return (
      <>
        <h1>Verify your email</h1>
        <form onSubmit={handleVerify}>
          <label id="code">Enter your verification code</label>
          <input value={code} id="code" name="code" onChange={(e) => setCode(e.target.value)} />
          <button type="submit">Verify</button>
        </form>
      </>
    )
  }

  // Display the initial sign-up form to capture the email and password
  return (
    <>
      <div className="flex flex-col items-center gap-y-12 mx-20 mt-8">
        <h1>Sign up</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="email">Enter email address</label>
            <input
              className="border border-lightblue rounded-md"
              id="email"
              type="email"
              name="email"
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">Enter password</label>
            <input
              className="border border-lightblue rounded-md"
              id="password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button type="submit">Continue</button>
          </div>
        </form>
        {errors && (
          <ul>
            {errors.map((el, index) => (
              <li key={index}>{el.longMessage}</li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}