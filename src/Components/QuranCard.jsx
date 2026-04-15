import { useState, useEffect } from 'react';

const QuranCard = () => {
  const [surah, setSurah] = useState(null);

  useEffect(() => {
    fetch(`https://equran.id/api/v2/surat/${Math.floor(Math.random() * 114) + 1}`)
      .then(res => res.json())
      .then(json => setSurah(json.data));
  }, []);

  if (!surah) return <div className="quran-card">Memuat ayat...</div>;

  return (
    <div className="quran-card">
      <h4 className="card-title">Ayat Random Hari Ini</h4>
      <div className="arabic">{surah.ayat[0].teksArab}</div>
      <div className="translation">"{surah.ayat[0].teksIndonesia}"</div>
      <div className="surah-name">QS. {surah.namaLatin} - Ayat 1</div>
    </div>
  );
};

export default QuranCard;