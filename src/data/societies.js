const societies = [
  {
    id: "gdg",
    name: "GDG NSUT",
    fullName: "Google Developer Groups on Campus NSUT",
    category: "Tech",
    logo: "/logos/gdg.png",
    tagline: "Connect. Learn. Grow.",
    description:
      "At GDG NSUT, we aim to learn, teach, and build impactful technology together. A community of engineers, creators, and open-source advocates passionate about building software for real-world impact.",
    eligibility: "Open to all 1st, 2nd, and 3rd year students passionate about software development, AI, design, or open source.",
    roles: ["Web/App Development", "Machine Learning & AI", "DSA & Problem Solving", "UI/UX Design", "Content & Outreach"],
    recruitmentOpen: true,
    recruitmentDeadline: "2026-09-25",
    foundedYear: 2018,
    membersCount: "350+",
    meetingSchedule: "Saturdays 4:00 PM · Audi 2 & Hybrid Discord",
    tags: ["WebDev", "MachineLearning", "Cloud", "OpenSource", "Android"],
    socials: {
      instagram: "https://instagram.com/gdg_nsut",
      linkedin: "https://linkedin.com/company/gdg-nsut",
      github: "https://github.com/gdg-nsut",
      discord: "https://discord.gg/gdgnsut",
    },
    leads: [
      { name: "Aarav Mehra", role: "Campus Lead", contact: "lead@gdgnsut.org" },
      { name: "Priya Sharma", role: "Tech Co-Lead", contact: "tech@gdgnsut.org" },
    ],
    flagshipEvents: [
      { name: "DevFest Campus Edition", desc: "Annual technology conference with 500+ attendees and speaker sessions from Google engineers." },
      { name: "Winter Hackathon", desc: "36-hour sprint where students build and ship solutions for campus problems." },
      { name: "Android & Flutter Study Jams", desc: "Hands-on weekend bootcamps for mobile developers." },
    ],
    interviewProcess: [
      { step: 1, title: "Application Review", detail: "Evaluation of past work, GitHub/portfolio, and motivation." },
      { step: 2, title: "Skill Challenge / Task", detail: "Short practical task or code challenge according to your chosen domain." },
      { step: 3, title: "Conversational Interview", detail: "Casual conversation regarding culture fit, curiosity, and project goals." },
    ],
    faqs: [
      { q: "Do I need prior development experience to apply?", a: "Not at all! We actively look for beginners with curiosity and a strong drive to learn alongside senior mentors." },
      { q: "What is the expected weekly time commitment?", a: "Usually 3 to 5 hours weekly, primarily during weekend meetups and asynchronous project syncs." },
      { q: "Can I apply for more than one role?", a: "Yes, you can mention your secondary interest in your application pitch." },
    ],
  },

  {
    id: "ieee",
    name: "IEEE NSUT",
    fullName: "Institute of Electrical and Electronics Engineers NSUT Student Branch",
    category: "Tech",
    logo: "/logos/ieee.png",
    tagline: "Explore technology. Create impact.",
    description:
      "A technical student community that fosters technological innovation, research papers, robotics engineering, and professional leadership on a global scale.",
    eligibility: "Open to students across all engineering branches with keen interest in hardware, embedded systems, electronics, or tech management.",
    roles: ["Embedded & Robotics", "Software & Web", "Design & Media", "Corporate Relations & Logistics"],
    recruitmentOpen: false,
    recruitmentDeadline: "Recruitment begins mid-semester",
    foundedYear: 2002,
    membersCount: "420+",
    meetingSchedule: "Wednesdays 5:30 PM · ECE Block Lab 4",
    tags: ["Robotics", "IoT", "Research", "Hardware", "Semiconductors"],
    socials: {
      instagram: "https://instagram.com/ieeensut",
      linkedin: "https://linkedin.com/company/ieee-nsut",
      github: "https://github.com/ieee-nsut",
      discord: "https://discord.gg/ieeensut",
    },
    leads: [
      { name: "Rohan Varma", role: "Chairperson", contact: "chair@ieeensut.com" },
      { name: "Sneha Mukherjee", role: "Vice Chair", contact: "vicechair@ieeensut.com" },
    ],
    flagshipEvents: [
      { name: "Innovacion Tech Summit", desc: "Premier technical symposium featuring hardware hackathons and paper presentations." },
      { name: "RoboWars & Line Follower", desc: "High-octane robotics arena competition drawing collegiate teams from across India." },
    ],
    interviewProcess: [
      { step: 1, title: "Form Screening", detail: "Review of engineering interests, projects, and domain preferences." },
      { step: 2, title: "Technical Round", detail: "Concept discussion in electronics, programming, or management case study." },
      { step: 3, title: "Final Board Interview", detail: "Discussion with the Executive Committee." },
    ],
    faqs: [
      { q: "Is IEEE only for Electrical and ECE students?", a: "No! Many of our strongest software and media leads come from CS, IT, and Mechanical branches." },
      { q: "Do members get IEEE international member benefits?", a: "Yes, members can access IEEE Xplore digital library research papers and global student branch competitions." },
    ],
  },

  {
    id: "tds",
    name: "TDS",
    fullName: "The Debugging Society",
    category: "Tech",
    logo: "/logos/tds.png",
    tagline: "Learn. Build. Compete.",
    description:
      "A vibrant coding and problem-solving society dedicated to algorithmic thinking, competitive programming, full-stack development, and preparing students for top tech careers.",
    eligibility: "Open to all students who love solving puzzles, coding, system design, or organizing technical hackathons.",
    roles: ["Development", "Competitive Programming", "Design & Visuals", "Event Operations"],
    recruitmentOpen: true,
    recruitmentDeadline: "2026-09-28",
    foundedYear: 2016,
    membersCount: "280+",
    meetingSchedule: "Thursdays 5:00 PM · APJ Lab 1",
    tags: ["DSA", "CompetitiveCoding", "FullStack", "Algorithms", "OpenSource"],
    socials: {
      instagram: "https://instagram.com/tds_nsut",
      linkedin: "https://linkedin.com/company/tds-nsut",
      github: "https://github.com/the-debugging-society",
      discord: "https://discord.gg/tdsnsut",
    },
    leads: [
      { name: "Aditya Singhal", role: "President", contact: "lead@tdsnsut.in" },
      { name: "Nisha Gupta", role: "CP Lead", contact: "cp@tdsnsut.in" },
    ],
    flagshipEvents: [
      { name: "CodeBreak Contest", desc: "Monthly timed algorithmic contest hosted on Codeforces / CodeChef." },
      { name: "HackDebug 4.0", desc: "Flagship 24-hour development hackathon with sponsor problem statements." },
      { name: "0-to-1 Web Workshop", desc: "Fast-track onboarding series teaching modern full-stack web engineering." },
    ],
    interviewProcess: [
      { step: 1, title: "Online Registration", detail: "Basic profile and problem-solving links (LeetCode/Codeforces/GitHub)." },
      { step: 2, title: "Contest / Task Round", detail: "Short 90-minute coding challenge or frontend design task." },
      { step: 3, title: "Personal Interview", detail: "Code walkthrough and chat about your aspirations." },
    ],
    faqs: [
      { q: "Do I need a high rating on Codeforces to get in?", a: "No, enthusiasm for learning algorithmic concepts and practicing consistently matters far more." },
      { q: "Does TDS teach development from scratch?", a: "Yes! We run dedicated peer-mentorship cohorts every semester for juniors." },
    ],
  },

  {
    id: "dcode",
    name: "DCode",
    fullName: "DCode Programming Society",
    category: "Tech",
    logo: "/logos/dcode.png",
    tagline: "Code your way forward.",
    description:
      "A fast-growing community focused on competitive programming, modern software craftsmanship, web development, and open tech discussions.",
    eligibility: "Open to anyone with an appetite for coding, whether you wrote your first 'Hello World' yesterday or built apps in high school.",
    roles: ["Full Stack Development", "Competitive Programming", "Content & Editorial", "Social Media & Design"],
    recruitmentOpen: true,
    recruitmentDeadline: "2026-09-30",
    foundedYear: 2019,
    membersCount: "210+",
    meetingSchedule: "Fridays 4:30 PM · Student Center Room 3",
    tags: ["Coding", "React", "Python", "ProblemSolving", "Git"],
    socials: {
      instagram: "https://instagram.com/dcode_nsut",
      linkedin: "https://linkedin.com/company/dcode-nsut",
      github: "https://github.com/dcode-nsut",
      discord: "https://discord.gg/dcode",
    },
    leads: [
      { name: "Devansh Patel", role: "Lead Organizer", contact: "contact@dcode.dev" },
      { name: "Ananya Roy", role: "Curator", contact: "ananya@dcode.dev" },
    ],
    flagshipEvents: [
      { name: "ByteCraft", desc: "Rapid prototyping tournament combining UI design and frontend implementation." },
      { name: "Junior Code Sprint", desc: "Dedicated beginner-friendly coding contest for freshers." },
    ],
    interviewProcess: [
      { step: 1, title: "Application Form", detail: "Short form highlighting your background and curiosity." },
      { step: 2, title: "Mini Project / Quiz", detail: "Take-home practical assignment with 3 days window." },
      { step: 3, title: "Team Connect", detail: "Friendly 15-minute chat with the mentors." },
    ],
    faqs: [
      { q: "Can non-CS students join DCode?", a: "Absolutely! More than 40% of our active contributors are from Electrical, Instrumentation, and Mechanical branches." },
    ],
  },

  {
    id: "literary",
    name: "Literary Society",
    fullName: "Shubhasha — The Literary Society",
    category: "Literary",
    logo: "/logos/literary.png",
    tagline: "Ideas. Words. Expression.",
    description:
      "A dynamic creative enclave for writers, poets, debaters, podcasters, and public speakers. We curate campus magazines, organize parliamentary debates, slam poetry nights, and literary fests.",
    eligibility: "Open to wordsmiths, debaters, thinkers, quizzers, and anyone who loves stories and constructive discourse.",
    roles: ["Creative Writing & Poetry", "Parliamentary Debate", "Editorial & Publishing", "Podcast & Public Speaking"],
    recruitmentOpen: true,
    recruitmentDeadline: "2026-09-24",
    foundedYear: 2011,
    membersCount: "190+",
    meetingSchedule: "Tuesdays & Thursdays 5:00 PM · Amphitheatre lawn",
    tags: ["Debate", "Writing", "Poetry", "PublicSpeaking", "Publishing"],
    socials: {
      instagram: "https://instagram.com/shubhasha_lit",
      linkedin: "https://linkedin.com/company/shubhasha-lit",
      github: "https://github.com/shubhasha-archive",
      discord: "https://discord.gg/shubhasha",
    },
    leads: [
      { name: "Ishaan Taneja", role: "President", contact: "president@shubhasha.org" },
      { name: "Kavya Nambiar", role: "Editor-in-Chief", contact: "editor@shubhasha.org" },
    ],
    flagshipEvents: [
      { name: "Colloquium Parliamentary Debate", desc: "National level Asian Parliamentary Debate attracting 40+ premier colleges." },
      { name: "The Open Mic Slam", desc: "Intimate evening of spoken word poetry, storytelling, and acoustic music under the campus lights." },
      { name: "Annual Anthology 'Srijan'", desc: "Printed campus magazine featuring prose, poems, and artwork from the student body." },
    ],
    interviewProcess: [
      { step: 1, title: "Written Pitch & Sample", detail: "Submit a short writing sample or debate experience brief." },
      { step: 2, title: "Audition / Mock Debate", detail: "Spontaneous prompt debate or poetry reading." },
      { step: 3, title: "Personal Interaction", detail: "Discussion with editorial heads." },
    ],
    faqs: [
      { q: "Can I write in both Hindi and English?", a: "Yes! Shubhasha actively supports bilingual expression in both Hindi and English." },
      { q: "What if I have stage fright?", a: "We have dedicated writing and editorial roles, plus workshop sessions specifically designed to build speaking confidence." },
    ],
  },

  {
    id: "sports",
    name: "Sports Committee",
    fullName: "Venatus Sports & Athletics Society",
    category: "Sports",
    logo: "/logos/sports.png",
    tagline: "Play together. Grow together.",
    description:
      "The pulse of campus fitness and competitive sports. We manage collegiate teams, organize intra-college athletic leagues, e-sports showdowns, and represent the institute in university tournaments.",
    eligibility: "Open to athletes, casual fitness lovers, team managers, live commentators, and event organizers.",
    roles: ["Sports Event Operations", "Team Management & Logistics", "Media & Live Coverage", "Fitness & Athletics Lead"],
    recruitmentOpen: true,
    recruitmentDeadline: "2026-09-29",
    foundedYear: 2014,
    membersCount: "320+",
    meetingSchedule: "Monday & Friday Evenings · Sports Complex Ground",
    tags: ["Athletics", "Football", "Cricket", "Basketball", "Esports", "Operations"],
    socials: {
      instagram: "https://instagram.com/venatus_sports",
      linkedin: "https://linkedin.com/company/venatus-sports",
      github: "https://github.com/venatus-scoreboard",
      discord: "https://discord.gg/venatus",
    },
    leads: [
      { name: "Kabir Randhawa", role: "Sports Secretary", contact: "sports@venatus.org" },
      { name: "Simran Kaur", role: "Operations Lead", contact: "simran@venatus.org" },
    ],
    flagshipEvents: [
      { name: "Khel Mahotsav", desc: "Week-long intra-college sports festival across 12 disciplines with 1500+ participants." },
      { name: "Campus Premier League (CPL)", desc: "Auction-based cricket and football tournament with student and faculty franchises." },
      { name: "Night Turf Showdown", desc: "Floodlit 5-a-side football tournament under the floodlights." },
    ],
    interviewProcess: [
      { step: 1, title: "Registration", detail: "Share your sporting background or event management interest." },
      { step: 2, title: "Physical Trials / Ops Task", detail: "Field trial for players or scenario-based logistics test for management applicants." },
      { step: 3, title: "Final Discussion", detail: "Quick alignment with sports captains." },
    ],
    faqs: [
      { q: "Do I have to be a competitive athlete to join?", a: "No! Nearly half of our team runs event logistics, media broadcasts, sponsorships, and tournament fixtures." },
      { q: "Does Venatus cover esports too?", a: "Yes, we host sanctioned Valorant, BGMI, and FIFA campus championships." },
    ],
  },
];

export default societies;
