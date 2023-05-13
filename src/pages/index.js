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
  const [tempoPace, setTempoPace] = useState(null);
  const [showPaces, setShowPaces] = useState(false);
  const [showLapTimes, setShowLapTimes] = useState(false); // New state for managing the visibility of cumulative lap times
  const [showTips, setShowTips] = useState(false);

  const calculatePaces = () => {
    const totalTimeInSeconds = parseInt(minutes) * 60 + parseInt(seconds);

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

    const tempo = criticalVelocityPace * 0.9;
    const tempoMetresPerSecond = 1000 / tempo;
    const tempoPerKmMinutes = Math.floor(tempoMetresPerSecond / 60);
    const tempoPerKmSeconds = Math.round(tempoMetresPerSecond % 60);

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
    setTempoPace({ minutes: tempoPerKmMinutes, seconds: tempoPerKmSeconds });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    calculatePaces();

    const totalTimeInSeconds = parseInt(minutes) * 60 + parseInt(seconds);

    const lapCount = 6;
    const cumulativeLapTimes = [];
    let cumulativeTime = 0;

    for (let i = 1; i <= lapCount; i++) {
      cumulativeTime += totalTimeInSeconds / lapCount;
      cumulativeLapTimes.push({ lap: i, time: cumulativeTime });
    }

    setLapTimes(cumulativeLapTimes);
    setShowLapTimes(true);
    setShowPaces(false);
    setShowTips(true);
  };

  const handleShowPaces = () => {
    calculatePaces();
    setShowPaces(true);
    setShowLapTimes(false);
  };
  const toggleTips = () => {
    setShowTips(!showTips);
  };
  return (
    <>
      <Head>
        <title>2.4km Run Time Tracker</title>
        <meta name="description" content="2.4km Run Time Tracker App" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="min-h-screen grid place-items-center">
          <div className="relative w-full max-w-md p-8">
            <p className="mb-4">
              {" "}
              Made by <a href="https://danielching.me">Daniel Ching</a>
            </p>
            <h1 className="text-2xl font-bold mb-4">All-in-one 2.4km App 🏃‍♂️</h1>

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
              <button
                type="button"
                onClick={handleShowPaces}
                className="w-full mt-4 px-3 py-4 text-white bg-green-500 hover:bg-green-600 rounded-md focus:bg-green-600 focus:outline-none"
              >
                Show Training Paces
              </button>
            </form>
            <div className=" ">
              <h2 className="text-xl font-bold mt-4">Articles:</h2>
              <ul className="list-disc pl-5">
                <li>
                  <a
                    href="https://betterhumans.pub/how-to-get-good-at-2-4km-a-comprehensive-guide-85e9669ee19c"
                    target="_blank"
                    className="hover:underline"
                  >
                    How to get good at 2.4km: A comprehensive guide
                  </a>
                </li>
                <li>
                  <a
                    href="https://medium.com/better-humans/preventing-overtraining-achieving-sustainable-growth-c47fcc6c2d7f"
                    target="_blank"
                    className="hover:underline"
                  >
                    On Sustainable Training
                  </a>
                </li>
              </ul>
            </div>
            {showLapTimes && lapTimes.length > 0 && (
              <div>
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
                <button
                  onClick={toggleTips}
                  className="w-full mt-4 px-3 py-4 text-white bg-green-500 hover:bg-green-600 rounded-md focus:bg-green-600 focus:outline-none"
                >
                  Tips for runners
                </button>

                {showTips && (
                  <div className="mt-6">
                    <h2 className="text-xl font-bold mb-4">
                      Tips for Runners:
                    </h2>
                    <ul className="list-disc pl-5">
                      <li>
                        Pace yourself! If you go out too hard, you will surely
                        die.
                      </li>
                      <li>Relax through the pain. Don't fight it.</li>
                      <li>Focus each 400m at a time.</li>
                      <li>Work together, chase people down.</li>
                      <li>Carbohydrate load (add rice) one day before!</li>
                    </ul>
                  </div>
                )}
              </div>
            )}
            {showPaces &&
              criticalVelocityPace &&
              vo2MaxPace &&
              easyPace &&
              thresholdPace && (
                <div className="mt-6">
                  <h2 className="text-xl font-bold mb-4">
                    Training Paces (per km):
                  </h2>
                  <p className="font-bold mb-2 mt-4">Easy Pace:</p>
                  {easyPace.minutes} min {easyPace.seconds} sec
                  <p className="font-bold mb-2 mt-4">Tempo Pace:</p>
                  {tempoPace.minutes} min {tempoPace.seconds} sec
                  <p className="font-bold mb-2 mt-4">Threshold Pace:</p>
                  {thresholdPace.minutes} min {thresholdPace.seconds} sec
                  <p className="font-bold mb-2 mt-4">Critical Velocity Pace:</p>
                  <p>
                    {criticalVelocityPace.minutes} min{" "}
                    {criticalVelocityPace.seconds} sec
                  </p>
                  <p className="font-bold mb-2 mt-4">Vo2 Max / 2.4km Pace:</p>
                  <p>
                    {vo2MaxPace.minutes} min {vo2MaxPace.seconds} sec
                  </p>
                </div>
              )}
          </div>
        </div>
      </main>
    </>
  );
}
