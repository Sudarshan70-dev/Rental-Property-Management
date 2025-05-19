'use client';

import { useEffect, useState } from 'react';
import { supabase } from "../../lib/supabaseClient";
import dayjs from 'dayjs';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';

export default function Dashboard() {
  const [totalProperties, setTotalProperties] = useState(0);
  const [rentCollected, setRentCollected] = useState(0);
  const [rentDueCount, setRentDueCount] = useState(0);
  const [upcomingDueList, setUpcomingDueList] = useState<any[]>([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      // Fetch all user properties
      const { data: properties, error: propError } = await supabase
        .from('properties')
        .select('id, address, rent, rent_due_day')
        .eq('user_id', user.id);

      if (propError || !properties) return;

      setTotalProperties(properties.length);

      // Fetch this month's payments
      const startOfMonth = dayjs().startOf('month').toISOString();
      const { data: payments } = await supabase
        .from('rent_payments')
        .select('amount, property_id, payment_date')
        .gte('payment_date', startOfMonth);

      const collected = payments?.reduce((sum, p) => sum + (p.amount || 0), 0);
      setRentCollected(collected || 0);

      const paidThisMonth = new Set(
        payments?.map((p) => p.property_id)
      );

      const upcomingDue = properties.filter((property) => {
        const dueDate = dayjs().date(property.rent_due_day);
        const today = dayjs();
        const in7Days = today.add(7, 'day');
        return (
          dueDate.isAfter(today.subtract(1, 'day')) &&
          dueDate.isBefore(in7Days.add(1, 'day')) &&
          !paidThisMonth.has(property.id)
        );
      });

      setRentDueCount(upcomingDue.length);
      setUpcomingDueList(upcomingDue);
    };

    fetchDashboardData();
  }, []);

  return (
    <div>
      <Container>
        <Paper elevation={3} sx={{ padding: '20px', borderRadius: '22px', height: '90vh', overflow: 'auto' }}>
          <div className="p-4 md:p-6">
            {/* Header Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="rounded-xl p-6 shadow-lg text-center text-white bg-gradient-to-r from-orange-400 to-red-500">
                <p className="text-lg font-semibold">Total Properties</p>
                <p className="text-4xl mt-2 font-bold">{totalProperties}</p>
              </div>

              <div className="rounded-xl p-6 shadow-lg text-center text-white bg-gradient-to-r from-green-400 to-cyan-500">
                <p className="text-lg font-semibold">Rent Collected (This Month)</p>
                <p className="text-4xl mt-2 font-bold">Rs {rentCollected.toFixed(2)}</p>
              </div>

              <div className="rounded-xl p-6 shadow-lg text-center text-white bg-gradient-to-r from-purple-500 to-violet-600">
                <p className="text-lg font-semibold">Rent Due in 7 Days</p>
                <p className="text-4xl mt-2 font-bold">{rentDueCount}</p>
              </div>
            </div>

            {/* Upcoming Rent Due Section */}
            <section className="bg-white/5 p-6 rounded-xl text-black shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">Upcoming Rent Due</h2>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-white/10 text-black/80">
                    <tr>
                      <th className="py-3 px-4">Property</th>
                      <th className="py-3 px-4">Due Date</th>
                      <th className="py-3 px-4">Monthly Rent</th>
                    </tr>
                  </thead>
                  <tbody>
                    {upcomingDueList.length === 0 ? (
                      <tr>
                        <td colSpan={3} className="text-center py-6 text-black/60">
                          No upcoming rent due
                        </td>
                      </tr>
                    ) : (
                      upcomingDueList.map((p) => {
                        const fullDueDate = dayjs()
                          .date(p.rent_due_day)
                          .format('MMMM D, YYYY');
                        return (
                          <tr key={p.id} className="border-b border-gray-200 hover:bg-gray-50">
                            <td className="px-4 py-3">{p.address}</td>
                            <td className="px-4 py-3">{fullDueDate}</td>
                            <td className="px-4 py-3">Rs {p.rent}</td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </Paper>
      </Container>
    </div>
  );
}
