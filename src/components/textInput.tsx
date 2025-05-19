"use client";

import React from "react";
import TextField from "@mui/material/TextField";

interface Props {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string |number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id: string;
}

export default function TextInput({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  id,
}: Props) {
  return (
    <div className="mb-4">
      <TextField
        name={name}
        label={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
        id={id}
        size="small"
      />
    </div>
  );
}
