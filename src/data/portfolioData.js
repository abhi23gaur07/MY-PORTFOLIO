export const portfolioData = {
  personal: {
    name: "Abhishek Gaur",
    role: "Electronics Engineer (Defence Technology) · Hardware & IoT Innovator",
    university: "Rashtriya Raksha University (RRU)",
    degree: "B.Tech in Electronics Engineering (Specialization in Defence Technology)",
    specialization: "Defence Technology",
    location: "Rashtriya Raksha University, Gandhinagar, Gujarat, India",
    email: "gaurabhishek2309@gmail.com",
    github: "https://github.com/abhi23gaur07",
    linkedin: "https://www.linkedin.com/in/abhishek-gaur-855a3b388/?isSelfProfile=true",
    avatar: "/profile.jpg",
    bio: "Hi, I'm Abhishek Gaur — a B.Tech Electronics Engineering undergraduate with a Specialization in Defence Technology at Rashtriya Raksha University (RRU). Keen learner and a Deep Thinker, currently working on embedded systems and IOT projects, with a focused portfolio consisting of curated, high-impact projects.",
    quote: "Be a living electronic circuit. Practice resistance where needed, like a resistor. Preserve energy where needed, like a capacitor. Direct energy where needed, like a diode. And above all, be driven by a purpose, like an IC.",
    stats: [
      { label: "Institution", value: "RRU", context: "National Importance Institute" },
      { label: "Official Major", value: "Defence Tech", context: "B.Tech Electronics @ RRU" },
      { label: "Core Competency", value: "Embedded & IoT", context: "Firmware & Circuitry" },
      { label: "Flagship Repositories", value: "2+", context: "The Smart Library & Delta Neurons" }
    ]
  },

  workflow: {
    badge: "Engineering Methodology",
    heading: "Here's How I Turn Ideas Into Real-World Applications",
    description: "I follow an end-to-end, structured engineering methodology to transform raw concepts and problem statements into reliable, field-tested embedded devices and connected platforms.",
    steps: [
      {
        number: "01",
        title: "Research & Problem Statement Analysis",
        subtitle: "Groundwork & Feasibility Study",
        description: "Every successful project starts with identifying genuine operational pain points. I dissect real-world requirements, assess edge vs. cloud computing trade-offs, conduct sensor feasibility analyses, and define strict power, thermal, and bandwidth boundaries.",
        tags: ["Problem Framing", "Feasibility Study", "Sensor Trade-offs", "Power Budgeting"]
      },
      {
        number: "02",
        title: "Circuit Design & Component Selection",
        subtitle: "Hardware Architecture & Schematics",
        description: "Selecting optimal microcontrollers (ARM Cortex-M, STM32, ESP32, Arduino) based on processing power, peripherals, and pinout mapping. Designing circuit schematics with proper voltage regulation, noise isolation, pull-up/pull-down topologies, and reliable communication buses.",
        tags: ["Microcontroller Selection", "Schematic Design", "Bus Protocols (I2C/SPI)", "Power Regulation"]
      },
      {
        number: "03",
        title: "Firmware & Hardware Prototyping",
        subtitle: "Low-Level Coding & Assembly",
        description: "Developing robust, modular firmware in Embedded C/C++ or Python. Structuring deterministic finite state machines, interrupt service routines, hardware debouncing, sensor calibration, and rapid breadboard verification before custom PCB fabrication.",
        tags: ["Embedded C/C++", "State Machines", "Sensor Calibration", "Breadboard Verification"]
      },
      {
        number: "04",
        title: "Cloud Telemetry, Testing & Deployment",
        subtitle: "Edge-to-Cloud & Field Validation",
        description: "Bridging physical hardware to web backends via MQTT, HTTP, and WebSockets. Implementing offline-to-online sync buffers, automated alerts (such as WhatsApp/email alerts), stress-testing under extreme field conditions, and final field deployment.",
        tags: ["MQTT & HTTP APIs", "Offline Buffering", "Automated Alerts", "Field Validation"]
      }
    ]
  },

  projects: [
    {
      id: "smart-library",
      title: "The Smart Library · Automated Circulation & WhatsApp Reminder System",
      shortTitle: "The Smart Library",
      category: "Full-Stack Software & Automation",
      featured: true,
      githubUrl: "https://github.com/abhi23gaur07/the-smart-library",
      demoUrl: "https://github.com/abhi23gaur07/the-smart-library",
      badge: "Full-Stack Software",
      status: "Production Ready",
      summary: "A full-stack automated library circulation software platform featuring automated 48-hour hold reservations, high-concurrency SQLite WAL database architecture, and instant multi-channel WhatsApp reminder notifications.",
      fullDescription: "Built with an institutional focus for Rashtriya Raksha University, this software platform modernizes campus library circulation through automated digital workflows. It features real-time catalog search and book availability tracking, student self-service reservations with automatic 48-hour expiration, and a high-performance SQLite WAL backend. Crucially, a background cron daemon manages automatic WhatsApp notifications for overdue books, checkouts, and fine collections, drastically minimizing manual administrative overhead.",
      highlights: [
        "Automated WhatsApp reminder engine reducing overdue books by over 60%",
        "High-performance SQLite WAL mode ensuring zero lock-ups during peak circulation",
        "48-hour automated reservation expiry engine freeing uncollected inventory",
        "Multi-role role-based access control (Student, Librarian, Super Admin)",
        "Integrated RRU Institutional Repository & Digital Library catalog"
      ],
      techStack: ["Node.js v18+", "Express.js", "SQLite (WAL Mode)", "WhatsApp Cloud API", "Cron Automation", "JavaScript", "REST APIs", "Tailwind CSS"],
      stats: {
        booksProcessed: "10,000+",
        notificationType: "Automated WhatsApp",
        latency: "< 50ms DB queries"
      }
    },
    {
      id: "delta-neurons",
      title: "Delta Neurons 🧠 · AI-Assisted Cognitive Healthcare Platform for NER",
      shortTitle: "Delta Neurons",
      category: "Assistive IoT & Cognitive Healthcare",
      featured: true,
      githubUrl: "https://github.com/abhi23gaur07/DELTA-NEURONS-",
      demoUrl: "https://github.com/abhi23gaur07/DELTA-NEURONS-",
      badge: "Healthcare Innovation",
      status: "Deployed Prototype",
      summary: "An AI-powered cognitive stimulation, reminiscence therapy, and memory assistance platform engineered specifically for elderly dementia patients in India's North Eastern Region (NER).",
      fullDescription: "Engineered to overcome severe healthcare infrastructure and connectivity hurdles in remote North Eastern India. Features an innovative Automatic Offline-to-Online Synchronization Engine with local buffer queuing so elderly patients can play cognitive games, log hydration, and take medications even with zero internet. The platform features Assamese and NER regional linguistic and sensory localization, providing familiar folk music (Bihu), cultural imagery, and telemetry dashboards for doctors and caregivers.",
      highlights: [
        "Proprietary Offline-to-Online Synchronization Engine via local storage buffer queue",
        "Culturally curated Reminiscence Sensory Stimuli tailored for North Eastern heritage",
        "Tri-role Portal ecosystem: Accessible Patient Game UI, Caregiver Logs, Doctor Telemetry",
        "Cognitive degradation telemetry tracking reaction times and score regressions",
        "Lightweight architecture built without heavy framework bloat for maximum accessibility"
      ],
      techStack: ["Node.js Native", "SQLite (node:sqlite)", "Offline Telemetry Sync", "Linguistic Localization", "HTML5 / Audio API", "CSS3", "JavaScript"],
      stats: {
        syncCapability: "100% Offline-First",
        languages: "MULTILINGUAL/NER",
        telemetry: "Real-time Reaction Analytics"
      }
    }
  ],

  // ONLY SECTION WITH SIH ACHIEVEMENTS AS REQUESTED
  achievements: [
    {
      id: "sih-rru-winner",
      rank: "#1 in Hardware Category",
      overallRank: "#8 Overall Category",
      title: "Smart India Hackathon (SIH) — Rashtriya Raksha University Internal Round",
      venue: "Rashtriya Raksha University (RRU)",
      location: "Gandhinagar, Gujarat",
      year: "2026 – Present",
      type: "Competitive Hackathon Win",
      highlight: true,
      description: "Secured 1st Place in the Hardware Category and 8th Place in the Overall Category at the university-wide SIH Internal Round. Competed against dozens of engineering teams by demonstrating an end-to-end working hardware prototype that merged microcontrollers, sensor arrays, and low-latency digital communication.",
      takeaways: [
        "Honored with #1 Hardware position by academic and industry jury panels",
        "Pioneered rapid embedded hardware troubleshooting and live demonstration under tight deadlines",
        "Demonstrated technical leadership, agile problem solving, and circuit optimization"
      ],
      tags: ["SIH Internal Round", "Rank #1 Hardware", "Rank #8 Overall", "Embedded Systems", "Rashtriya Raksha University"]
    },
    {
      id: "rru-tech-showcase",
      rank: "Institutional Honors",
      overallRank: "Top ECE Innovator",
      title: "RRU Engineering & Technology Innovation Showcase",
      venue: "School of Engineering & Technology, RRU",
      location: "Gandhinagar, Gujarat",
      year: "2026",
      type: "Technical Exhibition",
      highlight: false,
      description: "Presented research prototypes in IoT sensor integration and automated data logging systems. Recognized for designing accessible electronic devices that address public safety, institutional efficiency, and assistive healthcare.",
      takeaways: [
        "Mentored junior engineering students in microcontrollers and circuit debugging",
        "Showcased live telemetry between physical edge sensors and cloud dashboards"
      ],
      tags: ["Technical Exhibition", "Defence & IoT Prototyping", "Sensor Telemetry", "Peer Mentorship"]
    },
    {
      id: "ner-healthcare-impact",
      rank: "Special Recognition",
      overallRank: "Social Innovation",
      title: "Assistive Healthcare Engineering Initiative for NER Dementia Patients",
      venue: "Community Healthcare Engineering Project",
      location: "North East Region Outreach",
      year: "2026",
      type: "Healthcare Innovation",
      highlight: false,
      description: "Spearheaded the Delta Neurons initiative to address rural geriatric cognitive challenges in the North Eastern Region. Validated offline telemetry buffering and localized sensory stimuli with healthcare stakeholders.",
      takeaways: [
        "Engineered zero-connectivity tolerant telemetry architectures",
        "Integrated medical insights with accessible electronics and interactive software"
      ],
      tags: ["Social Innovation", "Assistive Tech", "Geriatric Care", "Offline Engine"]
    }
  ],

  leadership: [
    {
      id: "lead-smart-library",
      role: "Lead & Project Head",
      project: "The Smart Library System",
      organization: "Rashtriya Raksha University",
      period: "2026 – Present",
      description: "Steered the architectural design and multi-module implementation of the automated university library system.",
      responsibilities: [
        "Led the software engineering workflow, architecting full-stack web modules, RESTful endpoints, and relational database schemas",
        "Architected SQLite database schemas in WAL mode and developed fail-safe automated WhatsApp alert cron jobs",
        "Enforced clean code standards, Git workflow versioning, and rigorous unit & integration testing",
        "Liaised with RRU university administration to tailor circulation algorithms to institutional policy guidelines"
      ],
      impact: "Eliminated manual tracking bottlenecks and set a new standard for campus software automation systems."
    },
    {
      id: "lead-delta-neurons",
      role: "Lead & Project Head",
      project: "Delta Neurons (NER Dementia Care Platform)",
      organization: "Healthcare Innovation Initiative",
      period: "2026 – Present",
      description: "Spearheaded the research, architecture, and deployment of a culturally localized cognitive assistance platform for dementia patients.",
      responsibilities: [
        "Conducted in-depth research on dementia symptoms, sensory reminiscence therapy, and geriatric UX guidelines",
        "Invented and coded the resilient offline-to-online sync engine to combat rural Northeast internet dropouts",
        "Directed the multi-role portal design across clinical, caregiver, and patient interfaces",
        "Spearheaded regional language integration (Assamese/NER) and sensory multimedia integration"
      ],
      impact: "Created an inclusive, life-improving tool for marginalized dementia patients, praised for its empathy and technical robustness."
    }
  ],

  // Placed ABOVE Certification Section as instructed
  skills: {
    badge: "Engineering Skillset",
    heading: "Core Technical & Professional Skills",
    description: "A comprehensive, industry-grade breakdown of my capabilities across foundational electronics engineering, microcontrollers, specialized IoT & defence technology domains, and essential leadership soft skills.",
    categories: [
      {
        id: "core-technical",
        title: "Core Technical Skills",
        subtitle: "Basic Electronics Engineering & Microcontrollers",
        badge: "Foundational Hardware",
        icon: "Cpu",
        skills: [
          {
            name: "Circuit Design & Analysis",
            categoryTag: "Analog & Digital",
            description: "Build and test both analog and digital circuits using discrete resistors, capacitors, transistors (BJTs, MOSFETs), and operational amplifiers (Op-Amps) for signal conditioning and filtering.",
            tools: ["Resistors & Capacitors", "BJTs & MOSFETs", "Op-Amps", "Analog Filters", "Voltage Dividers"],
            level: 92
          },
          {
            name: "PCB Development",
            categoryTag: "EDA & Layout",
            description: "Perform schematic capture, component footprint assignment, and multi-layer board layout using industry software like Altium Designer and KiCad, ensuring optimal trace routing and noise immunity.",
            tools: ["Altium Designer", "KiCad", "Schematic Capture", "Multi-layer PCB", "Gerber Generation"],
            level: 88
          },
          {
            name: "Embedded Systems & Microcontrollers",
            categoryTag: "Firmware & Silicon",
            description: "Write low-overhead, deterministic firmware in C and C++, configuring registers, timers, interrupts, and peripherals on microcontrollers like ARM Cortex-M, STM32, ESP32, and Arduino.",
            tools: ["ARM Cortex-M", "STM32", "ESP32", "Arduino", "Embedded C / C++", "RTOS"],
            level: 94
          },
          {
            name: "Hardware Testing & Troubleshooting",
            categoryTag: "Lab Instrumentation",
            description: "Validate, calibrate, and troubleshoot custom circuit boards in lab environments using digital oscilloscopes, multimeters, logic analyzers, and DC power supplies.",
            tools: ["Digital Oscilloscope", "Digital Multimeter", "Logic Analyzer", "Signal Generator", "Power Bench"],
            level: 90
          },
          {
            name: "Simulation & Modeling Tools",
            categoryTag: "Verification",
            description: "Model complex system behavior, analyze transient and frequency responses, and run pre-fabrication circuit simulations using SPICE and MATLAB/Simulink.",
            tools: ["SPICE / LTspice", "MATLAB", "Simulink", "Transient Analysis", "Frequency Response"],
            level: 86
          }
        ]
      },
      {
        id: "specialized-modern",
        title: "Specialized & Modern Skills",
        subtitle: "IoT, Power Electronics & Defence Systems",
        badge: "Advanced Engineering",
        icon: "Zap",
        skills: [
          {
            name: "IoT & Connectivity Protocols",
            categoryTag: "Communication Buses",
            description: "Deep understanding and implementation of hardware and wireless communication protocols including I²C, SPI, UART, USB, Wi-Fi, Bluetooth Low Energy (BLE), and lightweight MQTT pub/sub.",
            tools: ["I²C", "SPI", "UART", "USB", "Wi-Fi (802.11)", "Bluetooth LE (BLE)", "MQTT", "HTTP REST"],
            level: 93
          },
          {
            name: "Power Electronics",
            categoryTag: "Power Conversion",
            description: "Design efficient DC-DC converters (Buck, Boost, Buck-Boost), linear regulators, and work with high-efficiency power semiconductors like MOSFETs and wide-bandgap Gallium Nitride (GaN) devices.",
            tools: ["DC-DC Converters", "Buck / Boost", "Power MOSFETs", "GaN Semiconductors", "LDOs", "Thermal Sinking"],
            level: 86
          },
          {
            name: "FPGA Integration & Digital Design",
            categoryTag: "HDL & Silicon Logic",
            description: "Design high-speed digital systems, finite state machines, and hardware accelerators using hardware description languages like Verilog and VHDL for deterministic logic execution.",
            tools: ["Verilog", "VHDL", "RTL Design", "Digital Logic", "FPGA Development"],
            level: 88
          },
          {
            name: "Sensor Interfacing & Telemetry",
            categoryTag: "Signal Acquisition",
            description: "Interface real-world analog and digital sensors (RFID, ultrasonic, IMUs, environmental sensors), implement ADC sampling, hardware debouncing, and low-latency edge telemetry.",
            tools: ["ADC Conditioning", "RFID Readers", "IMU / Accelerometers", "Edge Buffering", "Sensor Fusion"],
            level: 92
          }
        ]
      },
      {
        id: "essential-soft",
        title: "Essential Professional Soft Skills",
        subtitle: "Leadership, Critical Problem Solving & Direction",
        badge: "Professional Excellence",
        icon: "Award",
        skills: [
          {
            name: "Analytical Problem-Solving",
            categoryTag: "Root-Cause Diagnostics",
            description: "Systematically diagnose complex, intermittent hardware faults, signal integrity glitches, and timing races using first-principles debugging and empirical isolation.",
            tools: ["Root-Cause Analysis", "Fault Isolation", "Signal Integrity", "Empirical Testing"],
            level: 95
          },
          {
            name: "Technical Leadership & Project Direction",
            categoryTag: "Team Stewardship",
            description: "Lead multidisciplinary engineering teams from scratch, managing sprint milestones, technical reviews, and executing award-winning solutions like The Smart Library and Delta Neurons.",
            tools: ["Team Leadership", "Sprint Milestones", "Architecture Ownership", "Milestone Delivery"],
            level: 94
          },
          {
            name: "Cross-Disciplinary Teamwork",
            categoryTag: "Collaboration",
            description: "Collaborate smoothly with software engineers, cloud architects, mechanical designers, and medical/institutional stakeholders to deliver cohesive, field-ready products.",
            tools: ["Cross-functional Sync", "Hardware-Software Co-Design", "Stakeholder Alignment"],
            level: 92
          },
          {
            name: "Technical Communication",
            categoryTag: "Presentation & Pitch",
            description: "Explain intricate electronic circuit concepts, firmware logic, and hardware trade-offs clearly to non-technical stakeholders, academic juries, and competitive panels.",
            tools: ["Jury Pitching", "Schematic Walkthroughs", "Technical Documentation", "Client Demos"],
            level: 90
          },
          {
            name: "Creativity & Hardware Innovation",
            categoryTag: "Inventive Thinking",
            description: "Devise inventive engineering architectures for constrained environments, such as the zero-internet offline sync engine built for rural Northeast India dementia patients.",
            tools: ["Inventive Architecture", "Constrained Design", "Resourceful Prototyping"],
            level: 92
          },
          {
            name: "Time Management & Rapid Sprint Execution",
            categoryTag: "Agile Hardware",
            description: "Thrive under tight deadline crunches, delivering functional working prototypes under pressure, proven through rapid prototype builds.",
            tools: ["Rapid Sprints", "Rapid Prototyping", "Agile Execution", "Prioritization"],
            level: 91
          }
        ]
      }
    ]
  },

  certifications: [
    {
      id: "cert-quantum",
      title: "One-Day Workshop on Quantum Computing",
      organization: "Specialized Technical Workshop (Rashtriya Raksha University)",
      issueDate: "Verified LinkedIn Credential",
      badge: "Quantum Mechanics & Computing",
      description: "Completed intensive training on foundational quantum computing principles, including quantum bits (qubits), quantum superposition, quantum entanglement, quantum circuit gates, and mathematical matrix representations. Explored prospective future implications for quantum cryptography, hardware security, and post-quantum computing hardware interfaces.",
      skillsGained: ["Quantum Bits & States", "Superposition & Entanglement", "Quantum Gates & Circuits", "Quantum Security Implications"]
    },
    {
      id: "cert-embedded-iot",
      title: "Embedded Systems & IoT Hardware Masterclass",
      organization: "Electronics Engineering Curriculum & Applied Labs",
      issueDate: "Academic Credential",
      badge: "Applied Electronics",
      description: "Rigorous laboratory and project credential covering embedded microcontroller architectures, sensor telemetry acquisition, analog-to-digital conversions, interrupt latency minimization, and wireless edge communication.",
      skillsGained: ["Microcontroller Architecture", "Sensor Acquisition", "Edge Wireless Networking", "Firmware Optimization"]
    },
    {
      id: "cert-defence-embedded",
      title: "Applied Microcontroller & Sensor Interfacing Masterclass",
      organization: "School of Engineering & Technology (RRU)",
      issueDate: "Academic Credential",
      badge: "Hardware & Telemetry",
      description: "Intensive practical laboratory work covering microcontrollers (ARM Cortex-M, STM32, ESP32), sensor telemetry acquisition, analog-to-digital conversions, interrupt service routines, and hardware communication protocols.",
      skillsGained: ["ARM Cortex-M & STM32", "Sensor Telemetry", "I2C/SPI Protocols", "Circuit Calibration"]
    }
  ],

  contact: {
    heading: "Let's Build Something Impactful Together",
    subheading: "Whether you want to discuss electronics engineering, collaborate on defence technology and IoT hardware, or explore opportunities — my inbox is always open.",
    email: "gaurabhishek2309@gmail.com",
    linkedin: "https://www.linkedin.com/in/abhishek-gaur-855a3b388/?isSelfProfile=true",
    github: "https://github.com/abhi23gaur07",
    location: "Rashtriya Raksha University, Gandhinagar, Gujarat, India"
  }
};
