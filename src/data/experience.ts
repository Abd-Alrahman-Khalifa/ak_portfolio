export interface ExperienceItem {
  org: string
  title: string
  period: string
  type: 'education' | 'experience' | 'training'
}

export const experience: ExperienceItem[] = [
  { org: 'Bravo', title: 'Full-Stack Web Development Diploma', period: '2026', type: 'education' },
  { org: 'Bravo', title: 'Practical Web Development Experience', period: '2 Months — 2026', type: 'experience' },
  { org: 'Creativa', title: 'Artificial Intelligence Training — MCIT Training Program', period: '2026', type: 'training' },
]

export const education = {
  degree: 'Bachelor of Information Technology',
  track: 'Software IT Track',
  university: 'Delta Technological University',
  graduation: 'Expected Graduation: 2027',
}
