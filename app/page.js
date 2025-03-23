import { getLatestResults, getNextRace, getLastNRaces } from "../lib/f1Api";


export default async function Home() {
  const latestRace = await getLatestResults();
  const nextRace = await getNextRace();

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">🏁 F1 Predictor</h1>

      <section className="mt-4">
        <h2 className="text-xl font-semibold">Next Race:</h2>
        {nextRace ? (
          <>
            <p>{nextRace.raceName} - {nextRace.Circuit.circuitName}</p>
            <p>Date: {nextRace.date}</p>
          </>
        ) : (
          <p>No upcoming race found.</p>
        )}
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold">Last Race Results:</h2>
        {latestRace ? (
          <ul className="list-disc pl-6">
            {latestRace.Results.slice(0, 3).map((result, idx) => (
              <li key={idx}>
                🏆 {result.Driver.familyName} ({result.Constructor.name})
              </li>
            ))}
          </ul>
        ) : (
          <p>No recent race results found.</p>
        )}
      </section>
    </main>
  );
}
