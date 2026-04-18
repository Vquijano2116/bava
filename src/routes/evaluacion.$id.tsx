import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, CheckCircle2, XCircle, Trophy, RotateCcw } from "lucide-react";
import { PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/evaluacion/$id")({
  head: () => ({
    meta: [
      { title: "Evaluación — BAVA" },
      { name: "description", content: "Evalúa lo aprendido y desbloquea el siguiente nivel." },
    ],
  }),
  component: Evaluation,
});

type Question = {
  q: string;
  options: string[];
  correct: number;
  explain: string;
};

const questions: Question[] = [
  {
    q: "¿Cuántas cuerdas tiene una guitarra estándar?",
    options: ["4", "5", "6", "7"],
    correct: 2,
    explain: "La guitarra estándar tiene 6 cuerdas, afinadas E-A-D-G-B-E.",
  },
  {
    q: "¿Qué es un acorde mayor?",
    options: [
      "Un acorde con sonido triste",
      "La combinación de tónica, tercera mayor y quinta justa",
      "Un acorde con 7 notas",
      "Una escala completa",
    ],
    correct: 1,
    explain: "Un acorde mayor se forma con tónica, tercera mayor y quinta justa.",
  },
  {
    q: "¿Qué indica el tempo en una pieza musical?",
    options: ["El volumen", "La afinación", "La velocidad", "La duración total"],
    correct: 2,
    explain: "El tempo indica la velocidad a la que se interpreta la pieza, medida en BPM.",
  },
  {
    q: "¿Qué es una escala?",
    options: [
      "Un instrumento",
      "Una secuencia ordenada de notas",
      "Un acorde",
      "Un tipo de partitura",
    ],
    correct: 1,
    explain: "Una escala es una sucesión ordenada de notas siguiendo un patrón de intervalos.",
  },
  {
    q: "¿Qué es la cejilla en la guitarra?",
    options: [
      "Una afinación especial",
      "Un acorde abierto",
      "Presionar varias cuerdas con un solo dedo",
      "Un tipo de púa",
    ],
    correct: 2,
    explain: "La cejilla consiste en presionar varias cuerdas con un mismo dedo, generalmente el índice.",
  },
];

