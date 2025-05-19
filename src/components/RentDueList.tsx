'use client';

import { useEffect, useState } from 'react';
import { supabase } from "@/lib/supabaseClient";
import dayjs from 'dayjs';

type RentDueItem = {
  id: string;
  address: string;
  rent_due_day: number;
  rent: number;
};

export default function RentDueList() {
  const [dueProperties, setDueProperties] = useState<RentDueItem[]>([]);
  const [loading, setLoading] = useState(true);
console.log("rent due list call")
  useEffect(() => {
    const fetchRentDue = async () => {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      // 1. Fetch all properties of the user
      const { data: properties, error: propError } = await supabase
        .from('properties')
        .select('id, address, rent_due_day, rent')
        .eq('user_id', user.id);

        console.log("properties data ---> ",properties)
      if (propError || !properties) return;

      const currentMonthStart = dayjs().startOf('month').toISOString();

      // 2. Fetch all rent payments for this month
      const { data: payments } = await supabase
        .from('rent_payments')
        .select('property_id, payment_date')
        .gte('payment_date', currentMonthStart);

        console.log("payment data is ---> ",payments);
      const paidPropertyIds = new Set(payments?.map(p => p.property_id));
      console.log("paid properties id 0---> ",paidPropertyIds)
      // 3. Filter out properties with no payment this month
      const unpaidProperties = properties.filter(p => !paidPropertyIds.has(p.id));
      console.log(" unpaid properties id -0---> ",unpaidProperties)
      setDueProperties(unpaidProperties);
      setLoading(false);
    };

    fetchRentDue();
  }, []);

  const formatDueDate = (day: number) => {
    const now = dayjs();
    const dueDate = dayjs(`${now.year()}-${now.month() + 1}-${day}`);
    return dueDate.format('MMMM D, YYYY');
  };

  return (
    <section className="bg-white rounded-xl shadow-md p-6 w-full max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Rent Due</h2>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : dueProperties.length === 0 ? (
        <p className="text-center py-6 text-gray-500">No rent due in the current month.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-4 py-3">Property</th>
                <th className="px-4 py-3">Due Date</th>
                <th className="px-4 py-3">Monthly Rent</th>
              </tr>
            </thead>
            <tbody>
              {dueProperties.map((item) => (
                <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-4 py-4 font-medium text-gray-800">{item.address}</td>
                  <td className="px-4 py-4 text-gray-700">{formatDueDate(item.rent_due_day)}</td>
                  <td className="px-4 py-4 text-gray-700">{item.rent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
