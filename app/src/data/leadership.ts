// Leadership roles and student organisations, newest first.
// Leave `end` empty ('') for a role you still hold — it shows as "Present".

export type Role = {
  role: string
  organisation: string
  place: string
  start: string
  end: string
}

export const leadership: Role[] = [
  {
    role: 'Assistant Publication Secretary',
    organisation: 'ESS',
    place: 'SUST',
    start: '',
    end: '',
  },
  {
    role: 'Executive Committee Member',
    organisation: 'SUST Chess Club',
    place: 'SUST',
    start: 'Jan 2025',
    end: 'Oct 2026',
  },
]
