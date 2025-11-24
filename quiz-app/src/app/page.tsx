"use client";

import { useMemo, useState } from "react";
import { personas, questions, type PersonaKey } from "@/data/quiz";

type Answers = Record<number, PersonaKey>;
type PersonaTally = Record<PersonaKey, number>;

const personaOrder: PersonaKey[] = [
  "resonant_empath",
  "verdant_curator",
  "symmetry_savant",
  "vitality_alchemist",
];

const personaBadges: Record<PersonaKey, string> = {
  resonant_empath: "💫",
  verdant_curator: "🌿",
  symmetry_savant: "📐",
  vitality_alchemist: "⚡",
};

export default function Home() {
  const [answers, setAnswers] = useState<Answers>({});

  const answeredCount = useMemo(
    () => Object.keys(answers).length,
    [answers],
  );

  const tally = useMemo(() => {
    return personaOrder.reduce<PersonaTally>(
      (acc, key) => ({
        ...acc,
        [key]: Object.values(answers).filter((value) => value === key).length,
      }),
      {
        resonant_empath: 0,
        verdant_curator: 0,
        symmetry_savant: 0,
        vitality_alchemist: 0,
      },
    );
  }, [answers]);

  const dominantPersona = useMemo(() => {
    const [top] = personaOrder
      .map((key) => ({ key, value: tally[key] }))
      .sort((a, b) => b.value - a.value);
    return top?.value ? top.key : null;
  }, [tally]);

  const handleSelect = (questionId: number, persona: PersonaKey) => {
    setAnswers((prev) => ({ ...prev, [questionId]: persona }));
  };

  const completion = Math.round(
    (answeredCount / questions.length) * 100,
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 via-white to-zinc-100 text-zinc-900">
      <main className="mx-auto flex min-h-screen w-full max-w-4xl flex-col gap-12 px-6 py-12 sm:px-10 lg:px-14">
        <section className="space-y-6 rounded-3xl border border-zinc-200 bg-white/80 p-10 shadow-lg shadow-zinc-200/40 backdrop-blur">
          <p className="text-sm uppercase tracking-[0.4em] text-zinc-500">
            🌟 Psychology &amp; Outer Beauty Quiz
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Decode how you perceive beauty from the inside out.
          </h1>
          <p className="text-lg text-zinc-600 sm:text-xl">
            Twenty deep-diving questions interweave perception, cognition, and
            physiology. Choose the answer that feels most like you—even if two
            resonate. Each response unveils the psychological lens shaping your
            sense of beauty.
          </p>
          <div className="flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-zinc-50/80 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-zinc-500">
                Progress
              </p>
              <p className="text-2xl font-semibold text-zinc-900">
                {answeredCount}/{questions.length}
              </p>
            </div>
            <div className="w-full flex-1 rounded-full bg-white shadow-inner">
              <div
                className="h-3 rounded-full bg-zinc-900 transition-all ease-out"
                style={{ width: `${completion}%` }}
              />
            </div>
            <p className="text-sm text-zinc-500 sm:w-28 sm:text-right">
              {completion}% complete
            </p>
          </div>
        </section>

        <section aria-labelledby="part-one" className="space-y-10">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.35em] text-zinc-500">
              ⸻ Part 1
            </p>
            <h2
              id="part-one"
              className="text-2xl font-semibold tracking-tight sm:text-3xl"
            >
              The Quiz — 20 Insight-Forging Scenarios
            </h2>
            <p className="text-base text-zinc-600">
              Tap an option in each question. Every answer includes a micro
              analysis revealing the psychological motive behind your choice.
            </p>
          </div>

          <ol className="space-y-8">
            {questions.map((item) => {
              const selected = answers[item.id];

              return (
                <li
                  key={item.id}
                  className="space-y-5 rounded-3xl border border-zinc-200 bg-white/90 p-6 shadow-sm shadow-zinc-200/60 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-zinc-200/70 sm:p-8"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-500">
                        {item.theme}
                      </p>
                      <h3 className="mt-1 text-xl font-semibold text-zinc-900 sm:text-2xl">
                        {item.id}. {item.question}
                      </h3>
                    </div>
                    <span className="rounded-full border border-zinc-200 bg-zinc-50 px-4 py-1 text-xs font-medium tracking-[0.3em] text-zinc-500">
                      🌟 ⸻
                    </span>
                  </div>
                  <div className="space-y-4">
                    {item.options.map((option) => {
                      const isActive = selected === option.persona;
                      return (
                        <button
                          key={option.label}
                          type="button"
                          onClick={() => handleSelect(item.id, option.persona)}
                          className={`group w-full rounded-2xl border p-4 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 ${
                            isActive
                              ? "border-amber-500 bg-amber-50/80 shadow-inner"
                              : "border-zinc-200 bg-white hover:border-zinc-300"
                          }`}
                        >
                          <div className="flex items-start gap-4">
                            <span
                              className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm font-semibold ${
                                isActive
                                  ? "border-amber-400 bg-amber-100 text-amber-700"
                                  : "border-zinc-200 bg-zinc-50 text-zinc-500"
                              }`}
                            >
                              {option.label}
                            </span>
                            <div className="space-y-2">
                              <p className="text-base font-medium text-zinc-900 sm:text-lg">
                                {option.text}
                              </p>
                              <p
                                className={`text-sm leading-relaxed ${
                                  isActive ? "text-amber-700" : "text-zinc-500"
                                }`}
                              >
                                {option.analysis}
                              </p>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  {selected && (
                    <div className="rounded-2xl border border-zinc-200 bg-zinc-50/80 p-4 text-sm text-zinc-600">
                      <p className="font-medium text-zinc-800">
                        Lens activated: {personas[selected].title}
                      </p>
                      <p className="mt-1">{personas[selected].summary}</p>
                    </div>
                  )}
                </li>
              );
            })}
          </ol>
        </section>

        <section
          aria-labelledby="part-two"
          className="space-y-10 rounded-3xl border border-zinc-200 bg-white/80 p-8 shadow-lg shadow-zinc-200/50"
        >
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.35em] text-zinc-500">
              ⸻ Part 2
            </p>
            <h2
              id="part-two"
              className="text-2xl font-semibold tracking-tight sm:text-3xl"
            >
              Final Personality Types
            </h2>
            <p className="text-base text-zinc-600">
              Each persona blends psychology with outer beauty cues. Your result
              emerges below once every question is answered.
            </p>
          </div>

          {dominantPersona ? (
            <div className="space-y-5 rounded-3xl border border-amber-400/80 bg-amber-50/70 p-6 shadow-inner">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-600">
                Your signature lens
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-2">
                  <h3 className="flex items-center gap-3 text-2xl font-semibold text-amber-900">
                    <span className="text-3xl">
                      {personaBadges[dominantPersona]}
                    </span>
                    {personas[dominantPersona].title}
                  </h3>
                  <p className="text-base text-amber-800">
                    {personas[dominantPersona].summary}
                  </p>
                </div>
                <div className="rounded-2xl border border-amber-200 bg-white/60 p-4 text-sm text-amber-700 shadow-sm">
                  <p className="font-medium uppercase tracking-[0.2em]">
                    How you perceive
                  </p>
                  <p className="mt-2 leading-relaxed">
                    {personas[dominantPersona].perception}
                  </p>
                </div>
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                {personaOrder.map((key) => (
                  <div
                    key={key}
                    className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-sm ${
                      key === dominantPersona
                        ? "border-amber-500 bg-amber-100 text-amber-800"
                        : "border-amber-200 bg-white/70 text-amber-700"
                    }`}
                  >
                    <span className="flex items-center gap-2 font-medium">
                      <span>{personaBadges[key]}</span>
                      {personas[key].title}
                    </span>
                    <span className="font-semibold">{tally[key]}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="rounded-3xl border border-zinc-200 bg-zinc-50/80 p-6 text-sm text-zinc-500">
              Answer every question to unveil your predominant beauty lens.
            </div>
          )}

          <div className="grid gap-6 sm:grid-cols-2">
            {personaOrder.map((key) => (
              <article
                key={key}
                className="space-y-3 rounded-3xl border border-zinc-200 bg-white/70 p-5 shadow-sm"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-zinc-400">
                  {personaBadges[key]} Persona
                </p>
                <h3 className="text-xl font-semibold text-zinc-900">
                  {personas[key].title}
                </h3>
                <p className="text-sm text-zinc-600">{personas[key].summary}</p>
                <div className="rounded-2xl border border-zinc-200 bg-zinc-50/90 p-4 text-sm text-zinc-500">
                  <p className="font-medium text-zinc-700">
                    What this says about your perception
                  </p>
                  <p className="mt-2 leading-relaxed">
                    {personas[key].perception}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <footer className="pb-6 text-center text-xs uppercase tracking-[0.4em] text-zinc-400">
          ⸻ Crafted for introspective dreamers of beauty psychology ⸻
        </footer>
      </main>
    </div>
  );
}
