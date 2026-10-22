/**
 * Engineering Timeline Milestones Data Model
 * 
 * NOTE: The milestones below are realistic SAMPLE academic and engineering
 * timeline entries clearly labeled as layout placeholders.
 */

export interface TimelineEntry {
  id: string;
  date: string;
  title: string;
  category:
    | 'Project Started'
    | 'Prototype Completed'
    | 'Project Deployed'
    | 'Competition'
    | 'Achievement'
    | 'Education'
    | 'Certification'
    | 'Publication';
  description: string;
  image?: string;
  relatedProjectUrl?: string;
  status: 'Completed' | 'Milestone Reached' | 'In Progress';
  externalLink?: string;
  isSampleContent: boolean;
}

export const sampleTimeline: TimelineEntry[] = [
  {
    id: 'time-01',
    date: 'October 2024',
    title: 'Autonomous Navigation Rover System Validation',
    category: 'Prototype Completed',
    description:
      'Completed closed-loop indoor SLAM navigation trials with the autonomous rover, validating sub-3cm positioning repeatability in laboratory maze runs.',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80',
    relatedProjectUrl: '/projects/autonomous-indoor-rover',
    status: 'Completed',
    isSampleContent: true,
  },
  {
    id: 'time-02',
    date: 'May 2024',
    title: 'High-Efficiency Synchronous Buck Converter Tested',
    category: 'Prototype Completed',
    description:
      'Fabricated and bench-tested 4-layer power distribution board, achieving 94.6% measured conversion efficiency at 8A continuous load with low ripple.',
    image: 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&w=600&q=80',
    relatedProjectUrl: '/projects/high-efficiency-synchronous-buck-converter',
    status: 'Completed',
    isSampleContent: true,
  },
  {
    id: 'time-03',
    date: 'February 2024',
    title: 'Smart IoT Energy Monitor Field Trial',
    category: 'Project Deployed',
    description:
      'Installed non-invasive AC mains monitoring system on experimental distribution panel, achieving 90-day uninterrupted MQTT power quality logging.',
    image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&w=600&q=80',
    relatedProjectUrl: '/projects/smart-iot-energy-monitor',
    status: 'Completed',
    isSampleContent: true,
  },
  {
    id: 'time-04',
    date: 'December 2023',
    title: 'Dual-Axis Solar Tracker Mechanism Assembled',
    category: 'Prototype Completed',
    description:
      'Integrated altitude-azimuth stepper motorized gimbal with differential quadrant light sensor and astronomical sun-tracking lookup table.',
    image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=600&q=80',
    relatedProjectUrl: '/projects/dual-axis-solar-tracker',
    status: 'Completed',
    isSampleContent: true,
  },
  {
    id: 'time-05',
    date: 'September 2023',
    title: 'Advanced Embedded Systems Laboratory & Microcontroller Studies',
    category: 'Education',
    description:
      'Undergraduate coursework covering ARM Cortex-M architecture, RTOS task management, memory barriers, DMA transfers, and high-speed communication buses.',
    status: 'Completed',
    isSampleContent: true,
  },
  {
    id: 'time-06',
    date: 'January 2023',
    title: 'Commenced Electrical and Electronic Engineering Degree',
    category: 'Education',
    description:
      'Began undergraduate engineering studies focusing on circuit analysis, electromagnetism, digital logic, and computing fundamentals.',
    status: 'Completed',
    isSampleContent: true,
  },
];
