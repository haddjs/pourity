import type { CvData } from '../types'

/**
 * Seed content. Uses the design-system sample persona (Alexandra Chen) so a
 * first-time visitor immediately sees a filled, ATS-shaped document rather
 * than an empty page.
 */
export const defaultCv: CvData = {
  personal: {
    fullName: 'Alexandra Chen',
    headline: 'Senior Product Designer',
    email: 'alexandra.chen@email.com',
    phone: '(415) 555-0142',
    location: 'San Francisco, CA',
    links: [
      { id: 'lnk-1', label: 'LinkedIn', url: 'linkedin.com/in/alexandrachen' },
      { id: 'lnk-2', label: 'Portfolio', url: 'alexandrachen.design' },
    ],
  },
  summary:
    'Product designer with 8+ years designing systems and end-to-end experiences for B2B SaaS. Partners closely with engineering and research to ship accessible, measurable products.',
  experience: [
    {
      id: 'exp-1',
      position: 'Senior Product Designer',
      company: 'Northwind Labs',
      location: 'San Francisco, CA',
      startDate: '2021-03',
      endDate: '',
      current: true,
      bullets:
        'Led the redesign of the core analytics dashboard, lifting task-completion rate by 32%.\nBuilt and maintained a 60-component design system adopted across 4 product teams.\nMentored 3 junior designers and ran weekly critique sessions.',
    },
    {
      id: 'exp-2',
      position: 'Product Designer',
      company: 'Bright Harbor',
      location: 'Remote',
      startDate: '2018-06',
      endDate: '2021-02',
      current: false,
      bullets:
        'Shipped a self-serve onboarding flow that cut time-to-first-value from 5 days to 1.\nCollaborated with research to run 40+ usability sessions informing the product roadmap.',
    },
  ],
  education: [
    {
      id: 'edu-1',
      school: 'University of California, Berkeley',
      degree: 'B.A.',
      field: 'Cognitive Science',
      location: 'Berkeley, CA',
      startDate: '2010-08',
      endDate: '2014-05',
      current: false,
    },
  ],
  skills: [
    {
      id: 'sk-1',
      name: 'Design',
      skills: ['Design Systems', 'Prototyping', 'Design Tokens', 'UX'],
    },
    {
      id: 'sk-2',
      name: 'Research',
      skills: ['User Research', 'Usability Testing', 'Accessibility'],
    },
    {
      id: 'sk-3',
      name: 'Tools',
      skills: ['Figma', 'Storybook', 'Jira'],
    },
  ],
}
