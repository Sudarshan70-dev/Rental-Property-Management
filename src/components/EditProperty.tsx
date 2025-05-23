
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from "@/lib/supabaseClient";
import AddEditProperty from '@/components/AddEditProperty';

type PropertyFormData = {
  address: string;
  city: string;
  state: string;
  country: string;
  rent: string;
  postal_code?:string;
  no_of_unit?:number;
  rent_due_day?:number;
};

export default function EditPropertyPage() {
    console.log("edit property called")
  const [loading, setLoading] = useState(true);
const defaultProperty: PropertyFormData = {
  address: '',
  city: '',
  state: '',
  country: '',
  rent: '',
  postal_code: '',
  no_of_unit: 0,
  rent_due_day: 1,
};

const [property, setProperty] = useState<PropertyFormData>(defaultProperty);


  const { id } = useParams();
  console.log("id is ---> ",id)
  const router = useRouter();
console.log("edit page called")
  useEffect(() => {
    const fetchProperty = async () => {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('id', id)
        .single();

        console.log("data is --> ",data)
      if (error) {
        alert('Failed to load property.');
        router.push('/properties');
      } else {
        setProperty(data);
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Edit Property</h2>
      <AddEditProperty initialData={property} edit={true} />
    </div>
  );
}
