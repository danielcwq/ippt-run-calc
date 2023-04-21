import Head from "next/head";
import { useState } from "react";


export default function Home() {
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const [lapTimes, setLapTimes] = useState([]);
  const [criticalVelocityPace, setCriticalVelocityPace] = useState(null);
  const [vo2MaxPace, setVo2MaxPace] = useState(null);
  const [easyPace, setEasyPace] = useState(null);
  const [thresholdPace, setThresholdPace] = useState(null);

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

    const paceMetersPerSecond = 2400 / totalTimeInSeconds;
    const criticalVelocityPace = paceMetersPerSecond / 1.08;
    const pacePerKmInSeconds = 1000 / criticalVelocityPace;
    const pacePerKmMinutes = Math.floor(pacePerKmInSeconds / 60);
    const pacePerKmSeconds = Math.round(pacePerKmInSeconds % 60);
    const vo2MaxMetresPerSecond = 1000 / paceMetersPerSecond;
    const vo2MaxPerKmMinutes = Math.floor(vo2MaxMetresPerSecond / 60);
    const vo2MaxPerKmSeconds = Math.round(vo2MaxMetresPerSecond % 60);

    const easyPace = criticalVelocityPace * 0.7;
    const easyPaceMetresPerSecond = 1000 / easyPace;
    const easyPacePerKmMinutes = Math.floor(easyPaceMetresPerSecond / 60);
    const easyPacePerKmSeconds = Math.round(easyPaceMetresPerSecond % 60);

    const threshold = criticalVelocityPace * 0.97;
    const thresholdMetresPerSecond = 1000 / threshold;
    const thresholdPerKmMinutes = Math.floor(thresholdMetresPerSecond / 60);
    const thresholdPerKmSeconds = Math.round(thresholdMetresPerSecond % 60);
    setCriticalVelocityPace({
      minutes: pacePerKmMinutes,
      seconds: pacePerKmSeconds,
    });
    setVo2MaxPace({ minutes: vo2MaxPerKmMinutes, seconds: vo2MaxPerKmSeconds });
    setEasyPace({
      minutes: easyPacePerKmMinutes,
      seconds: easyPacePerKmSeconds,
    });
    setThresholdPace({
      minutes: thresholdPerKmMinutes,
      seconds: thresholdPerKmSeconds,
    });
  };

  return (
    <>

      <Head>
        <title>2.4km Run Time Tracker</title>
        <meta name="description" content="2.4km Run Time Tracker App" />
        <meta name="viewport" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <main className="min-h-screen grid place-items-center md:pl-6">
          <div className="relative w-full max-w-md py-3">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
            <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
              <h1 className="text-2xl font-bold mb-4">
                2.4km Run Time Calculator
            </h1>
              <h2 className="text-xl font-bold mb-4">
                Enter your 2.4km run time:
            </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-5">
                  <label htmlFor="minutes" className="block mb-2">
                    Minutes:
                </label>
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
                  <label htmlFor="seconds" className="block mb-2">
                    Seconds:
                </label>
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
                  <h2 className="text-xl font-bold mb-4">
                    Cumulative Lap Times:
                </h2>
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
              {criticalVelocityPace &&
                vo2MaxPace &&
                easyPace &&
                thresholdPace && (
                  <div className="mt-6">
                    <h2 className="text-xl font-bold mb-4">
                      Training Paces (per km):
                  </h2>
                    <p className="font-bold mb-2 mt-4">Easy Pace:</p>
                    {easyPace.minutes} min {easyPace.seconds} sec
                    <p className="font-bold mb-2 mt-4">Critical Velocity Pace:</p>
                    <p>
                      {criticalVelocityPace.minutes} min{" "}
                      {criticalVelocityPace.seconds} sec
                  </p>
                    <p className="font-bold mb-2 mt-4">Threshold Pace:</p>
                    {thresholdPace.minutes} min {thresholdPace.seconds} sec
                    <p className="font-bold mb-2 mt-4">Vo2 Max / 2.4km Pace:</p>
                    <p>
                      {vo2MaxPace.minutes} min {vo2MaxPace.seconds} sec
                  </p>
                  </div>
                )}
            </div>
          </div>
        </main>
      </body>

    </>
  );
}
