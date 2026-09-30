import { Beyond } from "@/components/beyond";
import { ChessEgg } from "@/components/chess-egg";
import { DrawingFrame, SmoothScroll, TitleBlock } from "@/components/chrome";
import { Contact, Now } from "@/components/closing";
import { Education } from "@/components/education";
import { Hero } from "@/components/hero";
import { MotionRoot } from "@/components/motion-root";
import { Research } from "@/components/research";
import { Skills } from "@/components/skills";
import { Story } from "@/components/story";
import { Work } from "@/components/work";

export default function Home() {
  return (
    <MotionRoot>
      <a
        href="#main"
        className="label fixed left-4 top-4 z-[70] -translate-y-20 border border-signal bg-bg px-3 py-2 transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <SmoothScroll />
      <DrawingFrame />
      <div className="grain" aria-hidden />
      <TitleBlock />
      <main id="main" className="relative lg:px-2.5">
        <Hero />
        <Story />
        <Education />
        <Research />
        <Skills />
        <Work />
        <Beyond />
        <Now />
        <Contact />
      </main>
      <ChessEgg />
    </MotionRoot>
  );
}
