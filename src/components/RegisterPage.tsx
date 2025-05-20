
"use client";

import TextInput from "@/components/textInput";
import Button from "@/components/Button";
import Link from "next/link";
import "@/app/style.css";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from 'next/navigation';


import { useState } from "react";
export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [password, setPassword] = useState("");

  const onChangeName = (value:string) => {
    setFullName(value);
  };
  const onChangeEmail = (value:string) => {
    setEmail(value);
  };
  const onChangeMobileNo = (value:string) => {
    setMobileNo(value);
  };
  const onChangePassword = (value:string) => {
    setPassword(value);
  };
  const router = useRouter();

const onClick = async () => {
  const hasError = validation();
  if (hasError)return

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.log("Error in SignUp--> ",error);
    alert(error.message);
    return;
  }

  const {
  data: { session },
  error: sessionError,
} = await supabase.auth.getSession();

if (sessionError || !session || !session.user) {
  alert("User session not available after registration.");
  return;
}

  const user = data?.user;
  console.log("user Data --> ",user)
  if (user) {
    // Insert profile into user_profiles table
    const { error: profileError } = await supabase.from('user_profiles').insert([
      {
        id: user.id,
        full_name: fullName,
        mobile_no: mobileNo,
      },
    ]);

    console.log("Profile Error --> ",profileError);
    if (profileError) {
      alert(profileError.message);
      return;
    }

    alert('Registration successful!');
    router.push('/dashboard');
  }
};



  const validation = () => {

  if (fullName === "") {
    alert("Full name is required.");
    return true;
  }

  if (email === "") {
    alert("Email is required.");
    return true;
  } 

  if (mobileNo.length !== 10) {
    alert("Mobile number should be 10 digits.");
    return true;
  } 

  if (password.length < 8) {
    alert("Password should be at least 8 characters.");
    return true;
  } 

  return false;
};



  return (
    <div className="hw100 centerDiv min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#141A39] to-[#1E215D] p-4">
        <Box sx={{
            display:"flex",
            height:"70%",
            flexWrap: 'wrap',

        }}>
            <Paper elevation={3} sx={{padding:"20px", borderRadius:"22px"}}>

      <div className="mt-4 text-center">
        <div>
            <h1 className="heading">Rental Property Tracking</h1>

            <h2 className="heading">Register</h2>
          <TextInput
            label="Full Name"
            name="Full Name"
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e)=>onChangeName(e.target.value)}
            id="name"
          />
        </div>
        <div>
          <TextInput
            label="Mobile No"
            name="Mobile Number"
            type="text"
            placeholder="Mobile Number"
            value={mobileNo}
            onChange={(e)=>onChangeMobileNo(e.target.value)}
            id="mobileNumber"
          />
        </div>
        <div>
          <TextInput
            label="Email Id"
            name="Email Id"
            type="email"
            placeholder="Email Id"
            value={email}
            onChange={(e)=>onChangeEmail(e.target.value)}
            id="emailId"
          />
        </div>
        <div>
          <TextInput
            label="Password"
            name="Password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>onChangePassword(e.target.value)}
            id="password"
          />
        </div>
        <div>
          <Button
            name="Register"
            onClick={onClick}
            color="primary"
            variant="contained"
          />
        </div>

        <p className="mt-4 ">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-blue-500 underline">
            Login here
          </Link>
        </p>
      </div>
            </Paper>
        </Box>
        
    </div>
  );
}
