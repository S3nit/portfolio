/**
 * Engineering Projects Data Model
 * 
 * NOTE: The entries below are realistic SAMPLE electrical & electronic engineering
 * project entries for portfolio layout and demonstration purposes.
 * Replace with your real project information, schematics, and code snippets.
 */

export interface ProjectComponent {
  name: string;
  partNumber?: string;
  role: string;
  specs?: string;
}

export interface GalleryItem {
  url: string;
  caption: string;
  type: 'image' | 'schematic' | 'pcb' | 'prototype';
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  category:
    | 'Embedded Systems'
    | 'Robotics'
    | 'IoT'
    | 'Control Systems'
    | 'Power Electronics'
    | 'PCB Design'
    | 'Renewable Energy'
    | 'Automation';
  tags: string[];
  technologies: string[];
  status: 'In Progress' | 'Prototype Completed' | 'Tested & Validated' | 'Deployed';
  startDate: string;
  completionDate?: string;
  deploymentDate?: string;
  thumbnail: string;
  coverImage: string;
  gallery: GalleryItem[];
  objectives: string[];
  problemStatement: string;
  components: ProjectComponent[];
  architecture: {
    overview: string;
    diagramUrl?: string;
    subsystems: { name: string; description: string }[];
  };
  implementation: string;
  codeSnippet?: {
    language: string;
    title: string;
    code: string;
  };
  testing: {
    methodology: string;
    results: string[];
  };
  results: string;
  challenges: { problem: string; solution: string }[];
  learnings: string[];
  futureWork: string[];
  githubUrl?: string;
  demoUrl?: string;
  documentationUrl?: string;
  featured: boolean;
  isSampleContent: boolean;
}

