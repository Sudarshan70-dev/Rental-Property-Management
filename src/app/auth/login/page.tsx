"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../../lib/supabaseClient";
import TextInput from "@/components/textInput";
import Button from "@/components/Button";
import Link from "next/link";
import "../../style.css";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

export default function LoginPage() {
  const router = useRouter();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const onChangeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onClick = async () => {
    setError("");

    if (!userName || !password) {
      setError("Both fields are required.");
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: userName,
      password: password,
    });
    console.log("Error in login ---> ", error);
    if (error) {
      setError(error.message);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="hw100 centerDiv">
      <Box
        sx={{
          display: "flex",
          height: "60%",
          flexWrap: "wrap",
        }}
      >
        <Paper elevation={3} sx={{ padding: "20px", borderRadius: "22px" }}>
          <div className="mt-4 text-center">
            <h1 className="heading">Login</h1>

            <TextInput
              label="Email"
              name="username"
              type="email"
              placeholder="Enter your email"
              value={userName}
              onChange={onChangeUserName}
              id="username"
            />

            <TextInput
              label="Password"
              name="Password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={onChangePassword}
              id="password"
            />

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            <Button
              name="Submit"
              onClick={onClick}
              color="primary"
              variant="contained"
            />

            <p className="mt-4">
              Don&apos;t have an account?{" "}
              <Link href="/auth/register" className="text-blue-500 underline">
                Register here
              </Link>
            </p>
          </div>
        </Paper>
      </Box>
    </div>
  );
}
