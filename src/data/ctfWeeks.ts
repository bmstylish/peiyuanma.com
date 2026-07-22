export interface CtfWeekDetail {
  number: number;
  slug: string;
  label: string;
  title: string;
  description: string;
}

export const ctfWeekDetails: CtfWeekDetail[] = [
  {
    number: 1,
    slug: 'week-1',
    label: 'Week 1',
    title: 'Linux and general CTF skills',
    description: 'Build command-line fluency through Bandit, picoCTF fundamentals, SSH, Git, networking, and basic enumeration.',
  },
  {
    number: 2,
    slug: 'week-2',
    label: 'Week 2',
    title: 'Network and web foundations',
    description: 'Build a reliable baseline with common web vulnerabilities, Nmap host and port scanning, and manual application mapping.',
  },
  {
    number: 3,
    slug: 'week-3',
    label: 'Week 3',
    title: 'Web enumeration and Burp Suite',
    description: 'Map content and technology stacks, identify web-server weaknesses, and develop a repeatable manual testing workflow in Burp Suite.',
  },
  {
    number: 4,
    slug: 'week-4',
    label: 'Week 4',
    title: 'Web exploitation and the pentesting toolchain',
    description: 'Apply web attacks in challenge rooms, research vulnerabilities, test passwords responsibly, and begin exploitation with Metasploit.',
  },
  {
    number: 5,
    // Keep the original slug so existing links remain valid after removing the journal's end date.
    slug: 'finale',
    label: 'Week 5',
    title: 'Post-exploitation, privilege escalation, and reporting',
    description: 'Connect initial access to post-exploitation and Linux privilege escalation, then document evidence in a pentest-style finding.',
  },
];

export function getCtfWeekDetail(weekNumber: number): CtfWeekDetail {
  const knownWeek = ctfWeekDetails.find((week) => week.number === weekNumber);

  if (knownWeek) return knownWeek;

  return {
    number: weekNumber,
    slug: `week-${weekNumber}`,
    label: `Week ${weekNumber}`,
    title: 'Jr Penetration Tester path progress',
    description: 'Continue the TryHackMe path with daily room work, authorised practice, and evidence-led notes.',
  };
}

export function getCtfWeekDetails(weekNumbers: number[]): CtfWeekDetail[] {
  return [...new Set(weekNumbers)]
    .sort((a, b) => a - b)
    .map(getCtfWeekDetail);
}
