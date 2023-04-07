import Head from 'next/head';
import { useState } from 'react';

export default function Home() {
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [lapTimes, setLapTimes] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const totalTimeInSeconds = parseInt(minutes) * 60 + parseInt(seconds);

    const lapCount = 6;
    const cumulativeLapTimes = [];
    let cumulativeTime = 0;

    for (let i = 1; i <= lapCount; i++) {
      cumulativeTime += totalTimeInSeconds / lapCount;
      cumulativeLapTimes.push({ lap: i, time: cumulativeTime });
    }

    setLapTimes(cumulativeLapTimes);
  };

  return (
    <>
      <Head>
        <title>2.4km Run Time Tracker</title>
        <meta name="description" content="2.4km Run Time Tracker App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <h1 className="text-2xl font-bold mb-4">2.4km Run Time Calculator</h1>
            <h2 className="text-xl font-bold mb-4">Enter your target 2.4km run time:</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <label htmlFor="minutes" className="block mb-2">Minutes:</label>
                <input
                  type="number"
                  id="minutes"
                  name="minutes"
                  value={minutes}
                  onChange={(e) => setMinutes(e.target.value)}
                  className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-5">
                <label htmlFor="seconds" className="block mb-2">Seconds:</label>
                <input
                  type="number"
                  id="seconds"
                  name="seconds"
                  value={seconds}
                  onChange={(e) => setSeconds(e.target.value)}
                  className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full px-3 py-4 text-white bg-blue-500 hover:bg-blue-600 rounded-md focus:bg-blue-600 focus:outline-none"
              >
                Calculate Cumulative Lap Times
              </button>
            </form>
            {lapTimes.length > 0 && (
            <div className="mt-6">
              <h2 className="text-xl font-bold mb-4">Cumulative Lap Times:</h2>
              <ul className="list-disc pl-5">
                {lapTimes.map(({ lap, time }) => {
                  const minutes = Math.floor(time / 60);
                  const seconds = Math.round(time % 60);
                  return (
                    <li key={lap}>
                      Lap {lap}: {minutes} min {seconds} sec
                    </li>
                  );
                })}
              </ul>
            </div>
)}
          </div>
        </div>
      </main>
    </>
  );
  ;
}
