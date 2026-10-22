/**
 * Technical Engineering Blogs Data Model
 * 
 * NOTE: The articles below are realistic SAMPLE engineering write-ups
 * for testing the blog architecture, markdown rendering, syntax highlighting,
 * and table-of-contents features. Clearly labeled as sample content.
 */

export interface BlogSection {
  id: string;
  title: string;
  content: string;
  codeBlock?: {
    language: string;
    code: string;
  };
  callout?: {
    type: 'tip' | 'warning' | 'note';
    text: string;
  };
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: 'Circuit Design' | 'Embedded Systems' | 'Power Systems' | 'Prototyping' | 'Tutorial';
  date: string;
  readTime: string;
  author: string;
  authorRole: string;
  coverImage: string;
  tags: string[];
  sections: BlogSection[];
  isSampleContent: boolean;
}

export const sampleBlogs: BlogPost[] = [
  {
    id: 'blog-01',
    slug: 'demystifying-op-amp-stability-and-phase-margin',
    title: 'Demystifying Op-Amp Stability: A Practical Guide to Phase Margin and Compensation',
    excerpt:
      'Understanding why operational amplifier circuits oscillate when driving capacitive loads, and how to stabilize them with in-loop compensation networks.',
    category: 'Circuit Design',
    date: 'Oct 15, 2024',
    readTime: '6 min read',
    author: 'Senithu Sethmin Warnakulasooriya',
    authorRole: 'Electrical and Electronic Engineering Undergraduate',
    coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    tags: ['Analog', 'Op-Amps', 'Bode Plots', 'Stability'],
    isSampleContent: true,
    sections: [
      {
        id: 'the-problem',
        title: '1. The Elusive Parasitic Pole',
        content:
          'Every analog engineer eventually encounters an operational amplifier circuit that unexpectedly sings like a flute. When an op-amp drives a capacitive load (such as a coaxial cable, MOSFET gate, or ADC input filter), the output resistance of the amplifier combines with the load capacitance to form an additional pole in the open-loop transfer function A_ol(f).',
        callout: {
          type: 'warning',
          text: 'Never omit capacitive load analysis when connecting an op-amp directly to shielded cables or large MOSFET gates!',
        },
      },
      {
        id: 'phase-margin',
        title: '2. Understanding Phase Margin',
        content:
          'Phase margin is the difference between the phase lag of the loop gain and -180° at the unity-gain frequency (where loop gain magnitude is 0 dB). A well-designed closed-loop amplifier should have at least 45° to 60° of phase margin to avoid excessive overshoot or ringing in response to step transients.',
      },
      {
        id: 'compensation-methods',
        title: '3. Out-of-Loop vs. In-Loop Compensation',
        content:
          'The simplest solution is an isolation resistor R_iso placed directly at the amplifier output. However, this degrades DC load regulation. An in-loop compensation topology (using a feedback capacitor C_f and feedback resistor R_f) provides both high DC accuracy and AC stability.',
        codeBlock: {
          language: 'text',
          code: `       R_iso
Out ----/\\/\\----*----> V_out
        |       |
       === C_f === C_load
        |       |
       GND     GND`,
        },
      },
      {
        id: 'conclusion',
        title: '4. Key Takeaways for Workbench Debugging',
        content:
          'Always probe op-amp outputs with 10x low-capacitance oscilloscope probes (avoid 1x probes, which add ~50pF of direct capacitance). If you see ringing on a 10kHz square wave step response, inspect your phase margin and add compensating capacitance immediately.',
      },
    ],
  },
  {
    id: 'blog-02',
    slug: 'optimizing-freertos-memory-footprint-on-stm32',
    title: 'Optimizing FreeRTOS Memory Footprint and Stack Safety on ARM Cortex-M4',
    excerpt:
      'Techniques for configuring FreeRTOS heap allocators, detecting task stack overflow without debugger crashes, and saving precious SRAM on resource-constrained microcontrollers.',
    category: 'Embedded Systems',
    date: 'Sep 28, 2024',
    readTime: '8 min read',
    author: 'Senithu Sethmin Warnakulasooriya',
    authorRole: 'Electrical and Electronic Engineering Undergraduate',
    coverImage: 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&w=1200&q=80',
    tags: ['FreeRTOS', 'STM32', 'ARM', 'Memory Management'],
    isSampleContent: true,
    sections: [
      {
        id: 'heap-allocation',
        title: '1. Choosing the Right Heap Implementation (heap_4 vs heap_1)',
        content:
          'FreeRTOS offers five different memory allocation schemes. For most mixed embedded applications, heap_4.c provides the sweet spot: it supports memory coalescing to prevent fragmentation while maintaining deterministic allocation bounds.',
      },
      {
        id: 'stack-overflow-hook',
        title: '2. Implementing Stack Overflow Detection',
        content:
          'Silent stack overflows are the bane of embedded firmware debugging. Enabling configCHECK_FOR_STACK_OVERFLOW = 2 instructs the kernel to check whether the last 16 bytes of the task stack have been overwritten with canary bytes.',
        codeBlock: {
          language: 'c',
          code: `void vApplicationStackOverflowHook(TaskHandle_t xTask, char *pcTaskName) {
    // Disable interrupts to freeze system state
    taskDISABLE_INTERRUPTS();
    
    // Log failing task name to UART or blink fault LED
    fault_log_critical("Stack overflow in task: %s", pcTaskName);
    
    for(;;); // Halt for hardware watchdog reset
}`,
        },
      },
      {
        id: 'tuning-watermarks',
        title: '3. Using uxTaskGetStackHighWaterMark()',
        content:
          'During development, query uxTaskGetStackHighWaterMark() periodically to determine the minimum amount of unused stack remaining for each task. Once you have observed worst-case interrupt bursts, trim excess stack allocations to reclaim SRAM.',
      },
    ],
  },
  {
    id: 'blog-03',
    slug: 'pcb-layout-rules-for-high-speed-switching-regulators',
    title: 'PCB Layout Rules for High-Speed Switching Regulators: Avoiding EMI Disasters',
    excerpt:
      'Step-by-step layout strategies for minimizing the di/dt hot loop, routing high-frequency gate drive paths, and separating analog and power grounds in modern switch-mode power supplies.',
    category: 'Power Systems',
    date: 'Aug 12, 2024',
    readTime: '5 min read',
    author: 'Senithu Sethmin Warnakulasooriya',
    authorRole: 'Electrical and Electronic Engineering Undergraduate',
    coverImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    tags: ['PCB', 'KiCad', 'EMI', 'SMPS', 'Hardware'],
    isSampleContent: true,
    sections: [
      {
        id: 'the-hot-loop',
        title: '1. Identify the High di/dt "Hot Loop"',
        content:
          'In a buck converter, current flows in pulsed trapezoids through the high-side switch and low-side diode/MOSFET. The perimeter enclosing input capacitor Cin, high-side MOSFET, and synchronous rectifier radiates electromagnetic interference proportional to its enclosed loop area.',
        callout: {
          type: 'tip',
          text: 'Place the input ceramic decoupling capacitor Cin directly adjacent to the MOSFET drain and ground pin—even millimeters matter!',
        },
      },
      {
        id: 'grounding-philosophy',
        title: '2. Single Solid Ground Plane vs. Star Grounding',
        content:
          'Modern high-speed switching frequencies (300kHz to 2MHz) mean return currents follow the path of least inductance, not least resistance. An unbroken internal Layer 2 reference ground plane typically yields better EMI shielding than segmented ground slots.',
      },
    ],
  },
  {
    id: 'blog-04',
    slug: 'essential-workbench-instruments-for-engineering-students',
    title: 'Essential Bench Instruments & Open-Source Tools for Electrical Engineering Students',
    excerpt:
      'A practical review of oscilloscopes, logic analyzers, programmable loads, and free simulation tools that elevate your hardware debugging from trial-and-error to systematic discovery.',
    category: 'Prototyping',
    date: 'Jul 04, 2024',
    readTime: '7 min read',
    author: 'Senithu Sethmin Warnakulasooriya',
    authorRole: 'Electrical and Electronic Engineering Undergraduate',
    coverImage: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
    tags: ['Tools', 'Oscilloscope', 'Debugging', 'Student Guide'],
    isSampleContent: true,
    sections: [
      {
        id: 'the-usb-logic-analyzer',
        title: '1. The 24MHz 8-Channel USB Logic Analyzer',
        content:
          'Before spending on an expensive mixed-signal oscilloscope, an affordable 8-channel USB logic analyzer paired with open-source PulseView / Sigrok allows you to decode I2C, SPI, and UART packets with byte-level protocol inspection.',
      },
      {
        id: 'simulation-first',
        title: '2. Simulating First with LTspice and Qucs-S',
        content:
          'Building physical circuits without prior simulation leads to burned components. LTspice provides free, unrestricted SPICE transient analysis that models real component tolerances and temperature coefficients.',
      },
    ],
  },
];
