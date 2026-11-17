import { links, profile } from '../data/profile'

export default function Footer() {
  return (
    <footer className="border-t border-black/5 px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-semibold tracking-tight">{profile.name}</p>
          <p className="text-sm text-[color:var(--ink-3)]">
            Industrial &amp; Production Engineering · {profile.institutionShort}
          </p>
        </div>
        <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
          {links.map((l) => (
            <li key={l.label}>
              <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-[color:var(--ink-2)] underline-offset-4 hover:underline">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="text-sm text-[color:var(--ink-3)]">© {new Date().getFullYear()} {profile.name}</p>
      </div>
    </footer>
  )
}
