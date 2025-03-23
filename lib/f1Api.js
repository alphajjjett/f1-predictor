const BASE_URL = "https://ergast.com/api/f1"; //data 2024

export const getLatestResults = async () => {
  const res = await fetch(`${BASE_URL}/current/last/results.json`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data.MRData.RaceTable.Races[0] || null;
};

export const getNextRace = async () => {
  const res = await fetch(`${BASE_URL}/current/next.json`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data.MRData.RaceTable.Races[0] || null;
};

export const getLastNRaces = async (n = 3) => {
    const res = await fetch(`${BASE_URL}/results.json?limit=${n}&offset=0&order=desc`, {
      cache: "no-store",
    });
    const data = await res.json();
    return data.MRData.RaceTable.Races.reverse(); 
  };