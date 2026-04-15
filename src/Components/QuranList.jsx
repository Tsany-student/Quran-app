import { useEffect, useState } from 'react';
import { IconSearch, IconFilter } from '@tabler/icons-react';

export default function QuranList() {
  const [surats, setSurats] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    fetch("https://equran.id/api/v2/surat")
      .then(res => res.json())
      .then(json => {
        setSurats(json.data);
        setFiltered(json.data);
      });
  }, []);

  useEffect(() => {
    let result = surats;

    if (category !== "all") {
      result = result.filter(s => s.tempatTurun.toLowerCase() === category);
    }

    if (search) {
      result = result.filter(s => 
        s.namaLatin.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFiltered(result);
  }, [search, category, surats]);

  const btnClass = (cat) => `
    px-6 py-2 rounded-full font-bold text-sm transition-all border-2
    ${category === cat 
      ? "bg-primary border-primary text-white shadow-lg shadow-primary/30" 
      : "bg-white border-slate-100 text-slate-500 hover:border-primary/30"}
  `;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-5 items-center justify-between">
        <div className="relative w-full md:w-96 group">
            <IconSearch className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Cari surat..."
              className="w-full pl-14 pr-6 py-3.5 rounded-2xl bg-white border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-primary outline-none shadow-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
        </div>

        <div className="flex bg-slate-100 p-1.5 rounded-[1.5rem] gap-1 w-full md:w-auto overflow-x-auto">
          <button onClick={() => setCategory("all")} className={btnClass("all")}>Semua</button>
          <button onClick={() => setCategory("mekah")} className={btnClass("mekah")}>Makkiyah</button>
          <button onClick={() => setCategory("madinah")} className={btnClass("madinah")}>Madaniyah</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.length > 0 ? filtered.map(s => (
          <div key={s.nomor} className="group p-6 bg-white rounded-3xl border border-slate-100 hover:border-emerald-100 hover:shadow-2xl transition-all duration-300 cursor-pointer flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex flex-shrink-0 items-center justify-center bg-slate-50 group-hover:bg-emerald-50 rounded-xl text-slate-500 group-hover:text-primary font-bold text-base border border-slate-100 transition-colors">
                  {s.nomor}
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 group-hover:text-primary tracking-tight transition-colors">{s.namaLatin}</h3>
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${s.tempatTurun.toLowerCase() === 'mekah' ? 'bg-amber-400' : 'bg-blue-400'}`}></span>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">{s.tempatTurun} • {s.jumlahAyat} AYAT</p>
                  </div>
                </div>
              </div>
              <h3 className="font-arabic text-2xl text-slate-950 text-right">{s.nama}</h3>
          </div>
        )) : (
          <div className="col-span-full py-20 text-center">
             <p className="text-slate-400 font-bold italic">Surat tidak ditemukan di kategori ini...</p>
          </div>
        )}
      </div>
    </div>
  );
}