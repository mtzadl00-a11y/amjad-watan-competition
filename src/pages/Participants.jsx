import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Participants({ onBack }) {
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("participants")
      .select("*")
      .order("id", { ascending: false });

    if (!error) setParticipants(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <section className="p-6">
      <div className="container mx-auto max-w-3xl bg-white rounded-xl p-6 shadow-lg text-gray-800">

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-blue-700">قائمة المشاركين</h1>

          <button
            onClick={onBack}
            className="px-4 py-2 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-500"
          >
            رجوع
          </button>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">جاري التحميل...</p>
        ) : participants.length === 0 ? (
          <p className="text-center text-gray-500">لا يوجد مشاركون حتى الآن.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300 rounded-xl overflow-hidden">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="p-3">#</th>
                  <th className="p-3">الاسم</th>
                  <th className="p-3">الجوال</th>
                  <th className="p-3">اللعبة</th>
                </tr>
              </thead>
              <tbody>
                {participants.map((p, i) => (
                  <tr key={p.id} className="border-b hover:bg-gray-100 text-center">
                    <td className="p-3">{i + 1}</td>
                    <td className="p-3">{p.name}</td>
                    <td className="p-3">{p.phone}</td>
                    <td className="p-3">{p.game}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
