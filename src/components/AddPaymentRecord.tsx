'use client';

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import TextInput from "@/components/textInput";
import Grid from "@mui/material/Grid";
import Button from "@/components/Button";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";

export default function AddPaymentRecord() {
  const [paymentDate, setPaymentDate] = useState<Dayjs | null>(dayjs());
  const [paymentAmt, setPaymentAmt] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [properties, setProperties] = useState<any[]>([]);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>("");

  console.log("add payment record--->")
  useEffect(() => {
    const fetchProperties = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } = await supabase
        .from("properties")
        .select("id, address, rent")
        .eq("user_id", user.id);

      if (!error && data) {
        setProperties(data);
      }
    };

    fetchProperties();
  }, []);

  const propertySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    setSelectedPropertyId(selectedId);

    const selectedProperty = properties.find((p) => p.id === selectedId);
    if (selectedProperty?.rent) {
      setPaymentAmt(String(selectedProperty.rent));
    }
  };

  const onSubmit = async () => {
    if (!selectedPropertyId) {
      alert("Please select a property.");
      return;
    }

    const { error } = await supabase.from("rent_payments").insert([
      {
        property_id: selectedPropertyId,
        payment_date: paymentDate?.toISOString(),
        amount: Number(paymentAmt),
        mode: paymentMode,
      },
    ]);

    console.log("error is --> ",error)
    if (error) {
      alert("Failed to save payment: " + error.message);
    } else {
      alert("Payment added successfully!");
      setPaymentAmt("");
      setPaymentMode("");
      setSelectedPropertyId("");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md space-y-6 w-full max-w-5xl">
      <Grid container spacing={2} className="centerDiv">
        <Grid item xs={6}>
          <label className="block text-sm mb-1 font-medium">Select Property</label>
          <select
            value={selectedPropertyId}
            onChange={propertySelect}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">-- Select a property --</option>
            {properties.map((property) => (
              <option key={property.id} value={property.id}>
                {property.address}
              </option>
            ))}
          </select>
        </Grid>

        <Grid item xs={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Payment Date"
              value={paymentDate}
              onChange={(newValue) => setPaymentDate(newValue)}
              slotProps={{
                textField: {
                  fullWidth: true,
                  size: "small",
                },
              }}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>

      <Grid container spacing={2} className="centerDiv">
        <Grid item xs={6}>
          <TextInput
            label="Amount"
            name="Amount"
            type="text"
            placeholder="Amount"
            value={paymentAmt}
            onChange={(e) => setPaymentAmt(e.target.value)}
            id="paymentAmt"
          />
        </Grid>

        <Grid item xs={6}>
          <TextInput
            label="Payment Mode"
            name="Payment Mode"
            type="text"
            placeholder="e.g. UPI / Cash"
            value={paymentMode}
            onChange={(e) => setPaymentMode(e.target.value)}
            id="paymentMode"
          />
        </Grid>
      </Grid>

      <div className="centerDiv">
        <Button
          name="Add Record"
          onClick={onSubmit}
          color="primary"
          variant="contained"
        />
      </div>
    </div>
  );
}
