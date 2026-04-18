// Datos simulados centralizados de BAVA
import {
  Guitar,
  Piano,
  Drum,
  Music2,
  Music4,
  Mic2,
  Music3,
  Music,
  type LucideIcon,
} from "lucide-react";

export type LevelId = 1 | 2 | 3 | 4 | 5;

export type Category = "Cuerdas" | "Viento" | "Percusión" | "Teclado" | "Voz";

export type Instrument = {
  id: string;
  name: string;
  icon: LucideIcon;
  category: Category;
  description: string;
  color: string;
};

export const instruments: Instrument[] = [
  { id: "guitarra", name: "Guitarra", icon: Guitar, category: "Cuerdas", description: "Acústica, clásica y eléctrica.", color: "from-amber-500/30 to-orange-600/20" },
  { id: "piano", name: "Piano", icon: Piano, category: "Teclado", description: "Desde clásico hasta jazz moderno.", color: "from-yellow-500/30 to-amber-600/20" },
  { id: "bateria", name: "Batería", icon: Drum, category: "Percusión", description: "Ritmo, técnica y estilos.", color: "from-orange-500/30 to-red-600/20" },
  { id: "violin", name: "Violín", icon: Music2, category: "Cuerdas", description: "Técnica clásica y moderna.", color: "from-amber-400/30 to-yellow-600/20" },
  { id: "bajo", name: "Bajo", icon: Music3, category: "Cuerdas", description: "Groove y armonía.", color: "from-orange-600/30 to-amber-700/20" },
  { id: "ukulele", name: "Ukulele", icon: Music4, category: "Cuerdas", description: "Pequeño, divertido, hawaiano.", color: "from-yellow-400/30 to-amber-500/20" },
  { id: "flauta", name: "Flauta", icon: Music, category: "Viento", description: "Travesera y dulce.", color: "from-amber-300/30 to-yellow-500/20" },
  { id: "canto", name: "Canto", icon: Mic2, category: "Voz", description: "Técnica vocal y respiración.", color: "from-orange-400/30 to-red-500/20" },
];

export const levels: { id: LevelId; name: string; subtitle: string; tone: string }[] = [
  { id: 1, name: "Principiante", subtitle: "Conceptos básicos, postura, primeras notas", tone: "level-1" },
  { id: 2, name: "Básico", subtitle: "Escalas, acordes simples, ritmo básico", tone: "level-2" },
  { id: 3, name: "Intermedio", subtitle: "Técnicas complejas, teoría, primeras canciones", tone: "level-3" },
  { id: 4, name: "Avanzado", subtitle: "Improvisación, estilos, composición", tone: "level-4" },
  { id: 5, name: "Maestro", subtitle: "Repertorio profesional, presentaciones", tone: "level-5" },
];

export type LessonType = "video" | "practica" | "teoria" | "evaluacion";
export type LessonStatus = "completada" | "en_progreso" | "bloqueada";

export type Lesson = {
  id: string;
  title: string;
  duration: string;
  type: LessonType;
  status: LessonStatus;
};

export type InstrumentProgress = {
  instrumentId: string;
  currentLevel: LevelId;
  levelProgress: number; // 0-100
  lessonsCompleted: number;
  lessonsTotal: number;
  unlockedLevels: LevelId[];
};

export const user = {
  name: "Carlos Mendoza",
  email: "carlos@bava.app",
  avatar: "CM",
  bio: "Apasionado por la música desde los 8 años. Aprendiendo guitarra y piano.",
  streak: 7,
  totalHours: 42,
  totalLessonsCompleted: 18,
};

export const userProgress: InstrumentProgress[] = [
  {
    instrumentId: "guitarra",
    currentLevel: 3,
    levelProgress: 60,
    lessonsCompleted: 8,
    lessonsTotal: 12,
    unlockedLevels: [1, 2, 3],
  },
  {
    instrumentId: "piano",
    currentLevel: 1,
    levelProgress: 20,
    lessonsCompleted: 2,
    lessonsTotal: 8,
    unlockedLevels: [1],
  },
];

export const badges = [
  { id: "primera-nota", name: "Primera nota", emoji: "🎵", date: "Hace 2 meses" },
  { id: "n1-guitarra", name: "Nivel 1 Guitarra", emoji: "🟢", date: "Hace 6 semanas" },
  { id: "n2-guitarra", name: "Nivel 2 Guitarra", emoji: "🔵", date: "Hace 3 semanas" },
  { id: "racha-7", name: "7 días seguidos", emoji: "🔥", date: "Hoy" },
];

