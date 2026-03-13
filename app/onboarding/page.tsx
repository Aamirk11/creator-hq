"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import { Zap, ChevronLeft, Check, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const TOTAL_STEPS = 4;
const SWIPE_THRESHOLD = 60;

const platforms = [
  { name: "YouTube", color: "#FF0000", bg: "bg-red-500" },
  { name: "TikTok", color: "#00F2EA", bg: "bg-cyan-400" },
  { name: "Instagram", color: "#E1306C", bg: "bg-pink-500" },
  { name: "Patreon", color: "#FF424D", bg: "bg-orange-400" },
] as const;

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
  }),
};

const slideTransition = {
  type: "spring" as const,
  stiffness: 300,
  damping: 30,
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

/* ------------------------------------------------------------------ */
/*  Confetti burst (Step 4)                                            */
/* ------------------------------------------------------------------ */

function ConfettiBurst() {
  const particles = Array.from({ length: 24 }, (_, i) => {
    const angle = (i / 24) * 360;
    const distance = 60 + Math.random() * 60;
    const size = 6 + Math.random() * 10;
    const colors = ["#7C3AED", "#EC4899", "#A78BFA", "#F472B6", "#C084FC"];
    const color = colors[i % colors.length];
    const delay = Math.random() * 0.3;

    return (
      <motion.div
        key={i}
        className="absolute rounded-full"
        style={{
          width: size,
          height: size,
          backgroundColor: color,
          left: "50%",
          top: "50%",
        }}
        initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
        animate={{
          x: Math.cos((angle * Math.PI) / 180) * distance,
          y: Math.sin((angle * Math.PI) / 180) * distance,
          scale: [0, 1.2, 0.8],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 1.4,
          delay,
          repeat: Infinity,
          repeatDelay: 1.8,
          ease: "easeOut" as const,
        }}
      />
    );
  });

  return (
    <div className="relative mx-auto flex h-40 w-40 items-center justify-center">
      {particles}
      <motion.div
        className="absolute z-10 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#7C3AED] to-[#EC4899]"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.15, 1] }}
        transition={{ duration: 0.6, ease: "easeOut" as const }}
      >
        <Check className="h-10 w-10 text-white" strokeWidth={3} />
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Platform connect circles (Step 2)                                  */
/* ------------------------------------------------------------------ */

