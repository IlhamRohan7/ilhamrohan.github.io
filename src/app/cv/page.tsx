import type { Metadata } from "next";
import { site, type Entry } from "@/content/site";
import { siteUrl } from "@/lib/paths";

export const metadata: Metadata = {
  title: `CV — ${site.name}`,
  robots: { index: false },
};

const real = (list: readonly Entry[]) => list.filter((e) => !e.placeholder);

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="grid grid-cols-[34mm_1fr] gap-x-[6mm] border-t border-line py-[5mm]">
      <h2 className="label pt-[0.6mm] text-muted">{title}</h2>
      <div>{children}</div>
    </section>
  );
}

function Entries({ list }: { list: Entry[] }) {
  return (
    <ul className="space-y-[3mm]">
      {list.map((e) => (
        <li key={e.title}>
          <div className="flex justify-between gap-4">
            <p className="font-medium">{e.title}</p>
            {e.date && <p className="label tabular text-muted">{e.date}</p>}
          </div>
          {e.context && <p className="text-muted">{e.context}</p>}
          <p className="mt-[1mm] text-muted">{e.summary}</p>
        </li>
      ))}
    </ul>
  );
}

export default function CV() {
  const edu = site.education[0];
  const url = siteUrl.replace(/^https?:\/\//, "");
  const optional: [string, Entry[]][] = [
    ["Projects", real(site.projects)],
    ["Research", real(site.researchWork)],
    ["Experience", real(site.experience)],
    ["Achievements", real(site.achievements)],
  ];
  const contact = [
    site.location,
    site.phone,
    site.email,
    ...site.profiles.map((p) => p.href.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")),
  ];

  return (
    <div data-theme="light" className="min-h-screen bg-[#e9e9e6] py-10 print:bg-white print:py-0">
      <style>{`@page{size:A4;margin:0}html,body{background:#e9e9e6}@media print{html,body{background:#fff}}`}</style>
      <article className="mx-auto flex h-[297mm] w-[210mm] flex-col bg-white px-[17mm] py-[15mm] text-[10pt] leading-[1.5] text-[#0a0a0a] shadow-2xl print:shadow-none">
        <header className="grid grid-cols-[1fr_auto] items-end gap-6">
          <div>
            <p className="label text-signal-text">Curriculum Vitae</p>
            <h1 className="display mt-[2mm] text-[40pt] leading-[0.9]">
              {site.firstName} <em>{site.lastName}</em>
            </h1>
          </div>
          <p className="max-w-[62mm] text-right text-[10.5pt] leading-snug">
            Industrial &amp; Production Engineering Student
            <span className="block text-muted">{edu.institution.replace(" (SUST)", "")}</span>
          </p>
        </header>
        <div className="mt-[5mm] h-[0.6mm] bg-signal" />
        <p className="label mt-[3mm] flex flex-wrap gap-x-[4mm] gap-y-[1mm] text-muted normal-case tracking-normal">
          {contact.map((c) => (
            <span key={c}>{c}</span>
          ))}
        </p>

        <div className="mt-[6mm]">
          <Section title="Profile">
            <p className="text-[10.2pt]">{site.cvSummary}</p>
          </Section>

          <Section title="Education">
            <div className="flex justify-between gap-4">
              <p className="font-medium">{edu.degree}</p>
              <p className="label tabular text-muted">Expected {edu.expected}</p>
            </div>
            <p className="text-muted">
              {edu.institution} · {edu.location}
            </p>
            {edu.cgpa && <p className="text-muted">CGPA: {edu.cgpa}</p>}
          </Section>

          <Section title="Research interests">
            <ul className="grid grid-cols-2 gap-x-[6mm] gap-y-[2.5mm]">
              {site.research.map((r) => (
                <li key={r.area}>
                  <p className="font-medium">{r.area}</p>
                  <p className="text-muted">{r.detail}</p>
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Technical skills">
            <table className="w-full">
              <tbody>
                {site.skills.map((s) => (
                  <tr key={s.part} className="border-b border-line last:border-0">
                    <td className="py-[1.1mm] font-medium">{s.part}</td>
                    <td className="py-[1.1mm] text-muted">{s.category}</td>
                    <td className="py-[1.1mm] text-right text-muted">{s.level}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Section>

          {optional.map(([title, list]) =>
            list.length ? (
              <Section key={title} title={title}>
                <Entries list={list} />
              </Section>
            ) : null,
          )}

          <Section title="Interests">
            <p>{site.interests.map((i) => i.title).join(" · ")}</p>
          </Section>
        </div>

        <footer className="label mt-auto flex justify-between border-t border-line pt-[3mm] text-faint normal-case tracking-normal">
          <span>Portfolio — {url}</span>
          <span>
            {site.name} · {new Date().getFullYear()}
          </span>
        </footer>
      </article>
    </div>
  );
}
