'use client';

import { useEffect, useState } from 'react';
import { supabase } from "../../lib/supabaseClient";
import dayjs from 'dayjs';

type PaymentRecord = {
  id: string;
  amount: number;
  mode: string;
  payment_date: string;
  property: {
    address: string;
  };
};


export default function PaymentHistory() {
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
  .from('rent_payments')
  .select('id, amount, mode, payment_date, property: property(address)')
  .order('payment_date', { ascending: false });



      console.log("data is ---> ",data)
      console.log("error is ---> ",error)
      if (!error && data) setPayments(data as any);
      setLoading(false);
    };

    fetchPayments();
  }, []);

  return (
    <section className="bg-white rounded-xl shadow-md p-6 w-full max-w-6xl mx-auto">

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : payments.length === 0 ? (
        <p className="text-center py-6 text-gray-500">No payments found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-4 py-3">Property</th>
                <th className="px-4 py-3">Payment Date</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Payment Mode</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {item.property?.address}
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {dayjs(item.payment_date).format('MMMM D, YYYY')}
                  </td>
                  <td className="px-4 py-3 text-gray-700">Rs {item.amount}</td>
                  <td className="px-4 py-3 text-gray-700">{item.mode}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
