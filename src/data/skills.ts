/**
 * Collectible Artifact-Style Skills Data
 * Inspired by small collectible magical engineering objects blending technology and craftsmanship.
 */

export interface SkillArtifact {
  id: string;
  name: string;
  category: 'Hardware & Circuits' | 'Firmware & Code' | 'Tools & CAD' | 'Systems & Theory';
  description: string;
  artifactIcon: string; // Lucide icon identifier
  accentColor: string; // Magic teal, golden accent, leaf green, forest brown
  runeSymbol: string;
}

export const skillArtifacts: SkillArtifact[] = [
  {
    id: 'embedded-systems',
    name: 'Embedded Systems',
    category: 'Firmware & Code',
    description: 'ARM Cortex-M, ESP32, and AVR firmware with FreeRTOS multitasking and bare-metal registers.',
    artifactIcon: 'Cpu',
    accentColor: '#4DD0B6', // Magic Teal
    runeSymbol: '⎈',
  },
  {
    id: 'circuit-design',
    name: 'Circuit Design',
    category: 'Hardware & Circuits',
    description: 'Analog signal conditioning, op-amp filters, sensor interfacing, and low-noise power rails.',
    artifactIcon: 'Zap',
    accentColor: '#F6C85F', // Golden Accent
    runeSymbol: '⚡',
  },
  {
    id: 'pcb-design',
    name: 'PCB Design',
    category: 'Tools & CAD',
    description: 'Multi-layer schematics, impedance-matched traces, ground planes, and DFM layouts in KiCad.',
    artifactIcon: 'Layers',
    accentColor: '#A7D7B7', // Leaf Green
    runeSymbol: '⎇',
  },
  {
    id: 'control-systems',
    name: 'Control Systems',
    category: 'Systems & Theory',
    description: 'Closed-loop PID tuning, state-space representations, Kalman filtering, and stability analysis.',
    artifactIcon: 'Compass',
    accentColor: '#4DD0B6',
    runeSymbol: '◎',
  },
  {
    id: 'power-electronics',
    name: 'Power Electronics',
    category: 'Hardware & Circuits',
    description: 'Buck, boost, flyback converters, synchronous MOSFET gate driving, and thermal dissipation.',
    artifactIcon: 'BatteryCharging',
    accentColor: '#F6C85F',
    runeSymbol: '✦',
  },
  {
    id: 'iot-wireless',
    name: 'IoT & Wireless',
    category: 'Systems & Theory',
    description: 'MQTT, HTTP REST, BLE, Wi-Fi 802.11 b/g/n, and cloud telemetry integration.',
    artifactIcon: 'Radio',
    accentColor: '#4DD0B6',
    runeSymbol: '∿',
  },
  {
    id: 'c-cpp',
    name: 'C / C++',
    category: 'Firmware & Code',
    description: 'Performant embedded software, pointers, memory constraints, and deterministic timing.',
    artifactIcon: 'Code2',
    accentColor: '#184E46',
    runeSymbol: '‹/›',
  },
  {
    id: 'kicad-altium',
    name: 'KiCad & Altium',
    category: 'Tools & CAD',
    description: 'Schematic capture, footprint generation, 3D modeling, and Gerber output generation.',
    artifactIcon: 'Binary',
    accentColor: '#A7D7B7',
    runeSymbol: '⚙',
  },
  {
    id: 'matlab-simulink',
    name: 'MATLAB / Simulink',
    category: 'Systems & Theory',
    description: 'Dynamic system modeling, transfer function verification, FFT analysis, and data simulation.',
    artifactIcon: 'Activity',
    accentColor: '#F6C85F',
    runeSymbol: '∫',
  },
  {
    id: 'solidworks-cad',
    name: 'SolidWorks 3D CAD',
    category: 'Tools & CAD',
    description: 'Enclosure design, rapid 3D printing tolerances, mechanical kinematics, and assembly fitment.',
    artifactIcon: 'Box',
    accentColor: '#6B4E3F',
    runeSymbol: '▱',
  },
  {
    id: 'arduino-prototyping',
    name: 'Rapid Prototyping',
    category: 'Hardware & Circuits',
    description: 'Breadboard validation, hardware bench testing, logic analyzers, and oscilloscope debugging.',
    artifactIcon: 'Wrench',
    accentColor: '#A7D7B7',
    runeSymbol: '⚒',
  },
  {
    id: 'data-instrumentation',
    name: 'Instrumentation',
    category: 'Systems & Theory',
    description: 'Automated data logging, Python instrumentation scripts, and sensor error calibration.',
    artifactIcon: 'Gauge',
    accentColor: '#4DD0B6',
    runeSymbol: '⊚',
  },
];