function PlatformCircles({
  connected,
  onToggle,
}: {
  connected: boolean[];
  onToggle: (i: number) => void;
}) {
  return (
    <div className="relative mx-auto flex w-full max-w-xs items-center justify-center gap-3">
      {/* connection lines behind circles */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 300 80"
        preserveAspectRatio="xMidYMid meet"
      >
        {[0, 1, 2].map((i) => {
          const x1 = 42 + i * 74;
          const x2 = 42 + (i + 1) * 74;
          const bothConnected = connected[i] && connected[i + 1];
          return (
            <motion.line
              key={i}
              x1={x1}
              y1={40}
              x2={x2}
              y2={40}
              stroke={bothConnected ? "#7C3AED" : "#E2E8F0"}
              strokeWidth={2}
              strokeDasharray={bothConnected ? "0" : "6 4"}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
            />
          );
        })}
      </svg>

      {platforms.map((p, i) => {
        const isConnected = connected[i];
        return (
          <motion.button
            key={p.name}
            type="button"
            onClick={() => onToggle(i)}
            className={cn(
              "relative z-10 flex h-16 w-16 flex-col items-center justify-center rounded-full border-2 transition-colors",
              isConnected
                ? "border-[#7C3AED] bg-white shadow-lg shadow-purple-200"
                : "border-[#E2E8F0] bg-white/60"
            )}
            whileTap={{ scale: 0.92 }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.1 }}
          >
            <div
              className="h-6 w-6 rounded-full"
              style={{ backgroundColor: p.color }}
            />
            {isConnected && (
              <motion.div
                className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#7C3AED]"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring" as const, stiffness: 500, damping: 25 }}
              >
                <Check className="h-3 w-3 text-white" strokeWidth={3} />
              </motion.div>
            )}
            <span className="mt-1 text-[10px] font-medium text-[#64748B]">
              {p.name}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  RPH comparison cards (Step 3)                                      */
/* ------------------------------------------------------------------ */

function RphCards() {
  return (
    <div className="mx-auto flex max-w-xs gap-4">
      {/* TikTok — highlighted */}
      <motion.div
        className="relative flex-1 overflow-hidden rounded-2xl border border-emerald-200 bg-white p-4 shadow-lg shadow-emerald-100"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" as const }}
      >
        <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-emerald-400/10" />
        <div className="mb-2 flex items-center gap-2">
          <div className="h-4 w-4 rounded-full bg-cyan-400" />
          <span className="text-xs font-medium text-[#64748B]">TikTok</span>
        </div>
        <p className="text-2xl font-bold text-emerald-600">$841</p>
        <p className="text-xs text-[#64748B]">per hour</p>
      </motion.div>

      {/* YouTube — muted */}
      <motion.div
        className="flex-1 rounded-2xl border border-[#E2E8F0] bg-white/60 p-4"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.35, duration: 0.5, ease: "easeOut" as const }}
      >
        <div className="mb-2 flex items-center gap-2">
          <div className="h-4 w-4 rounded-full bg-red-500" />
          <span className="text-xs font-medium text-[#64748B]">YouTube</span>
        </div>
        <p className="text-2xl font-bold text-[#64748B]">$63</p>
        <p className="text-xs text-[#64748B]">per hour</p>
      </motion.div>
    </div>
  );
}

/* ================================================================== */
/*  MAIN PAGE                                                          */
/* ================================================================== */

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [connected, setConnected] = useState([false, false, false, false]);

  const connectedCount = connected.filter(Boolean).length;

  /* navigation helpers */
  const goForward = useCallback(() => {
    if (step >= TOTAL_STEPS - 1) return;
    setDirection(1);
    setStep((s) => s + 1);
  }, [step]);

  const goBack = useCallback(() => {
    if (step <= 0) return;
    setDirection(-1);
    setStep((s) => s - 1);
  }, [step]);

  const finish = useCallback(() => {
    localStorage.setItem("onboarding_complete", "true");
    router.push("/dashboard");
  }, [router]);

  const skip = useCallback(() => {
    localStorage.setItem("onboarding_complete", "true");
    router.push("/dashboard");
  }, [router]);

  /* swipe handler */
  const handleDragEnd = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      if (info.offset.x < -SWIPE_THRESHOLD) goForward();
      else if (info.offset.x > SWIPE_THRESHOLD) goBack();
    },
    [goForward, goBack]
  );

  const togglePlatform = useCallback((i: number) => {
    setConnected((prev) => {
      const next = [...prev];
      next[i] = !next[i];
      return next;
    });
  }, []);

  /* keyboard nav */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goForward();
      if (e.key === "ArrowLeft") goBack();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goForward, goBack]);

  /* ---------------------------------------------------------------- */
  /*  Step content                                                     */
  /* ---------------------------------------------------------------- */

  const steps = [
    /* Step 1 — Welcome */
    <div key="step-0" className="flex flex-col items-center gap-8">
      {/* hero visual */}
      <motion.div
        className="relative flex h-44 w-44 items-center justify-center"
        custom={0}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#EC4899] opacity-20 blur-2xl" />
        <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-[#7C3AED] to-[#EC4899] shadow-2xl shadow-purple-300">
          <Zap className="h-16 w-16 text-white fill-white" />
        </div>
      </motion.div>

      <motion.h1
        className="text-center text-3xl font-bold tracking-tight text-[#0F172A] sm:text-4xl"
        custom={1}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
      >
        Your Creator Business,
        <br />
        Finally Organized
      </motion.h1>

      <motion.p
        className="max-w-sm text-center text-base leading-relaxed text-[#64748B]"
        custom={2}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
      >
        Track revenue, manage brand deals, and discover which content actually
        earns you money.
      </motion.p>

      <motion.div
        className="w-full max-w-xs"
        custom={3}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
      >
        <Button
          onClick={goForward}
          className="h-12 w-full rounded-xl bg-[#7C3AED] text-base font-semibold text-white shadow-lg shadow-purple-300/40 hover:bg-[#6D28D9]"
        >
          Let&apos;s Go
        </Button>
      </motion.div>
    </div>,

    /* Step 2 — Connect Platforms */
    <div key="step-1" className="flex flex-col items-center gap-8">
      <motion.div
        custom={0}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
      >
        <PlatformCircles connected={connected} onToggle={togglePlatform} />
      </motion.div>

      <motion.h1
        className="text-center text-3xl font-bold tracking-tight text-[#0F172A] sm:text-4xl"
        custom={1}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
      >
        All Your Revenue
        <br />
        in One Place
      </motion.h1>

      <motion.p
        className="max-w-sm text-center text-base leading-relaxed text-[#64748B]"
        custom={2}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
      >
        Connect YouTube, TikTok, Instagram, and Patreon. We pull your earnings
        automatically&nbsp;&mdash; no spreadsheets.
      </motion.p>

      <motion.div
        className="flex w-full max-w-xs flex-col gap-3"
        custom={3}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
      >
        <Button
          onClick={goForward}
          disabled={connectedCount < 2}
          className={cn(
            "h-12 w-full rounded-xl text-base font-semibold text-white shadow-lg transition-all",
            connectedCount >= 2
              ? "bg-[#7C3AED] shadow-purple-300/40 hover:bg-[#6D28D9]"
              : "bg-[#7C3AED]/40 shadow-none"
          )}
        >
          Continue
          {connectedCount > 0 && connectedCount < 2 && (
            <span className="ml-1 text-sm font-normal opacity-80">
              ({connectedCount}/2)
            </span>
          )}
        </Button>
        <button
          type="button"
          onClick={goForward}
          className="text-sm text-[#64748B] underline-offset-2 hover:text-[#7C3AED] hover:underline"
        >
          Skip for now
        </button>
      </motion.div>
    </div>,

    /* Step 3 — RPH Feature */
    <div key="step-2" className="flex flex-col items-center gap-8">
      <motion.div
        custom={0}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
      >
        <RphCards />
      </motion.div>

      <motion.h1
        className="text-center text-3xl font-bold tracking-tight text-[#0F172A] sm:text-4xl"
        custom={1}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
      >
        Know Your Real
        <br />
        Hourly Rate
      </motion.h1>

      <motion.p
        className="max-w-sm text-center text-base leading-relaxed text-[#64748B]"
        custom={2}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
      >
        See exactly how much you earn per hour on every piece of content. Stop
        wasting time on content that doesn&apos;t pay.
      </motion.p>

      <motion.div
        className="w-full max-w-xs"
        custom={3}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
      >
        <Button
          onClick={goForward}
          className="h-12 w-full rounded-xl bg-[#7C3AED] text-base font-semibold text-white shadow-lg shadow-purple-300/40 hover:bg-[#6D28D9]"
        >
          Show Me
        </Button>
      </motion.div>
    </div>,

    /* Step 4 — All Set */
    <div key="step-3" className="flex flex-col items-center gap-8">
      <motion.div
        custom={0}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
      >
        <ConfettiBurst />
      </motion.div>

      <motion.h1
        className="text-center text-3xl font-bold tracking-tight text-[#0F172A] sm:text-4xl"
        custom={1}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
      >
        Welcome to
        <br />
        the Dashboard
      </motion.h1>

      <motion.p
        className="max-w-sm text-center text-base leading-relaxed text-[#64748B]"
        custom={2}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
      >
        Your creator business operating system is ready. Let&apos;s dive in.
      </motion.p>

      <motion.div
        className="w-full max-w-xs"
        custom={3}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
      >
        <Button
          onClick={finish}
          className="h-12 w-full rounded-xl bg-[#7C3AED] text-base font-semibold text-white shadow-lg shadow-purple-300/40 hover:bg-[#6D28D9]"
        >
          Go to Dashboard
          <ExternalLink className="ml-2 h-4 w-4" />
        </Button>
      </motion.div>
    </div>,
  ];

  /* ---------------------------------------------------------------- */
  /*  Render                                                           */
  /* ---------------------------------------------------------------- */

  return (
    <div className="relative flex min-h-[100dvh] flex-col items-center bg-[#FAFAFA] selection:bg-purple-200">
      {/* top bar: back + skip */}
      <div className="flex w-full max-w-lg items-center justify-between px-6 pt-6">
        {step > 0 ? (
          <button
            type="button"
            onClick={goBack}
            className="flex items-center gap-1 text-sm text-[#64748B] transition-colors hover:text-[#0F172A]"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </button>
        ) : (
          <div />
        )}

        <button
          type="button"
          onClick={skip}
          className="text-sm text-[#64748B] underline-offset-2 transition-colors hover:text-[#7C3AED] hover:underline"
        >
          Skip
        </button>
      </div>

      {/* step dots */}
      <div className="mt-6 flex gap-2">
        {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
          <motion.div
            key={i}
            className={cn(
              "h-2 rounded-full transition-colors",
              i === step ? "bg-[#7C3AED]" : "bg-[#E2E8F0]"
            )}
            animate={{ width: i === step ? 24 : 8 }}
            transition={{ type: "spring" as const, stiffness: 400, damping: 30 }}
          />
        ))}
      </div>

      {/* main content area with swipe */}
      <div className="flex flex-1 w-full max-w-lg items-center justify-center overflow-hidden px-6 py-10">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={slideTransition}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={handleDragEnd}
            className="w-full cursor-grab active:cursor-grabbing"
          >
            {steps[step]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* bottom safe-area spacer for mobile */}
      <div className="h-6 shrink-0" />
    </div>
  );
}
