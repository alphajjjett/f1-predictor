'use client';

import { getLatestResults, getNextRace, getLastNRaces, getRacesByYear, getRaceResult } from "../lib/f1Api";
import { useState, useEffect } from "react";
import RaceModal from "./components/RaceModal";

export default function Home() {
  const [latestRace, setLatestRace] = useState(null);
  const [nextRace, setNextRace] = useState(null);
  const [races, setRaces] = useState([]);
  const [selectedYear, setSelectedYear] = useState(2024);
  const [selectedRace, setSelectedRace] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2019 }, (_, i) => 2020 + i);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [latest, next, racesData] = await Promise.all([
          getLatestResults(),
          getNextRace(),
          getRacesByYear(selectedYear)
        ]);
        setLatestRace(latest);
        setNextRace(next);
        setRaces(racesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setLoading(false);
    };

    fetchData();
  }, [selectedYear]);

  const handleYearChange = (e) => {
    setSelectedYear(parseInt(e.target.value));
  };

  const handleRaceClick = async (race) => {
    const raceResult = await getRaceResult(race.season || selectedYear, race.round);
    setSelectedRace(raceResult);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-xl">กำลังโหลดข้อมูล...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-red-600 mb-2">🏎️ F1 2024 Season</h1>
          <p className="text-gray-400">สรุปผลการแข่งขัน Formula 1 ประจำปี 2024</p>
        </header>

        <div className="grid gap-8">
          {/* Race Results Section */}
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg border border-red-500/20">
            <h2 className="text-2xl font-semibold text-red-500 mb-6 flex items-center">
              <span className="mr-2">🏆</span> ผลการแข่งขันล่าสุด
            </h2>
            {latestRace ? (
              <div className="space-y-4">
                <div className="bg-gray-700 p-6 rounded-lg">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-red-400">{latestRace.raceName}</h3>
                    <span className="text-gray-400">{latestRace.date}</span>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400 mb-2">ผู้ชนะ</p>
                      <p className="text-2xl font-bold">
                        {latestRace.Results[0].Driver.givenName} {latestRace.Results[0].Driver.familyName}
                      </p>
                      <p className="text-red-400">{latestRace.Results[0].Constructor.name}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 mb-2">สถิติ</p>
                      <p>รอบ: {latestRace.Results[0].laps}</p>
                      <p>เวลา: {latestRace.Results[0].Time.time}</p>
                      <p>คะแนน: {latestRace.Results[0].points}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-700 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold mb-3">🏅 อันดับ 3 แรก</h4>
                  <div className="space-y-3">
                    {latestRace.Results.slice(0, 3).map((result, idx) => (
                      <div key={idx} className="flex items-center">
                        <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                          {idx + 1}
                        </div>
                        <div>
                          <p className="font-medium">{result.Driver.givenName} {result.Driver.familyName}</p>
                          <p className="text-sm text-gray-400">{result.Constructor.name}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-400">ยังไม่มีข้อมูลการแข่งขัน</p>
            )}
          </div>

          {/* Race History Section */}
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg border border-red-500/20">
            <h2 className="text-2xl font-semibold text-red-500 mb-6 flex items-center">
              <span className="mr-2">📊</span> ประวัติการแข่งขัน
            </h2>
            <div className="bg-gray-700 p-6 rounded-lg">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <label htmlFor="yearSelect" className="text-lg font-medium">เลือกปี:</label>
                  <select 
                    id="yearSelect" 
                    value={selectedYear}
                    onChange={handleYearChange}
                    className="bg-gray-600 text-white px-4 py-2 rounded-lg border border-red-500/20 focus:border-red-500 focus:outline-none"
                  >
                    {years.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid gap-4">
                {races.map(race => (
                  <div 
                    key={race.round} 
                    onClick={() => handleRaceClick(race)}
                    className="bg-gray-600 p-4 rounded-lg hover:bg-gray-500 transition-colors cursor-pointer"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{race.raceName}</h3>
                        <p className="text-sm text-gray-400">{race.Circuit.circuitName}</p>
                        <p className="text-sm text-gray-400">📅 {race.date}</p>
                      </div>
                      <div className="text-right">
                        {race.Results && race.Results[0] && (
                          <>
                            <p className="text-red-400 font-medium">
                              {race.Results[0].Driver.givenName} {race.Results[0].Driver.familyName}
                            </p>
                            <p className="text-sm text-gray-400">{race.Results[0].Constructor.name}</p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Next Race Section */}
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg border border-red-500/20">
            <h2 className="text-2xl font-semibold text-red-500 mb-4 flex items-center">
              <span className="mr-2">📅</span> การแข่งขันครั้งต่อไป
            </h2>
            {nextRace ? (
              <div className="bg-gray-700 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-2">{nextRace.raceName}</h3>
                <p className="text-gray-400 mb-4">{nextRace.Circuit.circuitName}</p>
                <p className="text-lg">📅 {nextRace.date}</p>
              </div>
            ) : (
              <p className="text-gray-400">ยังไม่มีกำหนดการแข่งขันครั้งต่อไป</p>
            )}
          </div>
        </div>
      </div>

      {/* Race Modal */}
      <RaceModal 
        race={selectedRace}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </main>
  );
}
