"use client";

import TextInput from "@/components/textInput";
import Button from "@/components/Button";
import Link from "next/link";
import "../../style.css";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';


import { useState } from "react";
export default function login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const onChange = () => {
    console.log("onchange call");
  };
  const onClick = () => {
    console.log("button click");
  };

  return (
    <div className="hw100 centerDiv">
        <Box sx={{
            display:"flex",
            height:"60%",
            flexWrap: 'wrap',

        }}>
            <Paper elevation={3} sx={{padding:"20px", borderRadius:"22px"}}>

      <div className="mt-4 text-center">
        <div>
            <h1 className="heading">Login</h1>
          <TextInput
            label="UserName"
            name="username"
            type="text"
            placeholder="Username"
            value={userName}
            onChange={onChange}
            id="username"
          />
        </div>
        <div>
          <TextInput
            label="Password"
            name="Password"
            type="text"
            placeholder="Password"
            value={password}
            onChange={onChange}
            id="password"
          />
        </div>
        <div>
          <Button
            name="Submit"
            onClick={onClick}
            color="primary"
            variant="contained"
          />
        </div>

        <p className="mt-4 ">
          Don't have an account?{" "}
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
