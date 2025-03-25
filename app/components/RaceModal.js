'use client';

export default function RaceModal({ race, isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          ✕
        </button>
        
        <h2 className="text-2xl font-bold text-red-500 mb-4">{race.raceName}</h2>
        <div className="mb-6">
          <p className="text-gray-400">{race.Circuit.circuitName}</p>
          <p className="text-gray-400">📅 {race.date}</p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white mb-3">🏆 ผลการแข่งขัน</h3>
          {race.Results && race.Results.slice(0, 3).map((result, idx) => (
            <div key={idx} className="bg-gray-700 p-4 rounded-lg">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  {idx + 1}
                </div>
                <div>
                  <p className="font-medium text-lg">
                    {result.Driver.givenName} {result.Driver.familyName}
                  </p>
                  <p className="text-gray-400">{result.Constructor.name}</p>
                  <div className="mt-2 text-sm text-gray-400">
                    <p>รอบ: {result.laps}</p>
                    <p>เวลา: {result.Time.time}</p>
                    <p>คะแนน: {result.points}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 