export const sampleProjects: Project[] = [
  {
    id: 'proj-01',
    slug: 'autonomous-indoor-rover',
    title: 'Autonomous Navigation Rover with LiDAR & Sensor Fusion',
    summary:
      'A four-wheel differential-drive mobile robotics platform featuring 2D LiDAR SLAM, ultrasonic obstacle avoidance, and real-time motor PID control.',
    description:
      'This project implements an autonomous mobile robotic rover capable of mapping unknown indoor environments and computing collision-free paths. Built on a dual-core ESP32 and STM32 architecture with custom motor drivers and sensor fusion filters.',
    category: 'Robotics',
    tags: ['Robotics', 'LiDAR', 'SLAM', 'PID Control', 'C++'],
    technologies: ['STM32 (ARM Cortex-M4)', 'ESP32-S3', 'FreeRTOS', 'KiCad', 'RPLiDAR A1', 'C++ / Embedded C'],
    status: 'Tested & Validated',
    startDate: 'March 2024',
    completionDate: 'September 2024',
    deploymentDate: 'October 2024',
    thumbnail: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
    coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80',
        caption: 'Autonomous rover chassis equipped with 2D LiDAR scanner and status OLED display.',
        type: 'prototype',
      },
      {
        url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
        caption: 'Microcontroller power distribution board and low-noise buck regulator stage.',
        type: 'pcb',
      },
      {
        url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
        caption: 'Oscilloscope measurements showing encoder quadrature pulses and PWM response.',
        type: 'image',
      },
    ],
    objectives: [
      'Design an energy-efficient differential drive base with high torque-to-weight ratio.',
      'Implement real-time PID velocity loops at 100 Hz on an STM32 ARM Cortex-M4 microcontroller.',
      'Achieve sub-5cm local obstacle avoidance using ultrasonic and time-of-flight arrays.',
      'Stream live telemetry and map contours over high-speed WebSocket back to an operator station.',
    ],
    problemStatement:
      'Navigating structured indoor spaces without GPS requires precise odometry fusion and rapid reaction times that pure high-level compute cannot guarantee without dedicated low-level real-time firmware.',
    components: [
      { name: 'Core Microcontroller', partNumber: 'STM32F401RE', role: 'Real-time motor control and encoder decoding', specs: '84MHz, 512KB Flash' },
      { name: 'Communications SoC', partNumber: 'ESP32-S3', role: 'Telemetry, Wi-Fi 4, WebSocket bridge', specs: 'Dual Xtensa LX7 @ 240MHz' },
      { name: '2D LiDAR', partNumber: 'Slamtec RPLiDAR A1M8', role: '360° laser range scanning', specs: '12m range, 8000 samples/sec' },
      { name: 'Dual H-Bridge Driver', partNumber: 'DRV8871', role: 'Brushed DC motor current control', specs: '3.6A peak current, PWM controlled' },
      { name: 'IMU Sensor', partNumber: 'MPU-6050', role: '6-axis angular velocity and linear acceleration', specs: 'I2C, integrated DMP' },
    ],
    architecture: {
      overview: 'Hierarchical dual-tier processing layout decoupling mission telemetry from deterministic hardware loops.',
      subsystems: [
        { name: 'Power Subsystem', description: '3S Li-Po battery pack (11.1V, 2200mAh) feeding dual LM2596 high-efficiency step-down buck regulators (5V and 3.3V rails).' },
        { name: 'Motor Drive & Feedback', description: 'Optical incremental wheel encoders fed into hardware timer encoder mode on STM32 for zero-CPU-overhead position tracking.' },
        { name: 'Perception Layer', description: 'RPLiDAR A1 serial packet parser coupled with a ring of 4x HC-SR04 ultrasonic sensors for close-proximity dead-zone safety.' },
      ],
    },
    implementation:
      'The firmware runs on FreeRTOS with separated preemptive tasks: Task 1 handles encoder polling and PID calculation at 10ms intervals; Task 2 parses LiDAR packets via DMA circular buffer; Task 3 coordinates safety e-stops and wireless heartbeats.',
    codeSnippet: {
      language: 'cpp',
      title: 'FreeRTOS Motor Speed Control Loop (STM32)',
      code: `void vMotorPIDTask(void *pvParameters) {
  TickType_t xLastWakeTime = xTaskGetTickCount();
  const TickType_t xFrequency = pdMS_TO_TICKS(10); // 100 Hz

  for(;;) {
    int32_t leftTicks = read_left_encoder();
    int32_t rightTicks = read_right_encoder();
    
    float leftRPM = calculate_rpm(leftTicks);
    float rightRPM = calculate_rpm(rightTicks);

    float leftPWM = pid_update(&pidLeft, targetLeftRPM, leftRPM);
    float rightPWM = pid_update(&pidRight, targetRightRPM, rightRPM);

    set_motor_pwm(MOTOR_LEFT, leftPWM);
    set_motor_pwm(MOTOR_RIGHT, rightPWM);

    vTaskDelayUntil(&xLastWakeTime, xFrequency);
  }
}`,
    },
    testing: {
      methodology:
        'Conducted open-loop step response tests on both motors to extract plant transfer functions, followed by tuned closed-loop tests with simulated surface friction changes.',
      results: [
        'Steady-state speed error reduced to < 2.1% across varying surface friction coefficients.',
        'Obstacle detection latency measured at < 45ms from ultrasonic echo trigger to motor braking.',
        'Battery runtime averaged 2 hours 40 minutes under continuous scanning and navigation.',
      ],
    },
    results:
      'The prototype successfully navigated a 35 m² laboratory setup, generated an occupancy grid map with 3 cm resolution, and avoided dynamic obstacles smoothly.',
    challenges: [
      {
        problem: 'Back-EMF noise from DC motors caused intermittent I2C bus hangs on the MPU-6050 IMU.',
        solution: 'Isolated motor drive power traces, added TVS snubbers across motor leads, and placed 4.7kΩ pull-up resistors with hardware filter capacitors on I2C lines.',
      },
      {
        problem: 'Encoder tick jitter during rapid motor deceleration.',
        solution: 'Implemented hardware digital debouncing filters on STM32 TIM2 and TIM3 encoder inputs.',
      },
    ],
    learnings: [
      'Gained deep experience in real-time embedded systems and multi-threaded FreeRTOS task synchronization.',
      'Learned ground-loop mitigation strategies for mixed-signal power and sensitive analog sensor designs.',
    ],
    futureWork: [
      'Upgrade to brushless DC (BLDC) motors with field-oriented control (FOC) for silent operation and higher efficiency.',
      'Integrate stereo depth camera for 3D visual odometry in vertical obstacle clearance.',
    ],
    githubUrl: 'https://github.com/senithu-sethmin/autonomous-rover-firmware',
    documentationUrl: 'https://github.com/senithu-sethmin/autonomous-rover-firmware#readme',
    featured: true,
    isSampleContent: true,
  },
  {
    id: 'proj-02',
    slug: 'smart-iot-energy-monitor',
    title: 'Smart IoT Multi-Channel Energy Monitor & Power Quality Analyzer',
    summary:
      'A non-invasive AC mains power analyzer featuring split-core current transformers, true-RMS voltage sampling, power factor estimation, and MQTT cloud telemetry.',
    description:
      'An embedded IoT energy metering solution designed to monitor split-phase AC loads. Calculates active power, apparent power, reactive power, and harmonic distortion with precision analog front-end signal conditioning.',
    category: 'IoT',
    tags: ['IoT', 'Power Systems', 'ESP32', 'MQTT', 'Signal Conditioning'],
    technologies: ['ESP32', 'ADS1115 ADC', 'SCT-013 CTs', 'MQTT / InfluxDB', 'KiCad PCB'],
    status: 'Tested & Validated',
    startDate: 'November 2023',
    completionDate: 'February 2024',
    thumbnail: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&w=800&q=80',
    coverImage: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&w=1200&q=80',
        caption: 'Custom fabricated double-sided PCB populated with analog front-end conditioning.',
        type: 'pcb',
      },
      {
        url: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
        caption: 'Field testing setup monitoring split-phase home distribution panel.',
        type: 'prototype',
      },
    ],
    objectives: [
      'Accurately sample 230V AC mains at 1 kHz minimum to capture up to 7th harmonic frequencies.',
      'Achieve non-invasive measurement using 0-30A split-core current transformers with burden resistor biasing.',
      'Transmit real-time telemetry via TLS-encrypted MQTT at 1-second intervals.',
    ],
    problemStatement:
      'Commercial smart meters provide coarse delayed data; distributed renewable microgrids need fast, edge-calculated power factor and reactive power metrics for load balancing.',
    components: [
      { name: 'Core Processor', partNumber: 'ESP32-WROOM-32E', role: 'Sampling coordination, FFT, and MQTT communication', specs: '240MHz, 4MB Flash' },
      { name: '16-bit Sigma-Delta ADC', partNumber: 'ADS1115', role: 'High resolution differential voltage and current sampling', specs: '860 SPS, I2C' },
      { name: 'Current Transformer', partNumber: 'SCT-013-000', role: 'Non-invasive AC current sensing', specs: '0-100A / 0-50mA out' },
      { name: 'AC Potential Transformer', partNumber: 'ZMPT101B', role: 'Isolated voltage wave sampling', specs: '2mA nominal, linear phase' },
    ],
    architecture: {
      overview: 'Isolated analog signal conditioning with precision active virtual-ground bias feeding a 16-bit ADC.',
      subsystems: [
        { name: 'Analog Front End', description: 'DC voltage offset network with 2.5V precision voltage reference (TL431) to center AC sinusoids within ADC range.' },
        { name: 'Digital Signal Processing', description: 'True-RMS algorithm calculating root-mean-square over 20 complete 50Hz cycles (400ms integration window).' },
      ],
    },
    implementation:
      'C++ ESP-IDF firmware utilizing high-speed hardware timers. Computes instantaneous voltage and current products to derive active power P, apparent power S, and power factor PF = P / S.',
    testing: {
      methodology:
        'Calibrated against a laboratory-grade Fluke 87V true-RMS digital multimeter across resistive, inductive, and capacitive test loads (10W to 2400W).',
      results: [
        'Measurement accuracy verified within ±1.4% of reference instrument.',
        'Power factor tracking accurately resolved reactive loads from 0.45 lagging to 0.98 leading.',
      ],
    },
    results:
      'Reliably logged real-time energy usage over 90 days with zero connection loss, automatically republishing cached metrics upon Wi-Fi reconnection.',
    challenges: [
      {
        problem: 'Phase shift introduced by the magnetic core of the potential transformer caused inaccurate power factor calculations.',
        solution: 'Implemented a software phase-calibration coefficient in firmware to digitally align V and I zero-crossings.',
      },
    ],
    learnings: [
      'Deepened knowledge of AC power theory, harmonic distortion, and safe high-voltage instrumentation techniques.',
    ],
    futureWork: [
      'Add on-device edge machine learning for appliance load disaggregation (NILM).',
    ],
    githubUrl: 'https://github.com/senithu-sethmin/iot-power-monitor',
    featured: true,
    isSampleContent: true,
  },
  {
    id: 'proj-03',
    slug: 'high-efficiency-synchronous-buck-converter',
    title: 'High-Efficiency Synchronous DC-DC Buck Converter with Digital Control',
    summary:
      'A 12V to 3.3V/5V 8A synchronous step-down converter with discrete MOSFETs, gate drivers, and digital current-mode loop compensation.',
    description:
      'Custom power supply board designed to achieve > 94% efficiency under full load. Features optimized high-current PCB layout, thermal vias, low-ESR ceramic decoupling, and cycle-by-cycle overcurrent protection.',
    category: 'Power Electronics',
    tags: ['Power Electronics', 'Buck Converter', 'PCB Design', 'SMPS', 'Thermal Analysis'],
    technologies: ['KiCad 8.0', 'LTspice', 'Discrete MOSFETs', 'Synchronous Rectification', 'Digital Control'],
    status: 'Tested & Validated',
    startDate: 'January 2024',
    completionDate: 'May 2024',
    thumbnail: 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&w=800&q=80',
    coverImage: 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&w=1200&q=80',
        caption: '4-layer FR4 board layout showing high-current copper pours and symmetric gate drive loops.',
        type: 'pcb',
      },
      {
        url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
        caption: 'Thermal imaging camera capture during continuous 8A load test.',
        type: 'image',
      },
    ],
    objectives: [
      'Design a synchronous buck converter operating at 350 kHz switching frequency.',
      'Achieve peak power conversion efficiency above 94% with < 20mV output ripple voltage.',
      'Maintain MOSFET junction temperature below 65°C under continuous 8A load without active fan cooling.',
    ],
    problemStatement:
      'Conventional non-synchronous converters dissipate significant power in the freewheeling Schottky diode, limiting battery life in embedded outdoor field instruments.',
    components: [
      { name: 'High-side N-Channel MOSFET', partNumber: 'CSD18534Q5A', role: 'Main switching transistor', specs: '60V, 7.8mΩ RDS(on)' },
      { name: 'Low-side N-Channel MOSFET', partNumber: 'CSD18540Q5B', role: 'Synchronous rectifier', specs: '60V, 1.8mΩ RDS(on)' },
      { name: 'Synchronous Gate Driver', partNumber: 'TPS28225', role: 'High-speed MOSFET gate drive with adaptive dead-time', specs: '4A sink / 2A source' },
      { name: 'Shielded Power Inductor', partNumber: 'Bourns SRP1038A', role: 'Energy storage inductor', specs: '4.7µH, 12A sat current' },
    ],
    architecture: {
      overview: '4-layer board design with dedicated internal ground plane and split power ground (PGND) and analog ground (AGND).',
      subsystems: [
        { name: 'Switching Node Optimization', description: 'Minimized switch node copper area to reduce parasitic capacitive RF radiation while maintaining sufficient current carrying capacity.' },
        { name: 'Feedback & Loop Compensation', description: 'Type-III voltage-mode feedback compensation network for stable gain margin (> 15dB) and phase margin (> 55°).' },
      ],
    },
    implementation:
      'Simulated in LTspice to verify bode plot stability and transient load response. Designed a 4-layer 2-oz copper PCB with thermal via arrays stitched directly underneath the MOSFET power pads.',
    testing: {
      methodology:
        'Tested using a programmable electronic DC load (0 to 10A dynamic pulses) and a 200MHz oscilloscope with spring-ground probe tips for low-noise ripple measurement.',
      results: [
        'Measured 94.6% efficiency at 5V / 5A output and 92.1% at maximum 8A continuous load.',
        'Output voltage ripple remained under 14.8 mV peak-to-peak.',
        'Step-load response recovered within 35 µs for a 50% load transient step.',
      ],
    },
    results:
      'Thermal dissipation stayed well within design constraints; maximum surface temperature reached 58.4°C in 25°C ambient still air.',
    challenges: [
      {
        problem: 'Switch-node ringing and high-frequency EMI spikes due to stray board inductance.',
        solution: 'Added an RC snubber network (2.2Ω + 1nF 0603 C0G) across the low-side switch to damp parasitic resonance without noticeable efficiency penalty.',
      },
    ],
    learnings: [
      'Gained hands-on mastery of high-frequency power electronics PCB layout principles, loop stability analysis, and thermal management.',
    ],
    futureWork: [
      'Integrate an I2C digital telemetry interface for programmable output voltage and real-time efficiency monitoring.',
    ],
    githubUrl: 'https://github.com/senithu-sethmin/synchronous-buck-converter',
    featured: true,
    isSampleContent: true,
  },
  {
    id: 'proj-04',
    slug: 'dual-axis-solar-tracker',
    title: 'Precision Dual-Axis Solar Tracker with Maximum Power Point Analytics',
    summary:
      'An automated dual-axis solar tracking system combining astronomical ephemeris positioning with real-time differential light sensor feedback.',
    description:
      'Engineered to optimize photovoltaic energy harvest. Features dual stepper motor actuation, microstepping drivers, astronomical solar positioning algorithms, and integrated MPPT voltage/current logging.',
    category: 'Renewable Energy',
    tags: ['Solar', 'Renewable Energy', 'Automation', 'Embedded C', 'Hardware'],
    technologies: ['Arduino / ATmega328P', 'A4988 Stepper Drivers', 'LDR Array', 'INA219 Sensor', '3D Printed Mechanics'],
    status: 'Prototype Completed',
    startDate: 'August 2023',
    completionDate: 'December 2023',
    thumbnail: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80',
    coverImage: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
        caption: 'Dual-axis gimbal frame holding 20W polycrystalline solar panel.',
        type: 'prototype',
      },
    ],
    objectives: [
      'Maintain perpendicular solar alignment within ±2.5 degrees of sun incidence throughout daylight hours.',
      'Achieve a minimum 25% energy yield increase compared to a static 15° tilted reference panel.',
      'Consume less than 1.5% of generated daily energy for motor actuation and sensor telemetry.',
    ],
    problemStatement:
      'Fixed solar installations lose up to 40% of potential daily irradiation due to non-optimal sun incidence angles across seasonal and diurnal paths.',
    components: [
      { name: 'Microcontroller', partNumber: 'ATmega328P', role: 'Ephemeris math and differential quadrant control', specs: '16MHz, 8-bit AVR' },
      { name: 'Elevation Stepper Motor', partNumber: 'NEMA 17 (17HS4401)', role: 'Pitch axis positioning', specs: '1.8° step, 40Ncm holding torque' },
      { name: 'Azimuth Stepper Motor', partNumber: 'NEMA 17 (17HS4401)', role: 'Yaw axis 360° rotation', specs: 'Worm gearbox ratio 1:30' },
      { name: 'Solar Sensor Pyranometer', partNumber: 'Quadrant LDR Enclosure', role: 'Differential solar incidence angle measurement', specs: '4-quadrant shaded cylinder' },
    ],
    architecture: {
      overview: 'Hybrid control topology switching between astronomical lookup table and local optical closed-loop corrections.',
      subsystems: [
        { name: 'Mechanical Gimbal', description: 'Counter-balanced altitude-azimuth fork mount with mechanical worm gear preventing back-drive during high wind gust conditions.' },
        { name: 'Energy Harvester & Logger', description: 'INA219 high-side I2C current and voltage sensor monitoring both tracking and stationary control panels.' },
      ],
    },
    implementation:
      'The controller executes an astronomical position routine every 15 minutes. When cloud cover passes, it activates fine optical tracking using 4 analog LDR sensors mounted inside a collimating tube.',
    testing: {
      methodology:
        'Operated continuously for two consecutive weeks alongside an identical static solar panel fixed facing south at 15° tilt angle.',
      results: [
        'Generated a cumulative 28.4% additional watt-hours of electrical energy across test period.',
        'Mechanical drive power consumption averaged 0.82% of total generated daily energy.',
      ],
    },
    results:
      'Successfully tracked the sun from sunrise to sunset with smooth microstepping, automatically homing back to east at dusk.',
    challenges: [
      {
        problem: 'False tracking jitter caused by overcast skies and localized cloud reflections.',
        solution: 'Implemented threshold hysteresis and a dynamic dead-band filter, falling back to pure mathematical solar trajectory when ambient lux drops below 1500 lux.',
      },
    ],
    learnings: [
      'Learned mechanical transmission design, worm-drive friction modeling, and astronomical coordinate transformations.',
    ],
    futureWork: [
      'Integrate anemometer sensor for automatic storm-mode horizontal feathering during high wind conditions.',
    ],
    githubUrl: 'https://github.com/senithu-sethmin/dual-axis-solar-tracker',
    featured: true,
    isSampleContent: true,
  },
];
