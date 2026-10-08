"use client";

import { useState } from "react";

export default function OnboardingPage() {
  const [step, setStep] = useState(1);

  const [subject, setSubject] = useState("");
  const [goal, setGoal] = useState("Exam");

  const [studyTime, setStudyTime] = useState("");
  const [studyDays, setStudyDays] = useState<string[]>([]);

  const [level, setLevel] = useState("");

  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStarted, setAnalysisStarted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const toggleDay = (day: string) => {
    setStudyDays((currentDays) =>
      currentDays.includes(day)
        ? currentDays.filter((item) => item !== day)
        : [...currentDays, day]
    );
  };

  const handleFirstContinue = () => {
    if (!subject.trim()) {
      alert("Please enter what you want to learn.");
      return;
    }

    setStep(2);
  };

  const handleSecondContinue = () => {
    if (!studyTime) {
      alert("Please select how much time you can study.");
      return;
    }

    if (studyDays.length === 0) {
      alert("Please select at least one study day.");
      return;
    }

    setStep(3);
  };

  const handleThirdContinue = () => {
    if (!level) {
      alert("Please select your current level.");
      return;
    }

    setStep(4);
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    if (selectedFile.type !== "application/pdf") {
      alert("Please select a PDF file.");
      event.target.value = "";
      return;
    }

    setFile(selectedFile);
    setAnalysisStarted(false);
  };

  const removeFile = () => {
    setFile(null);
    setAnalysisStarted(false);
  };

  const handleAnalyze = () => {
    if (!file) {
      alert("Please upload a study material first.");
      return;
    }

    setIsAnalyzing(true);

    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisStarted(true);
    }, 1500);
  };

  const handleBuildLearningPlan = async () => {
    setIsSaving(true);

    try {
      const response = await fetch("/api/learning-goals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject,
          goal,
          dailyStudyTime: studyTime,
          studyDays: studyDays.join(", "),
          currentLevel: level,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to save learning goal.");
      }

      console.log("Learning goal created:", data.learningGoal);

      alert("Your learning goal has been saved successfully!");
    } catch (error) {
      console.error("Learning goal error:", error);

      alert(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsSaving(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024 * 1024) {
      return `${Math.round(bytes / 1024)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="mx-auto max-w-2xl">

        {/* Logo */}
        <div className="mb-12 text-center">
          <p className="text-2xl font-bold tracking-tight">
            IGNIVO
          </p>

          <p className="mt-2 text-sm text-slate-500">
            Learn. Practice. Master.
          </p>
        </div>

        {/* Progress */}
        <div className="mb-10">
          <div className="flex justify-between text-sm text-slate-500">
            <span>Step {step} of 4</span>

            <span>
              {step === 1 && "Learning goal"}
              {step === 2 && "Study schedule"}
              {step === 3 && "Current level"}
              {step === 4 && "Study materials"}
            </span>
          </div>

          <div className="mt-3 h-2 rounded-full bg-slate-200">
            <div
              className="h-2 rounded-full bg-slate-900 transition-all duration-300"
              style={{ width: `${step * 25}%` }}
            />
          </div>
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">

            <div className="mb-8">
              <p className="text-sm font-medium text-slate-500">
                LET&apos;S GET STARTED
              </p>

              <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                What do you want to learn?
              </h1>

              <p className="mt-3 leading-7 text-slate-600">
                Tell Ignivo what you&apos;re preparing for. We&apos;ll use this
                information to build your learning journey.
              </p>
            </div>

            <div>
              <label
                htmlFor="subject"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Subject or topic
              </label>

              <input
                id="subject"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Human Physiology"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
              />
            </div>

            <div className="mt-6">
              <label
                htmlFor="goal"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                What are you preparing for?
              </label>

              <select
                id="goal"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
              >
                <option>Exam</option>
                <option>Course</option>
                <option>Personal learning</option>
                <option>Professional certification</option>
                <option>Other</option>
              </select>
            </div>

            <button
              type="button"
              onClick={handleFirstContinue}
              className="mt-8 w-full rounded-xl bg-slate-900 px-6 py-4 font-medium text-white transition hover:bg-slate-800"
            >
              Continue
            </button>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">

            <div className="mb-8">
              <p className="text-sm font-medium text-slate-500">
                BUILD YOUR SCHEDULE
              </p>

              <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                When can you study?
              </h1>

              <p className="mt-3 leading-7 text-slate-600">
                Ignivo will use your available time to create a realistic
                learning schedule instead of overwhelming you.
              </p>
            </div>

            <div>
              <p className="mb-3 text-sm font-medium text-slate-700">
                How much time can you study each day?
              </p>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {["30 min", "1 hour", "2 hours", "3+ hours"].map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setStudyTime(time)}
                    className={`rounded-xl border px-4 py-4 text-sm font-medium transition ${studyTime === time
                      ? "border-slate-900 bg-slate-900 text-white"
                      : "border-slate-300 bg-white text-slate-700 hover:border-slate-500"
                      }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <p className="mb-3 text-sm font-medium text-slate-700">
                Which days can you study?
              </p>

              <div className="grid grid-cols-4 gap-3 sm:grid-cols-7">
                {days.map((day) => {
                  const selected = studyDays.includes(day);

                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={() => toggleDay(day)}
                      className={`rounded-xl border px-2 py-3 text-sm font-medium transition ${selected
                        ? "border-slate-900 bg-slate-900 text-white"
                        : "border-slate-300 bg-white text-slate-700 hover:border-slate-500"
                        }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-1/3 rounded-xl border border-slate-300 px-6 py-4 font-medium text-slate-700 hover:bg-slate-50"
              >
                Back
              </button>

              <button
                type="button"
                onClick={handleSecondContinue}
                className="w-2/3 rounded-xl bg-slate-900 px-6 py-4 font-medium text-white hover:bg-slate-800"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">

            <div className="mb-8">
              <p className="text-sm font-medium text-slate-500">
                KNOW YOUR STARTING POINT
              </p>

              <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                How familiar are you with this subject?
              </h1>

              <p className="mt-3 leading-7 text-slate-600">
                This gives Ignivo a starting point. Your actual performance
                will become more important as you learn.
              </p>
            </div>

            <div className="space-y-3">

              {[
                {
                  name: "Beginner",
                  description:
                    "I&apos;m new to this subject or understand very little.",
                },
                {
                  name: "Intermediate",
                  description:
                    "I know the basics but need to strengthen my understanding.",
                },
                {
                  name: "Advanced",
                  description:
                    "I already understand most of the subject.",
                },
              ].map((item) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => setLevel(item.name)}
                  className={`w-full rounded-xl border p-5 text-left transition ${level === item.name
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-300 hover:border-slate-500"
                    }`}
                >
                  <p className="font-semibold">
                    {item.name}
                  </p>

                  <p
                    className={`mt-1 text-sm ${level === item.name
                      ? "text-slate-300"
                      : "text-slate-500"
                      }`}
                  >
                    {item.description}
                  </p>
                </button>
              ))}

            </div>

            <div className="mt-8 flex gap-3">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-1/3 rounded-xl border border-slate-300 px-6 py-4 font-medium text-slate-700 hover:bg-slate-50"
              >
                Back
              </button>

              <button
                type="button"
                onClick={handleThirdContinue}
                className="w-2/3 rounded-xl bg-slate-900 px-6 py-4 font-medium text-white hover:bg-slate-800"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* STEP 4 */}
        {step === 4 && !analysisStarted && (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">

            <div className="mb-8">
              <p className="text-sm font-medium text-slate-500">
                YOUR STUDY MATERIALS
              </p>

              <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                Give Ignivo something to learn from.
              </h1>

              <p className="mt-3 leading-7 text-slate-600">
                Upload your lecture notes, slides, or study material.
                Ignivo will eventually use these materials to build your
                personalized learning journey.
              </p>
            </div>

            {!file ? (
              <label
                htmlFor="material"
                className="block cursor-pointer rounded-2xl border-2 border-dashed border-slate-300 p-10 text-center transition hover:border-slate-500 hover:bg-slate-50"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
                  <span className="text-2xl">↑</span>
                </div>

                <h2 className="mt-5 font-semibold text-slate-800">
                  Upload a PDF
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Click here to browse your computer
                </p>

                <p className="mt-4 text-xs text-slate-400">
                  PDF files only
                </p>

                <input
                  id="material"
                  type="file"
                  accept=".pdf,application/pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            ) : (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">

                <div className="flex items-center gap-4">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white border border-slate-200">
                    <span className="text-sm font-bold text-slate-700">
                      PDF
                    </span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-slate-800">
                      {file.name}
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      {formatFileSize(file.size)}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={removeFile}
                    className="rounded-lg px-3 py-2 text-sm text-slate-500 hover:bg-white hover:text-slate-900"
                  >
                    Remove
                  </button>

                </div>
              </div>
            )}

            <div className="mt-8 flex gap-3">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="w-1/3 rounded-xl border border-slate-300 px-6 py-4 font-medium text-slate-700 hover:bg-slate-50"
              >
                Back
              </button>

              <button
                type="button"
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="w-2/3 rounded-xl bg-slate-900 px-6 py-4 font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isAnalyzing ? "Preparing..." : "Analyze My Material"}
              </button>
            </div>

          </div>
        )}

        {/* ANALYSIS PLACEHOLDER */}
        {step === 4 && analysisStarted && (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm md:p-10">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
              <span className="text-2xl">✓</span>
            </div>

            <h1 className="mt-6 text-3xl font-bold tracking-tight">
              Your material is ready.
            </h1>

            <p className="mx-auto mt-4 max-w-lg leading-7 text-slate-600">
              Ignivo has received your study material. The next stage is to
              analyze it, identify its topics, and build your personalized
              learning plan.
            </p>

            <div className="mt-8 rounded-xl bg-slate-50 p-5 text-left">
              <p className="text-sm text-slate-500">
                Learning goal
              </p>

              <p className="mt-1 font-semibold">
                {subject}
              </p>

              <p className="mt-4 text-sm text-slate-500">
                Preparation
              </p>

              <p className="mt-1 font-semibold">
                {goal}
              </p>

              <p className="mt-4 text-sm text-slate-500">
                Starting level
              </p>

              <p className="mt-1 font-semibold">
                {level}
              </p>

              <p className="mt-4 text-sm text-slate-500">
                Study schedule
              </p>

              <p className="mt-1 font-semibold">
                {studyTime} · {studyDays.join(", ")}
              </p>
            </div>

            <button
              type="button"
              onClick={handleBuildLearningPlan}
              disabled={isSaving}
              className="mt-8 w-full rounded-xl bg-slate-900 px-6 py-4 font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSaving ? "Building Your Plan..." : "Build My Learning Plan"}
            </button>

          </div>
        )}

        <p className="mt-6 text-center text-sm text-slate-400">
          You can change your learning plan later.
        </p>

      </div>
    </main>
  );
}