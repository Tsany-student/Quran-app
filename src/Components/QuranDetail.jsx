import { useEffect, useState } from 'react';

export default function QuranDetail({ suratId, onBack }) {
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Jika tidak ada suratId, jangan lakukan apa-apa
    if (!suratId) return;
    
    setLoading(true);
    setError(null);

    // MENGGUNAKAN BACKTICK (`) DAN ${suratId} UNTUK MEMASUKKAN VARIABEL
    fetch(`https://equran.id/api/v2/surat/${suratId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Gagal memuat data surat.");
        return res.json();
      })
      .then((json) => {
        // API equran.id v2 mengembalikan data di dalam properti 'data'
        setDetail(json.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching detail:", err);
        setError(err.message);
        setLoading(false);
      });
  }, [suratId]);

  // Loading State
  if (loading) {
    return (
      <div className="p-20 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-emerald-500 mb-4"></div>
        <p className="text-emerald-500 font-medium animate-pulse">Sedang memuat ayat...</p>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="p-10 text-center">
        <p className="text-red-500 mb-4">{error}</p>
        <button onClick={onBack} className="px-4 py-2 bg-emerald-500 text-white rounded-lg">Kembali</button>
      </div>
    );
  }

  // Empty State
  if (!detail) return null;

  return (
    <div className="space-y-6 pb-20">
      {/* Tombol Back & Navigasi */}
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-500 hover:text-emerald-600 transition-colors font-medium mb-4"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        Kembali ke Daftar Surat
      </button>

      {/* Header Surat */}
      <div className="bg-[#161b22] p-8 rounded-3xl border border-slate-800 flex justify-between items-center shadow-xl">
        <div>
          <h2 className="text-3xl font-bold text-white">{detail.namaLatin}</h2>
          <p className="text-emerald-500 font-medium">
            {detail.arti} • <span className="text-slate-400">{detail.jumlahAyat} Ayat</span>
          </p>
        </div>
        <div className="text-right">
          <h2 className="font-arabic text-5xl text-white mb-2">{detail.nama}</h2>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-full text-xs uppercase tracking-widest">
            {detail.tempatTurun}
          </span>
        </div>
      </div>

      {/* Daftar Ayat */}
      <div className="space-y-4">
        {detail.ayat.map((a) => (
          <div 
            key={a.nomorAyat} 
            className="bg-[#161b22]/60 p-8 rounded-3xl border border-slate-800 group hover:border-emerald-500/30 transition-all"
          >
            {/* Nomor Ayat */}
            <div className="w-10 h-10 rounded-xl border border-emerald-500/30 flex items-center justify-center text-sm font-bold text-emerald-500 mb-8 bg-emerald-500/5">
              {a.nomorAyat}
            </div>

            {/* Teks Arab */}
            <p 
              className="font-arabic text-4xl text-right leading-[4.5rem] text-white mb-8" 
              dir="rtl"
            >
              {a.teksAr}
            </p>

            {/* Terjemahan */}
            <p className="text-emerald-400/80 leading-relaxed text-lg border-l-2 border-emerald-500/20 pl-4 italic">
              {a.teksId}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}