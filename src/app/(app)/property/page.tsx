"use client"
import { useRouter } from "next/navigation";

export default function AddPropertyActions() {

  const router = useRouter();

  return (
    <section className="bg-white p-6 rounded-xl shadow-md space-y-6 w-full max-w-5xl">
      <h2 className="text-2xl font-bold mb-4">Property</h2>

      {/* Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Property Management */}
        <div className="bg-white rounded-lg border p-4 space-y-4">
          <h3 className="text-lg font-semibold text-gray-700">Property Management</h3>
          <div className="space-y-3">
            <button className="w-full py-2 rounded-lg font-medium text-white bg-[#2DA6FF] hover:opacity-90 transition"
            onClick={()=>router.push("./property/create")}
            >
              Create Property
            </button>
            <button className="w-full py-2 rounded-lg font-medium text-white bg-[#34E0A1] hover:opacity-90 transition"
            onClick={()=>router.push("./property/view-properties")}
            >
              View Properties
            </button>
          </div>
        </div>

        {/* Rent Management */}
        <div className="bg-white rounded-lg border p-4 space-y-4">
          <h3 className="text-lg font-semibold text-gray-700">Record Rent Payment</h3>
          <div className="space-y-3">
            <button className="w-full py-2 rounded-lg font-medium text-white bg-[#816CFF] hover:opacity-90 transition"
            onClick={()=>router.push("./property/Record-Payment")}
            
            >
              Record Rent Payment
            </button>
            <button className="w-full py-2 rounded-lg font-medium text-white bg-[#9B7DFF] hover:opacity-90 transition"
            onClick={()=>router.push("./property/Rent-Due-List")}
            
            >
              View Rent Due List
            </button>
          </div>
        </div>
      </div>

    </section>
  );
}
