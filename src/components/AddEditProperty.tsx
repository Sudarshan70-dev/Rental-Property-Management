"use client";
import TextInput from "@/components/textInput";
import Grid from "@mui/material/Grid";
import { ChangeEvent, useState } from "react";
import Button from "@/components/Button";
import { supabase } from "../../lib/supabaseClient";


type PropertyFormData = {
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  rent: string;
  dueDate: string;
};

export default function AddEditProperty(props={}, edit=false) {

  const initialData = props?.initialData
  console.log("initial data is -=--> ",initialData)
  
  const [street, setStreet] = useState(initialData?.address || "");
  const [city, setCity] = useState(initialData?.city || "");
  const [state, setState] = useState(initialData?.state || "");
  const [postalCode, setPostalCode] = useState(initialData?.postal_code || "");
  const [country, setCountry] = useState(initialData?.country || "");
  const [noOfUnit, setNoOfUnit] = useState(initialData?.no_of_unit || 0);
  const [monthlyRent, setMonthlyRent] = useState(initialData?.rent || 0);
  const [dueDay, setDueDay] = useState(initialData?.rent_due_day || 0);

  const onChangeStreet = (e:ChangeEvent<HTMLInputElement>) => {
    setStreet(e.target.value)
  };
  const onChangeCity = (e:ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value)
  };
  const onChangeState = (e:any) => {
    setState(e.target.value)
  };
  const onChangePostalCode = (e:any) => {
    setPostalCode(e.target.value)
  };
  const onChangeCountry = (e:any) => {
    setCountry(e.target.value)
  };
  const onChangeNoOfUnit = (e:any) => {
    setNoOfUnit(e.target.value)
  };
  const onChangeMonthlyRent = (e:any) => {
    setMonthlyRent(e.target.value)
  };
  const onChangeDueDay = (e:any) => {
    setDueDay(e.target.value)
  };




  const onSubmit = async () => {
  // Validate form
  console.log("submit called")
  if (
    street === "" ||
    city === "" ||
    state === "" ||
    postalCode === "" ||
    country === "" ||
    monthlyRent <= 0 ||
    dueDay < 1 ||
    noOfUnit <= 0
  ) {
    alert("Please fill all fields correctly.");
    return;
  }

  const {
    data: { user },
    error: sessionError,
  } = await supabase.auth.getUser();

  if (sessionError || !user) {
    alert("User not authenticated.");
    return;
  }
 if(props.edit){
  onUpdate();
 }else{

   const { error } = await supabase.from("properties").insert([
     {
       user_id: user.id,
       address: street,
       city,
       state,
       postal_code: postalCode,
       country,
       rent: monthlyRent,
       rent_due_day: dueDay,
       no_of_unit: noOfUnit,
     },
   ]);
 
   
   if (error) {
     alert("Failed to save property: " + error.message);
   } else {
     alert("Property added successfully!");
     onClear(); 
   }
 }
};


const onUpdate = async () => {
  const { error } = await supabase
    .from('properties')
    .update({
      address: street,
      city,
      state,
      postal_code: postalCode,
      country,
      rent: monthlyRent,
      rent_due_day: dueDay,
      no_of_unit: noOfUnit,
    })
    .eq('id', initialData.id); // use initialData.id for the record being updated

  if (!error) {
    alert('Property updated!');
    router.push('/property');
  } else {
    alert('Error: ' + error.message);
  }
};


  const onClear=()=>{
    console.log("clear")
    setStreet("")
    setCity("")
    setState("")
    setPostalCode("");
    setCountry("");
    setMonthlyRent(0);
    setDueDay(0);
    setNoOfUnit(0);
  }


  return (
    <div className="bg-white p-6 rounded-xl shadow-md space-y-6 w-full max-w-5xl">
      <Grid container spacing={2} className="centerDiv">
        
        <Grid size={6}>
          <TextInput
            label="Address"
            name="Address"
            type="text"
            placeholder="Address"
            value={street}
            onChange={(e)=>onChangeStreet(e)}
            id="Address"
          />
        </Grid>
        <Grid>
          <TextInput
            label="City"
            name="City"
            type="text"
            placeholder="City"
            value={city}
            onChange={(e)=>onChangeCity(e)}
            id="City"
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} className = "centerDiv">
        <Grid size={6}>
          <TextInput
            label="State"
            name="State"
            type="text"
            placeholder="State"
            value={state}
            onChange={(e)=>onChangeState(e)}
            id="State"
          />
        </Grid>
        <Grid>
          <TextInput
            label="Postal Code"
            name="Postal Code"
            type="text"
            placeholder="Postal Code"
            value={postalCode}
            onChange={(e)=>onChangePostalCode(e)}
            id="postalCode"
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} className = "centerDiv">
        <Grid size={6}>
          <TextInput
            label="Country"
            name="Country"
            type="text"
            placeholder="Country"
            value={country}
            onChange={(e)=>onChangeCountry(e)}
            id="country"
          />
        </Grid>
        <Grid>
          <TextInput
            label="Number of unit"
            name="Number of unit"
            type="text"
            placeholder="Number of unit"
            value={noOfUnit}
            onChange={(e)=>onChangeNoOfUnit(e)}
            id="numberOfUnit"
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} className = "centerDiv">
        <Grid size={6}>
          <TextInput
            label="Monthly Rent Amount"
            name="Monthly Rent Amount"
            type="text"
            placeholder="Monthly Rent Amount"
            value={monthlyRent}
            onChange={(e)=>onChangeMonthlyRent(e)}
            id="monthlyRentAmount"
          />
        </Grid>
        <Grid>
          <TextInput
            label="Rent Due Day"
            name="Rent Due Day"
            type="text"
            placeholder="Rent Due Day"
            value={dueDay}
            onChange={(e)=>onChangeDueDay(e)}
            id="rentDueDay"
          />
        </Grid>
      </Grid>
      <div className="centerDiv">
        <div>

         <Button
            name="Clear"
            onClick={()=>onClear()}
            color="primary"
            variant="outlined"
          />
        </div>
        <div>
         <Button
            name={props.edit ?"Update" :"Submit"}
            onClick={()=>onSubmit()}
            color="primary"
            variant="contained"
          />

        </div>
      </div>
    </div>
  );
}
