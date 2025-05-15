
"use client";

import TextInput from "@/components/textInput";
import Button from "@/components/Button";
import Link from "next/link";
import "../../style.css";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';


import { useState } from "react";
export default function registerPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [password, setPassword] = useState("");
  const [fullNameErr, setFullNameErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [mobileNoErr, setMobileNoErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");

  const onChangeName = (value:string) => {
    setFullName(value);
  };
  const onChangeEmail = (value:string) => {
    setEmail(value);
  };
  const onChangeMobileNo = (value:string) => {
    setMobileNo(value);
    setMobileNoErr("");
  };
  const onChangePassword = (value:string) => {
    setPassword(value);
    setPasswordErr("");
  };
  const onClick = () => {
    console.log("button click");
    validation();
    if(fullNameErr ==="" || emailErr ==="" || mobileNoErr ==="" || passwordErr ===""){
        const alertMsg = `${fullNameErr} 
        ${emailErr} 
        ${mobileNoErr} 
        ${passwordErr}`
        alert(alertMsg);
        return
    }
  };


  const validation =()=>{
    if(fullName ==="" && mobileNo ==="" && email ==="" && password ===""){
        
        return;
    }else{
        if(mobileNo.length !== 10){
            setMobileNoErr("Mobile number should be 10 digits.")
            return;
        }
        if(password.length < 8){
            setPasswordErr("Password should be minimum 8 digits.");
            return;
        }
    }
  }


  return (
    <div className="hw100 centerDiv">
        <Box sx={{
            display:"flex",
            height:"70%",
            flexWrap: 'wrap',

        }}>
            <Paper elevation={3} sx={{padding:"20px", borderRadius:"22px"}}>

      <div className="mt-4 text-center">
        <div>
            <h1 className="heading">Register</h1>
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
            name="Mobile No"
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
