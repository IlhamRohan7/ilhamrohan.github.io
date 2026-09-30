"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Chess as ChessT, Move, Square } from "chess.js";
import { EASE } from "./primitives";

/*
 * Easter egg: type a legal first move (e4, d4, Nf3…) anywhere on the page.
 * A small board opens and replies. chess.js loads only when triggered.
 */

const FIRST_MOVES = new Set([
  ..."abcdefgh".split("").flatMap((f) => [`${f}3`, `${f}4`]),
  "na3", "nc3", "nf3", "nh3",
]);

const norm = (san: string) => san.replace(/[x+#=!?]/g, "").toLowerCase();

const GLYPH: Record<string, string> = { k: "♚", q: "♛", r: "♜", b: "♝", n: "♞", p: "♟" };
const NAME: Record<string, string> = { k: "king", q: "queen", r: "rook", b: "bishop", n: "knight", p: "pawn" };
const VALUE: Record<string, number> = { p: 1, n: 3, b: 3.2, r: 5, q: 9, k: 0 };

const BOOK: Record<string, [string, string][]> = {
  e4: [["c5", "the Sicilian"], ["e5", "the classical reply"]],
  d4: [["Nf6", "an Indian defence"], ["d5", "the classical reply"]],
  c4: [["e5", "a reversed Sicilian"]],
  Nf3: [["d5", "solid and central"]],
};

function evaluate(g: ChessT) {
  if (g.isCheckmate()) return g.turn() === "w" ? 1000 : -1000;
  if (g.isDraw()) return 0;
  let s = 0;
  for (const row of g.board())
    for (const p of row) if (p) s += (p.color === "b" ? 1 : -1) * VALUE[p.type];
  return s;
}

/** Two-ply search for Black: best move assuming White's best reply. */
function pickReply(g: ChessT): Move {
  const moves = g.moves({ verbose: true });
  let best: Move[] = [];
  let bestScore = -Infinity;
  for (const m of moves) {
    g.move(m);
    let worst = Infinity;
    if (g.isGameOver()) worst = evaluate(g);
    else
      for (const r of g.moves({ verbose: true })) {
        g.move(r);
        worst = Math.min(worst, evaluate(g));
        g.undo();
      }
    g.undo();
    if (worst > bestScore + 0.01) {
      bestScore = worst;
      best = [m];
    } else if (Math.abs(worst - bestScore) <= 0.01) best.push(m);
  }
  return best[Math.floor(Math.random() * best.length)];
}

export function ChessEgg() {
  const [open, setOpen] = useState(false);
  const [, force] = useState(0);
  const [status, setStatus] = useState("");
  const [selected, setSelected] = useState<Square | null>(null);
  const [last, setLast] = useState<{ from: string; to: string } | null>(null);
  const game = useRef<ChessT | null>(null);
  const buffer = useRef("");
  const thinking = useRef(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const rerender = () => force((n) => n + 1);

  const reply = useCallback(() => {
    const g = game.current!;
    if (g.isGameOver()) return finish(g);
    thinking.current = true;
    setTimeout(() => {
      const history = g.history();
      let note = "";
      let m: Move | null = null;
      const book = history.length === 1 ? BOOK[history[0]] : undefined;
      if (book) {
        const [san, why] = book[Math.floor(Math.random() * book.length)];
        m = g.move(san);
        note = ` — ${why}`;
      } else {
        m = g.move(pickReply(g));
      }
      setLast({ from: m.from, to: m.to });
      thinking.current = false;
      if (g.isGameOver()) finish(g);
      else setStatus(`I reply ${m.san}${note}. ${g.inCheck() ? "Check! " : ""}Your move.`);
      rerender();
    }, 450);
  }, []);

  function finish(g: ChessT) {
    setStatus(
      g.isCheckmate()
        ? g.turn() === "b"
          ? "Checkmate — well played. Let’s talk."
          : "Checkmate. Rematch? Close and type a move."
        : "Draw. A fair result.",
    );
    rerender();
  }

  const play = useCallback(
    (m: string | { from: Square; to: Square; promotion?: string }) => {
      const g = game.current;
      if (!g || thinking.current || g.turn() !== "w" || g.isGameOver()) return false;
      try {
        const mv = g.move(m);
        setLast({ from: mv.from, to: mv.to });
        setSelected(null);
        setStatus(`You played ${mv.san}.`);
        rerender();
        reply();
        return true;
      } catch {
        return false;
      }
    },
    [reply],
  );

  const start = useCallback(
    async (firstMove: string) => {
      const { Chess } = await import("chess.js");
      game.current = new Chess();
      setOpen(true);
      const san = game.current.moves().find((s) => norm(s) === firstMove);
      if (san) play(san);
    },
    [play],
  );

  // Listen for typed moves.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement;
      if (t.closest("input, textarea, select, [contenteditable='true']")) return;
      if (e.key === "Escape" && open) return setOpen(false);
      if (!/^[a-zA-Z0-9]$/.test(e.key)) return;
      buffer.current = (buffer.current + e.key.toLowerCase()).slice(-6);
      const b = buffer.current;

      if (!open) {
        for (const len of [3, 2]) {
          const s = b.slice(-len);
          if (FIRST_MOVES.has(s)) {
            buffer.current = "";
            start(s);
            return;
          }
        }
        return;
      }
      const g = game.current;
      if (!g || g.turn() !== "w") return;
      const legal = g.moves();
      for (const len of [5, 4, 3, 2]) {
        const s = b.slice(-len);
        const san = legal.find((m) => norm(m) === s);
        if (san) {
          buffer.current = "";
          play(san);
          return;
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, play, start]);

  useEffect(() => {
    if (open) closeRef.current?.focus({ preventScroll: true });
  }, [open]);

  const g = game.current;
  const onSquare = (sq: Square) => {
    if (!g) return;
    const piece = g.get(sq);
    if (selected) {
      if (sq === selected) return setSelected(null);
      if (piece && piece.color === "w") return setSelected(sq);
      const ok = play({ from: selected, to: sq, promotion: "q" });
      if (!ok) setSelected(null);
      return;
    }
    if (piece && piece.color === "w") setSelected(sq);
  };
  const targets = new Set(
    g && selected ? g.moves({ square: selected, verbose: true }).map((m) => m.to) : [],
  );

  return (
    <AnimatePresence>
      {open && g && (
        <motion.div
          role="dialog"
          aria-label="Chess — you play white"
          initial={{ opacity: 0, y: 16, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="fixed bottom-24 left-3 z-[55] w-[min(20rem,calc(100vw-1.5rem))] border border-line-strong bg-bg/95 backdrop-blur-xl sm:bottom-6 sm:left-6"
        >
          <div className="flex items-center justify-between border-b border-line px-3 py-2">
            <span className="label text-muted">
              <span className="text-signal-text">■</span> Side sheet — Chess
            </span>
            <button
              ref={closeRef}
              type="button"
              onClick={() => setOpen(false)}
              className="label px-1 text-muted hover:text-fg"
              aria-label="Close chess board"
            >
              Close ✕
            </button>
          </div>
          <div className="p-3">
            <div className="grid grid-cols-8 border border-line" role="grid" aria-label="Board">
              {g.board().map((row, r) =>
                row.map((p, f) => {
                  const sq = `${"abcdefgh"[f]}${8 - r}` as Square;
                  const dark = (r + f) % 2 === 1;
                  const isLast = last && (last.from === sq || last.to === sq);
                  return (
                    <button
                      key={sq}
                      type="button"
                      onClick={() => onSquare(sq)}
                      aria-label={`${sq}${p ? `, ${p.color === "w" ? "white" : "black"} ${NAME[p.type]}` : ""}`}
                      className={`relative grid aspect-square place-items-center text-[1.35rem] leading-none ${
                        dark ? "bg-fg/[0.07]" : ""
                      } ${isLast ? "!bg-signal/20" : ""} ${selected === sq ? "outline outline-1 -outline-offset-1 outline-signal" : ""}`}
                    >
                      {p && (
                        <span className={p.color === "w" ? "text-fg" : "text-signal"}>
                          {GLYPH[p.type]}
                          {"︎"}
                        </span>
                      )}
                      {targets.has(sq) && (
                        <span aria-hidden className="absolute h-1.5 w-1.5 rounded-full bg-signal" />
                      )}
                    </button>
                  );
                }),
              )}
            </div>
            <p className="mt-3 min-h-[2.5em] text-sm leading-snug text-muted" aria-live="polite">
              {status}
            </p>
            <p className="label mt-1 text-faint">Type a move (Nf3, exd5…) or click · Esc to close</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