function Evaluation() {
  const { id } = useParams({ from: "/evaluacion/$id" });
  const [instrumentId] = id.split("-");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const finished = answers.length === questions.length;
  const score = finished
    ? Math.round((answers.filter((a, i) => a === questions[i].correct).length / questions.length) * 100)
    : 0;
  const passed = score >= 70;

  const handleNext = () => {
    if (selected === null) return;
    const newAnswers = [...answers, selected];
    setAnswers(newAnswers);
    setSelected(null);
    setSubmitted(false);
    if (current < questions.length - 1) setCurrent(current + 1);
  };

  const handleRetry = () => {
    setCurrent(0);
    setAnswers([]);
    setSelected(null);
    setSubmitted(false);
  };

  if (finished) {
    return (
      <PageShell>
        <div className="container mx-auto px-6 py-16 max-w-2xl">
          <div className="text-center p-10 rounded-3xl bg-gradient-to-br from-surface-elevated to-surface ring-1 ring-gold/30">
            <div
              className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center ${
                passed ? "bg-gradient-gold shadow-glow" : "bg-surface ring-2 ring-destructive/40"
              }`}
            >
              {passed ? (
                <Trophy className="text-primary-foreground" size={44} />
              ) : (
                <XCircle className="text-destructive" size={44} />
              )}
            </div>
            <h1 className="font-display text-4xl font-bold mb-2">
              {passed ? "¡Aprobado!" : "Sigue practicando"}
            </h1>
            <p className="text-muted-foreground mb-6">
              Tu puntuación: <span className="text-gradient-gold font-bold text-2xl">{score}%</span>
            </p>

            <div className="space-y-3 mb-8 text-left">
              {questions.map((q, i) => {
                const correct = answers[i] === q.correct;
                return (
                  <div
                    key={i}
                    className={`p-4 rounded-xl text-sm ${
                      correct
                        ? "bg-gold/5 ring-1 ring-gold/20"
                        : "bg-destructive/5 ring-1 ring-destructive/20"
                    }`}
                  >
                    <div className="flex items-start gap-2 mb-1">
                      {correct ? (
                        <CheckCircle2 className="text-gold flex-shrink-0 mt-0.5" size={16} />
                      ) : (
                        <XCircle className="text-destructive flex-shrink-0 mt-0.5" size={16} />
                      )}
                      <span className="font-medium">{q.q}</span>
                    </div>
                    <p className="text-xs text-muted-foreground ml-6">{q.explain}</p>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              {!passed && (
                <button
                  onClick={handleRetry}
                  className="flex-1 py-3 rounded-full bg-surface-elevated ring-1 ring-border font-semibold text-sm hover:ring-gold/40"
                >
                  <RotateCcw size={14} className="inline mr-2" />
                  Reintentar (en 24h)
                </button>
              )}
              <Link
                to="/instrumento/$id"
                params={{ id: instrumentId || "guitarra" }}
                className="flex-1 py-3 rounded-full bg-gradient-gold text-primary-foreground font-semibold text-sm hover:scale-[1.02] transition-transform text-center"
              >
                {passed ? "Ir al siguiente nivel" : "Volver al instrumento"}
              </Link>
            </div>
          </div>
        </div>
      </PageShell>
    );
  }

  const q = questions[current];

  return (
    <PageShell>
      <div className="container mx-auto px-6 py-12 max-w-2xl">
        <Link
          to="/instrumento/$id"
          params={{ id: instrumentId || "guitarra" }}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold mb-6"
        >
          <ArrowLeft size={16} /> Salir de la evaluación
        </Link>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-3 text-sm">
            <span className="text-gold font-semibold">
              Pregunta {current + 1} de {questions.length}
            </span>
            <span className="text-muted-foreground">Mín. para aprobar: 70%</span>
          </div>
          <div className="h-1.5 rounded-full bg-surface-elevated overflow-hidden">
            <div
              className="h-full bg-gradient-gold transition-all duration-500"
              style={{ width: `${((current + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="p-8 rounded-3xl bg-surface border border-border/60">
          <h2 className="font-display text-2xl font-semibold mb-6">{q.q}</h2>

          <div className="space-y-3 mb-6">
            {q.options.map((opt, i) => {
              const isSelected = selected === i;
              const isCorrect = i === q.correct;
              const showResult = submitted;
              return (
                <button
                  key={i}
                  onClick={() => !submitted && setSelected(i)}
                  disabled={submitted}
                  className={`w-full text-left p-4 rounded-xl ring-1 transition-all flex items-center gap-3 ${
                    showResult && isCorrect
                      ? "bg-gold/10 ring-gold text-foreground"
                      : showResult && isSelected && !isCorrect
                        ? "bg-destructive/10 ring-destructive text-foreground"
                        : isSelected
                          ? "bg-gold/5 ring-gold/60"
                          : "bg-surface-elevated ring-border hover:ring-gold/30"
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                      isSelected ? "bg-gradient-gold text-primary-foreground" : "bg-surface text-muted-foreground"
                    }`}
                  >
                    {String.fromCharCode(65 + i)}
                  </div>
                  <span className="flex-1 text-sm">{opt}</span>
                  {showResult && isCorrect && <CheckCircle2 className="text-gold" size={18} />}
                  {showResult && isSelected && !isCorrect && (
                    <XCircle className="text-destructive" size={18} />
                  )}
                </button>
              );
            })}
          </div>

          {submitted && (
            <div className="p-4 rounded-xl bg-surface-elevated text-sm text-muted-foreground mb-4">
              💡 {q.explain}
            </div>
          )}

          <div className="flex justify-end gap-3">
            {!submitted ? (
              <button
                onClick={() => setSubmitted(true)}
                disabled={selected === null}
                className="px-6 py-3 rounded-full bg-gradient-gold text-primary-foreground font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] transition-transform"
              >
                Verificar
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-6 py-3 rounded-full bg-gradient-gold text-primary-foreground font-semibold text-sm hover:scale-[1.02] transition-transform"
              >
                {current < questions.length - 1 ? "Siguiente pregunta" : "Ver resultados"}
              </button>
            )}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
