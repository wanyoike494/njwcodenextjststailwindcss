export type Tag = "JavaScript" | "CSS" | "Canvas" | "API" | "Promise" | "Animation";

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  href: string;
  tags: Tag[];
  gradient: string;
  accentColor: string;
  emoji: string;
  previewBg: string;
}

export const PROJECTS: Project[] = [
  {
    id: "digital-clock",
    title: "Digital Clock",
    description: "A clean and minimal digital clock built with JavaScript.",
    longDescription: "Real-time digital clock with hour, minute and second display. Responsive and elegant.",
    href: "/projects/digital-clock",
    tags: ["JavaScript", "Animation"],
    gradient: "from-orange-200 via-pink-200 to-rose-200",
    accentColor: "#f97316",
    emoji: "🕐",
    previewBg: "bg-gradient-to-br from-orange-100 to-rose-100",
  },
  {
    id: "paper-rock-scissors",
    title: "Paper Rock Scissors",
    description: "Classic paper, rock, scissors game with a modern interface.",
    longDescription: "Play the timeless game against the computer with smooth animations and score tracking.",
    href: "/projects/paper-rock-scissors",
    tags: ["JavaScript", "CSS"],
    gradient: "from-blue-200 via-indigo-200 to-purple-200",
    accentColor: "#6366f1",
    emoji: "✂️",
    previewBg: "bg-gradient-to-br from-indigo-100 to-purple-100",
  },
  {
    id: "calculator",
    title: "Calculator",
    description: "A fully functional calculator in HTML, CSS and JavaScript.",
    longDescription: "Standard arithmetic operations with a sleek purple interface. Clean button layout.",
    href: "/projects/calculator",
    tags: ["JavaScript", "CSS"],
    gradient: "from-purple-300 via-fuchsia-200 to-pink-200",
    accentColor: "#a855f7",
    emoji: "🧮",
    previewBg: "bg-gradient-to-br from-purple-200 to-fuchsia-200",
  },
  {
    id: "dice-roller",
    title: "Dice Roller",
    description: "Roll multiple dice with satisfying animations using Promises.",
    longDescription: "Choose how many dice to roll and watch them animate. Built with JavaScript Promises for async flow.",
    href: "/projects/dice-roller",
    tags: ["JavaScript", "Promise", "Animation"],
    gradient: "from-lime-200 via-green-200 to-emerald-200",
    accentColor: "#22c55e",
    emoji: "🎲",
    previewBg: "bg-gradient-to-br from-lime-100 to-emerald-100",
  },
  {
    id: "temperature-converter",
    title: "Temperature Converter",
    description: "Convert between Fahrenheit and Celsius instantly.",
    longDescription: "Simple, fast temperature conversion between °F and °C with a clean form interface.",
    href: "/projects/temperature-converter",
    tags: ["JavaScript"],
    gradient: "from-teal-200 via-cyan-200 to-sky-200",
    accentColor: "#06b6d4",
    emoji: "🌡️",
    previewBg: "bg-gradient-to-br from-teal-100 to-sky-100",
  },
  {
    id: "snake-game",
    title: "Snake Game",
    description: "The classic snake game rendered on an HTML5 Canvas.",
    longDescription: "Eat the food, grow longer, don't hit the walls. The timeless arcade classic in your browser.",
    href: "/projects/snake-game",
    tags: ["JavaScript", "Canvas"],
    gradient: "from-yellow-200 via-amber-200 to-orange-200",
    accentColor: "#f59e0b",
    emoji: "🐍",
    previewBg: "bg-gradient-to-br from-yellow-100 to-amber-100",
  },
  {
    id: "analog-watch",
    title: "Analog Watch",
    description: "A Swiss-style analog clock with smooth CSS animations.",
    longDescription: "Elegantly animated analog watch with hour, minute and second hands. Pure CSS-driven motion.",
    href: "/projects/analog-watch",
    tags: ["CSS", "Animation"],
    gradient: "from-slate-200 via-gray-100 to-zinc-200",
    accentColor: "#64748b",
    emoji: "⌚",
    previewBg: "bg-gradient-to-br from-slate-100 to-gray-200",
  },
  {
    id: "internet-speed-test",
    title: "Internet Speed Test",
    description: "Test your network's download speed directly in the browser.",
    longDescription: "Measures your connection speed using fetch API with an animated gauge display.",
    href: "/projects/internet-speed-test",
    tags: ["JavaScript", "API"],
    gradient: "from-rose-200 via-red-200 to-orange-200",
    accentColor: "#ef4444",
    emoji: "⚡",
    previewBg: "bg-gradient-to-br from-rose-100 to-orange-100",
  },
];
