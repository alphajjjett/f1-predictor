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

export async function getRacesByYear(year) {
  try {
    const response = await fetch(`${BASE_URL}/${year}.json`);
    const data = await response.json();
    return data.MRData.RaceTable.Races;
  } catch (error) {
    console.error('Error fetching races by year:', error);
    return [];
  }
}

export async function getRaceResult(year, round) {
  try {
    const response = await fetch(`${BASE_URL}/${year}/${round}/results.json`);
    const data = await response.json();
    return data.MRData.RaceTable.Races[0];
  } catch (error) {
    console.error('Error fetching race result:', error);
    return null;
  }
}