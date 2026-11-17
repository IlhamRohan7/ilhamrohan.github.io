export const education = {
  degree: 'B.Sc. in Industrial & Production Engineering',
  institution: 'Shahjalal University of Science and Technology (SUST)',
  location: 'Sylhet, Bangladesh',
  graduation: '2028',
  status: 'Undergraduate · Expected Graduation',
  // Update each semester. Leave empty ('') to hide it.
  currentStage: '3rd Year, 1st Semester',
}

// Earlier qualifications, shown below the main degree.
export const previousEducation = [
  {
    degree: 'Higher Secondary Certificate (HSC), Science',
    institution: 'Dhaka Commerce College',
    location: 'Dhaka, Bangladesh',
    year: '2022',
    result: 'GPA 5.00 / 5.00',
  },
]

// Add `href` (and optionally `linkLabel`) to turn a card into a link.
export type Interest = { key: string; title: string; text: string; href?: string; linkLabel?: string }

export const interests: Interest[] = [
  { key: 'reading', title: 'Reading', text: 'Books' },
  {
    key: 'chess',
    title: 'Chess',
    text: 'Strategy and structure',
    href: 'https://www.chess.com/member/rohan112277',
    linkLabel: 'Chess.com profile',
  },
  { key: 'football', title: 'Football tactics', text: 'Reading the game' },
  {
    key: 'film',
    title: 'Films & series',
    text: 'Stories on screen',
    href: 'https://www.imdb.com/user/p.6msm7mgdgy6its6yozky6tdtmq/watchlist/',
    linkLabel: 'IMDb watchlist',
  },
]