export const weeklyPractice = [
  { day: "L", minutes: 25 },
  { day: "M", minutes: 40 },
  { day: "X", minutes: 30 },
  { day: "J", minutes: 55 },
  { day: "V", minutes: 20 },
  { day: "S", minutes: 60 },
  { day: "D", minutes: 35 },
];

export const testimonials = [
  {
    name: "Sofía Ramírez",
    role: "Estudiante de piano · Nivel 4",
    avatar: "SR",
    text: "BAVA cambió mi forma de aprender. Los maestros son excelentes y el sistema de niveles me mantiene motivada cada día.",
  },
  {
    name: "Diego Torres",
    role: "Estudiante de guitarra · Nivel 3",
    avatar: "DT",
    text: "Llevaba años queriendo aprender guitarra. En 4 meses con BAVA ya toco mis canciones favoritas. Increíble.",
  },
  {
    name: "Lucía Martínez",
    role: "Estudiante de canto · Nivel 5",
    avatar: "LM",
    text: "La calidad de las lecciones es de conservatorio. Y poder practicar a mi ritmo desde casa es invaluable.",
  },
];

export const plans = [
  {
    id: "gratis",
    name: "Gratis",
    price: "$0",
    period: "Para siempre",
    description: "Empieza tu camino musical sin costo.",
    features: [
      "1 instrumento",
      "Acceso a Nivel 1",
      "Lecciones básicas",
      "Comunidad de estudiantes",
    ],
    cta: "Empezar gratis",
    highlight: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: "$9.99",
    period: "/ mes",
    description: "Para estudiantes serios que quieren progresar.",
    features: [
      "Todos los instrumentos",
      "Niveles 1, 2 y 3",
      "Evaluaciones y certificados",
      "Soporte prioritario",
      "Sin anuncios",
    ],
    cta: "Hacerme Pro",
    highlight: true,
  },
  {
    id: "maestro",
    name: "Maestro",
    price: "$19.99",
    period: "/ mes",
    description: "Domina cada instrumento al nivel profesional.",
    features: [
      "Todo lo de Pro",
      "Niveles 4 y 5 desbloqueados",
      "Sesiones 1-a-1 con maestros",
      "Master classes exclusivas",
      "Certificación profesional",
    ],
    cta: "Ser Maestro",
    highlight: false,
  },
];

export function getInstrumentLessons(instrumentId: string, level: LevelId, progress?: InstrumentProgress): Lesson[] {
  const base: Omit<Lesson, "status">[] = [
    { id: `${instrumentId}-${level}-1`, title: "Introducción al nivel", duration: "8 min", type: "video" },
    { id: `${instrumentId}-${level}-2`, title: "Postura y técnica", duration: "12 min", type: "video" },
    { id: `${instrumentId}-${level}-3`, title: "Práctica guiada #1", duration: "15 min", type: "practica" },
    { id: `${instrumentId}-${level}-4`, title: "Teoría musical aplicada", duration: "10 min", type: "teoria" },
    { id: `${instrumentId}-${level}-5`, title: "Práctica guiada #2", duration: "20 min", type: "practica" },
    { id: `${instrumentId}-${level}-6`, title: "Lectura de partituras", duration: "14 min", type: "teoria" },
    { id: `${instrumentId}-${level}-7`, title: "Canción de aplicación", duration: "25 min", type: "video" },
    { id: `${instrumentId}-${level}-8`, title: "Práctica guiada #3", duration: "18 min", type: "practica" },
    { id: `${instrumentId}-${level}-9`, title: "Repaso del nivel", duration: "12 min", type: "video" },
    { id: `${instrumentId}-${level}-10`, title: "Mini-canción final", duration: "22 min", type: "practica" },
    { id: `${instrumentId}-${level}-11`, title: "Preparación evaluación", duration: "10 min", type: "teoria" },
    { id: `${instrumentId}-${level}-12`, title: "Evaluación de nivel", duration: "15 min", type: "evaluacion" },
  ];

  return base.map((lesson, i) => {
    let status: LessonStatus = "bloqueada";
    if (progress && progress.currentLevel === level) {
      if (i < progress.lessonsCompleted) status = "completada";
      else if (i === progress.lessonsCompleted) status = "en_progreso";
    } else if (progress && level < progress.currentLevel && progress.unlockedLevels.includes(level)) {
      status = "completada";
    } else if (level === 1 && !progress) {
      status = i < 3 ? "en_progreso" : "bloqueada";
    }
    return { ...lesson, status };
  });
}

export function findInstrument(id: string) {
  return instruments.find((i) => i.id === id);
}

export function findProgress(instrumentId: string) {
  return userProgress.find((p) => p.instrumentId === instrumentId);
}
