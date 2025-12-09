import React from "react";
import fifaImg from "../assets/games/fifa.png";
import balootImg from "../assets/games/baloot.png";
import jackaroImg from "../assets/games/jackaro.png";

export default function Landing({ onRegister, onParticipants }) {
  return (
    <section className="bg-[#e8f1ff] py-20">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
        
        {/* Text Section */}
        <div className="flex-1 text-center md:text-right">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-[#003366] leading-tight">
            بطولة أمجاد وطن
          </h1>

          <p className="mt-4 text-[#334155] max-w-xl mx-auto md:mx-0 text-lg leading-relaxed">
            شارك الآن في أقوى بطولات الألعاب: <br /> FIFA • جاكارو • بلوت  
            <br /> جوائز • منافسة • متعة • تميز
          </p>

          <div className="mt-8 flex justify-center md:justify-start gap-4">

            {/* زر التسجيل */}
            <button
              onClick={onRegister}
              className="px-8 py-3 text-lg rounded-full bg-gradient-to-l from-blue-600 to-blue-400 text-white font-bold shadow-xl hover:opacity-90 transition"
            >
              سجل الآن
            </button>

            {/* زر عرض المشاركين */}
            <button
              onClick={onParticipants}
              className="px-8 py-3 text-lg rounded-full border border-blue-600 text-blue-700 font-bold bg-white hover:bg-blue-50 transition"
            >
              عرض المشاركين
            </button>

          </div>
        </div>

        {/* Games Section */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-4 hover:scale-105 transition">
            <img src={fifaImg} className="w-full h-32 object-cover rounded-lg" />
            <p className="mt-2 font-bold text-[#003366]">فيفا</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-4 hover:scale-105 transition">
            <img src={balootImg} className="w-full h-32 object-cover rounded-lg" />
            <p className="mt-2 font-bold text-[#003366]">بلوت</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-4 hover:scale-105 transition">
            <img src={jackaroImg} className="w-full h-32 object-cover rounded-lg" />
            <p className="mt-2 font-bold text-[#003366]">جاكارو</p>
          </div>
        </div>
      </div>
    </section>
  );
}
