"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/navigation";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmModal from "./ConfirmModal";

type Property = {
  id: string;
  address: string;
  city: string;
  state: string;
  rent: number;
  rent_due_day: number;
};

export default function PropertyList() {
  const [properties, setProperties] = useState<Property[]>([]);
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [propertyToDeleteId, setPropertyToDeleteId] = useState("");
  useEffect(() => {
    const fetchProperties = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return;
      }

      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("user_id", user.id);

      if (error) {
        console.error("Error fetching properties:", error.message);
      } else {
        setProperties(data);
      }
    };

    fetchProperties();
  }, []);

  const handleDelete = async () => {
    setModalOpen(false);
    const { error } = await supabase
      .from("properties")
      .delete()
      .eq("id", propertyToDeleteId);
    if (error) {
      alert("Delete failed: " + error.message);
    } else {
      setProperties((prev) => prev.filter((p) => p.id !== propertyToDeleteId));
    }
  };

  const handleCancle = () => {
    setModalOpen(false);
  };

  const handleConfirm = (id: string) => {
    setPropertyToDeleteId(id);
    setModalOpen(true);
  };
  return (
    <section className="w-full">
      <h2 className="text-2xl font-bold mb-6">Your Properties</h2>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {properties.map((property) => (
          <div
            key={property.id}
            className="bg-white rounded-xl shadow-lg p-6 text-gray-800 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-xl font-semibold mb-2">{property.address}</h3>
              <p className="text-sm text-gray-600">
                {property.city}, {property.state}
              </p>
              <p className="mt-2">
                <span className="font-semibold">Rent:</span> Rs {property.rent}
              </p>
              <p>
                <span className="font-semibold">Due Date:</span>{" "}
                {property.rent_due_day}
              </p>
            </div>
            <div className="flex justify-end gap-3 mt-4">
              <button
                className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
                onClick={() => router.push(`/property/edit/${property.id}`)}
              >
                <EditIcon /> Edit
              </button>
              <button
                className="flex items-center gap-1 text-sm text-red-600 hover:underline"
                onClick={() => handleConfirm(property.id)}
              >
                <DeleteIcon /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <ConfirmModal
        open={modalOpen}
        message="Are you want to delete this property? This will remove all releted rent payments."
        onCancel={() => handleCancle()}
        onConfirm={() => handleDelete()}
      />
    </section>
  );
}
