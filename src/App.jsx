import { useState } from 'react';
import QuranCard from './Components/QuranCard';
import QuranList from './Components/QuranList';
import QuranDetail from './Components/QuranDetail'; 

export default function App() {
  // Karakter 'a' dihapus
  const [selectedSurat, setSelectedSurat] = useState(null);

  return (
    <div className="pb-20">
      <div className="fixed top-0 w-full h-96 bg-gradient-to-b from-emerald-50 to-transparent -z-10"></div>
      
      {/* Karakter 's' dihapus */}
      <nav className="p-8 max-w-[90rem] mx-auto flex justify-between items-center">
        <h1 
          onClick={() => setSelectedSurat(null)} 
          className="text-2xl font-black tracking-tighter text-slate-950 cursor-pointer"
        >
          QURAN<span className="text-primary underline decoration-4 underline-offset-4">APP</span>
        </h1>
      </nav>

      <main className="max-w-4xl mx-auto px-6">
        {!selectedSurat ? (
          <div className="space-y-12 animate-in fade-in duration-700">
            <QuranCard />
            <div className="space-y-8">
               <div className="flex items-center gap-4">
                  <h2 className="text-2xl font-black text-slate-800 italic uppercase">Daftar Surat</h2>
                  <div className="h-[2px] flex-1 bg-slate-200"></div>
               </div>
               <QuranList onSelectSurat={(id) => setSelectedSurat(id)} />
            </div>
          </div>
        ) : (
          <QuranDetail 
            suratId={selectedSurat} 
            onBack={() => setSelectedSurat(null)} 
          />
        )}
      </main>
    </div>
  );
}