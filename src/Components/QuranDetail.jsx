import { useEffect, useState } from 'react';

export default function QuranDetail({ suratId }) {
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!suratId) return;
    
    setLoading(true);
    console.log("Fetching surat nomor:", suratId); 

    fetch('https://equran.id/api/v2/surat/{id}')
      .then(res => res.json())
      .then(json => {
        setDetail(json.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching detail:", err);
        setLoading(false);
      });
  }, [suratId]);

  if (loading) return <div className="p-10 text-center text-emerald-500 animate-pulse">Loading ayat...</div>;
  if (!detail) return <div className="p-10 text-center text-slate-500">Pilih surat untuk membaca</div>;

  return (
    <div className="space-y-6">
      <div className="bg-[#161b22] p-8 rounded-3xl border border-slate-800 flex justify-between items-center shadow-xl">
        <div>
          <h2 className="text-3xl font-bold text-white">{detail.namaLatin}</h2>
          <p className="text-emerald-500 font-medium">{detail.arti} • {detail.jumlahAyat} Ayat</p>
        </div>
        <h2 className="font-arabic text-5xl text-white">{detail.nama}</h2>
      </div>

      <div className="space-y-4">
        {detail.ayat.map((a) => (
          <div key={a.nomorAyat} className="bg-[#161b22]/60 p-8 rounded-3xl border border-slate-800 group">
            <div className="w-8 h-8 rounded-lg border border-emerald-500/30 flex items-center justify-center text-[10px] text-emerald-500 mb-6">
              {a.nomorAyat}
            </div>
            <p className="font-arabic text-4xl text-right leading-[4.5rem] text-white mb-6" dir="rtl">
              {a.teksAr}
            </p>
            <p className="text-emerald-400/80 leading-relaxed italic">{a.teksId}</p>
          </div>
        ))}
      </div>
    </div>
  );
}