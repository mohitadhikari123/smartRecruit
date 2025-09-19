// Sample resume texts for different job roles
export const getSampleResumeTitles = () => {
  return [
    "Software Engineer Resume",
    "Data Scientist Resume", 
    "Product Manager Resume",
    "UX Designer Resume",
    "Marketing Manager Resume",
    "Sales Representative Resume",
    "DevOps Engineer Resume",
    "Frontend Developer Resume",
    "Backend Developer Resume",
    "Full Stack Developer Resume",
    "Business Analyst Resume",
    "Project Manager Resume"
  ];
};

export const getSampleResumeText = (title) => {
  const resumeTexts = {
    "Software Engineer Resume": `John Smith
Software Engineer
Email: john.smith@email.com | Phone: (555) 123-4567
LinkedIn: linkedin.com/in/johnsmith

PROFESSIONAL SUMMARY
Experienced software engineer with 5+ years of experience in full-stack development. 
Proficient in JavaScript, Python, React, Node.js, and cloud technologies. 
Passionate about building scalable applications and solving complex problems.

TECHNICAL SKILLS
• Programming Languages: JavaScript, Python, Java, TypeScript
• Frontend: React, Vue.js, HTML5, CSS3, Bootstrap
• Backend: Node.js, Express.js, Django, Flask
• Databases: MySQL, PostgreSQL, MongoDB, Redis
• Cloud: AWS, Azure, Docker, Kubernetes
• Tools: Git, Jenkins, JIRA, VS Code

EXPERIENCE
Senior Software Engineer | TechCorp Inc. | 2021 - Present
• Led development of microservices architecture serving 1M+ users
• Implemented CI/CD pipelines reducing deployment time by 60%
• Mentored junior developers and conducted code reviews
• Collaborated with cross-functional teams to deliver features on time

Software Engineer | StartupXYZ | 2019 - 2021
• Developed responsive web applications using React and Node.js
• Integrated third-party APIs and payment systems
• Optimized database queries improving performance by 40%
• Participated in agile development processes

EDUCATION
Bachelor of Science in Computer Science
University of Technology | 2015 - 2019
GPA: 3.8/4.0

PROJECTS
• E-commerce Platform: Full-stack application with React, Node.js, and MongoDB
• Task Management Tool: Real-time collaboration features using WebSockets
• API Gateway: Microservices architecture with load balancing and caching`,

    "Data Scientist Resume": `Sarah Johnson
Data Scientist
Email: sarah.johnson@email.com | Phone: (555) 987-6543
LinkedIn: linkedin.com/in/sarahjohnson

PROFESSIONAL SUMMARY
Data scientist with 4+ years of experience in machine learning, statistical analysis, 
and data visualization. Expert in Python, R, SQL, and cloud platforms. 
Passionate about extracting insights from complex datasets to drive business decisions.

TECHNICAL SKILLS
• Programming: Python, R, SQL, Scala
• Machine Learning: Scikit-learn, TensorFlow, PyTorch, XGBoost
• Data Visualization: Tableau, Power BI, Matplotlib, Seaborn
• Big Data: Spark, Hadoop, Kafka
• Cloud: AWS, GCP, Azure
• Databases: PostgreSQL, MongoDB, Redshift

EXPERIENCE
Senior Data Scientist | DataCorp Solutions | 2020 - Present
• Built ML models improving customer retention by 25%
• Led data pipeline development processing 10TB+ daily
• Collaborated with product teams to define success metrics
• Presented findings to C-level executives

Data Scientist | AnalyticsPro | 2019 - 2020
• Developed recommendation systems using collaborative filtering
• Created automated reporting dashboards in Tableau
• Performed A/B testing and statistical analysis
• Mentored junior data scientists

EDUCATION
Master of Science in Data Science
Stanford University | 2017 - 2019
Bachelor of Science in Mathematics
UC Berkeley | 2013 - 2017

CERTIFICATIONS
• AWS Certified Machine Learning - Specialty
• Google Cloud Professional Data Engineer`,

    "Product Manager Resume": `Michael Chen
Product Manager
Email: michael.chen@email.com | Phone: (555) 456-7890
LinkedIn: linkedin.com/in/michaelchen

PROFESSIONAL SUMMARY
Strategic product manager with 6+ years of experience leading cross-functional teams 
and driving product growth. Expert in agile methodologies, user research, and data analysis. 
Passionate about creating products that solve real user problems.

CORE COMPETENCIES
• Product Strategy & Roadmapping
• User Research & Analytics
• Agile/Scrum Methodologies
• A/B Testing & Experimentation
• Stakeholder Management
• Technical Communication

EXPERIENCE
Senior Product Manager | TechStart Inc. | 2021 - Present
• Led product strategy for mobile app with 2M+ active users
• Increased user engagement by 35% through feature optimization
• Managed $2M product budget and resource allocation
• Collaborated with engineering, design, and marketing teams

Product Manager | GrowthCorp | 2019 - 2021
• Launched 3 major product features resulting in 50% revenue growth
• Conducted user interviews and usability testing
• Defined product requirements and acceptance criteria
• Managed product backlog and sprint planning

EDUCATION
MBA in Technology Management
Wharton School | 2017 - 2019
Bachelor of Engineering in Computer Science
MIT | 2013 - 2017

ACHIEVEMENTS
• Product of the Year Award 2022
• Led team that achieved 200% of quarterly goals
• Speaker at ProductCon 2023`,

    "UX Designer Resume": `Emily Rodriguez
UX Designer
Email: emily.rodriguez@email.com | Phone: (555) 321-0987
Portfolio: emilyrodriguez.design

PROFESSIONAL SUMMARY
Creative UX designer with 5+ years of experience designing user-centered digital products. 
Expert in user research, prototyping, and design systems. Passionate about creating 
intuitive and accessible experiences that delight users.

DESIGN SKILLS
• User Research & Testing
• Wireframing & Prototyping
• Visual Design & Branding
• Design Systems
• Accessibility (WCAG)
• Design Thinking

TOOLS & TECHNOLOGIES
• Design: Figma, Sketch, Adobe Creative Suite, Principle
• Prototyping: InVision, Framer, Marvel
• Research: UserTesting, Maze, Hotjar
• Collaboration: Miro, Notion, Slack

EXPERIENCE
Senior UX Designer | DesignStudio | 2021 - Present
• Led UX design for enterprise SaaS platform with 100K+ users
• Improved user task completion rate by 40% through design optimization
• Established design system and component library
• Mentored junior designers and conducted design reviews

UX Designer | CreativeAgency | 2019 - 2021
• Designed mobile and web applications for 20+ clients
• Conducted user interviews and usability testing sessions
• Created wireframes, prototypes, and high-fidelity designs
• Collaborated with developers to ensure design implementation

EDUCATION
Master of Fine Arts in Interaction Design
Art Center College of Design | 2017 - 2019
Bachelor of Arts in Psychology
UCLA | 2013 - 2017

AWARDS
• Best UX Design - Webby Awards 2022
• Design Excellence Award - Adobe Creative Jam 2021`,

    "Marketing Manager Resume": `David Kim
Marketing Manager
Email: david.kim@email.com | Phone: (555) 654-3210
LinkedIn: linkedin.com/in/davidkim

PROFESSIONAL SUMMARY
Results-driven marketing manager with 7+ years of experience in digital marketing, 
brand management, and campaign optimization. Expert in data analytics, content strategy, 
and team leadership. Passionate about driving growth through innovative marketing strategies.

CORE COMPETENCIES
• Digital Marketing & SEO/SEM
• Content Strategy & Creation
• Social Media Marketing
• Email Marketing & Automation
• Data Analytics & Reporting
• Team Leadership & Management

EXPERIENCE
Senior Marketing Manager | GrowthMarketing Co. | 2020 - Present
• Increased lead generation by 150% through integrated marketing campaigns
• Managed $1M+ annual marketing budget across multiple channels
• Led team of 8 marketing professionals
• Developed and executed go-to-market strategies for new products

Marketing Manager | BrandCorp | 2018 - 2020
• Launched successful product campaigns resulting in 200% sales increase
• Managed social media presence across 5 platforms with 500K+ followers
• Optimized email marketing campaigns achieving 25% open rates
• Collaborated with sales team to align marketing and sales objectives

EDUCATION
Master of Business Administration
Kellogg School of Management | 2016 - 2018
Bachelor of Arts in Communications
Northwestern University | 2012 - 2016

CERTIFICATIONS
• Google Analytics Certified
• HubSpot Content Marketing Certified
• Facebook Blueprint Certified`,

    "Sales Representative Resume": `Lisa Thompson
Sales Representative
Email: lisa.thompson@email.com | Phone: (555) 789-0123
LinkedIn: linkedin.com/in/lisathompson

PROFESSIONAL SUMMARY
Top-performing sales representative with 6+ years of experience in B2B sales, 
account management, and customer relationship building. Consistently exceeded quotas 
by 120%+ and maintained high customer satisfaction ratings.

CORE COMPETENCIES
• B2B Sales & Account Management
• CRM Systems (Salesforce, HubSpot)
• Lead Generation & Prospecting
• Negotiation & Closing
• Customer Relationship Management
• Sales Forecasting & Reporting

EXPERIENCE
Senior Sales Representative | SalesPro Inc. | 2021 - Present
• Exceeded annual sales quota by 150% ($2.5M in revenue)
• Managed portfolio of 50+ enterprise clients
• Generated 200+ qualified leads through strategic prospecting
• Mentored 3 junior sales representatives

Sales Representative | TechSales Corp | 2019 - 2021
• Consistently ranked in top 10% of sales team
• Closed deals worth $1.8M in total contract value
• Developed and maintained relationships with key decision makers
• Participated in trade shows and industry conferences

EDUCATION
Bachelor of Business Administration
University of Texas | 2013 - 2017
Major: Marketing | Minor: Psychology

ACHIEVEMENTS
• Sales Representative of the Year 2022
• President's Club Member (Top 5% of sales force)
• 100% Customer Satisfaction Rating`,

    "DevOps Engineer Resume": `Alex Martinez
DevOps Engineer
Email: alex.martinez@email.com | Phone: (555) 147-2580
LinkedIn: linkedin.com/in/alexmartinez

PROFESSIONAL SUMMARY
DevOps engineer with 5+ years of experience in cloud infrastructure, automation, 
and CI/CD pipelines. Expert in AWS, Docker, Kubernetes, and infrastructure as code. 
Passionate about improving deployment efficiency and system reliability.

TECHNICAL SKILLS
• Cloud Platforms: AWS, Azure, GCP
• Containerization: Docker, Kubernetes, Helm
• Infrastructure as Code: Terraform, CloudFormation
• CI/CD: Jenkins, GitLab CI, GitHub Actions
• Monitoring: Prometheus, Grafana, ELK Stack
• Scripting: Python, Bash, PowerShell

EXPERIENCE
Senior DevOps Engineer | CloudTech Solutions | 2021 - Present
• Designed and implemented multi-cloud infrastructure serving 10M+ users
• Reduced deployment time by 70% through automation
• Led migration of legacy systems to cloud-native architecture
• Implemented comprehensive monitoring and alerting systems

DevOps Engineer | StartupScale | 2019 - 2021
• Built CI/CD pipelines for microservices architecture
• Automated infrastructure provisioning using Terraform
• Implemented container orchestration with Kubernetes
• Collaborated with development teams to improve deployment processes

EDUCATION
Bachelor of Science in Computer Engineering
Georgia Tech | 2015 - 2019

CERTIFICATIONS
• AWS Certified Solutions Architect - Professional
• Certified Kubernetes Administrator (CKA)
• HashiCorp Certified: Terraform Associate`,

    "Frontend Developer Resume": `Jessica Wang
Frontend Developer
Email: jessica.wang@email.com | Phone: (555) 369-2580
Portfolio: jessicawang.dev

PROFESSIONAL SUMMARY
Creative frontend developer with 4+ years of experience building responsive, 
user-friendly web applications. Expert in React, Vue.js, and modern JavaScript. 
Passionate about creating pixel-perfect designs and optimal user experiences.

TECHNICAL SKILLS
• Frontend: React, Vue.js, Angular, JavaScript (ES6+)
• Styling: CSS3, Sass, Styled Components, Tailwind CSS
• Build Tools: Webpack, Vite, Parcel
• Testing: Jest, Cypress, React Testing Library
• Version Control: Git, GitHub, GitLab

EXPERIENCE
Senior Frontend Developer | WebCraft Studio | 2021 - Present
• Led frontend development for e-commerce platform with 500K+ users
• Improved page load speed by 50% through performance optimization
• Implemented responsive design across all device types
• Mentored junior developers and conducted code reviews

Frontend Developer | DigitalAgency | 2019 - 2021
• Developed 20+ client websites using React and Vue.js
• Collaborated with designers to implement pixel-perfect UIs
• Integrated third-party APIs and payment systems
• Participated in agile development processes

EDUCATION
Bachelor of Science in Computer Science
UC Berkeley | 2015 - 2019

PROJECTS
• Personal Portfolio: Built with React and Three.js
• Task Management App: Real-time collaboration features
• Weather Dashboard: Responsive design with data visualization`,

    "Backend Developer Resume": `Robert Taylor
Backend Developer
Email: robert.taylor@email.com | Phone: (555) 852-0741
LinkedIn: linkedin.com/in/roberttaylor

PROFESSIONAL SUMMARY
Backend developer with 5+ years of experience building scalable APIs and microservices. 
Expert in Node.js, Python, and cloud technologies. Passionate about writing clean, 
efficient code and designing robust system architectures.

TECHNICAL SKILLS
• Backend: Node.js, Python, Java, Go
• Frameworks: Express.js, Django, Spring Boot, Gin
• Databases: PostgreSQL, MongoDB, Redis, MySQL
• Cloud: AWS, Azure, Docker, Kubernetes
• APIs: REST, GraphQL, gRPC
• Testing: Jest, Pytest, Mocha

EXPERIENCE
Senior Backend Developer | APITech Corp | 2021 - Present
• Designed and implemented microservices architecture handling 1M+ requests/day
• Built RESTful APIs serving mobile and web applications
• Optimized database queries improving response time by 60%
• Led technical architecture decisions and code reviews

Backend Developer | DataFlow Inc | 2019 - 2021
• Developed data processing pipelines using Python and Apache Airflow
• Built real-time APIs using WebSockets and message queues
• Implemented authentication and authorization systems
• Collaborated with frontend team to define API contracts

EDUCATION
Master of Science in Software Engineering
Carnegie Mellon University | 2017 - 2019
Bachelor of Science in Computer Science
University of Michigan | 2013 - 2017

CERTIFICATIONS
• AWS Certified Developer - Associate
• MongoDB Certified Developer`,

    "Full Stack Developer Resume": `Maria Garcia
Full Stack Developer
Email: maria.garcia@email.com | Phone: (555) 963-8520
Portfolio: mariagarcia.dev

PROFESSIONAL SUMMARY
Versatile full stack developer with 6+ years of experience building end-to-end 
web applications. Expert in both frontend and backend technologies with strong 
problem-solving skills and attention to detail.

TECHNICAL SKILLS
• Frontend: React, Vue.js, HTML5, CSS3, JavaScript
• Backend: Node.js, Python, Express.js, Django
• Databases: PostgreSQL, MongoDB, Redis
• Cloud: AWS, Heroku, Vercel
• Tools: Git, Docker, VS Code, Postman

EXPERIENCE
Senior Full Stack Developer | TechUniverse | 2021 - Present
• Led development of complete web application from concept to deployment
• Built responsive frontend with React and modern CSS
• Developed RESTful APIs using Node.js and Express
• Implemented user authentication and data management systems

Full Stack Developer | WebSolutions | 2019 - 2021
• Developed 15+ full-stack applications for various clients
• Collaborated with designers to create pixel-perfect user interfaces
• Integrated third-party services and payment processing
• Maintained and updated existing applications

EDUCATION
Bachelor of Science in Computer Science
Stanford University | 2013 - 2017

PROJECTS
• Social Media Platform: Full-stack app with real-time features
• E-learning Platform: Interactive courses with progress tracking
• Task Management System: Team collaboration with file sharing`,

    "Business Analyst Resume": `Kevin Lee
Business Analyst
Email: kevin.lee@email.com | Phone: (555) 741-8520
LinkedIn: linkedin.com/in/kevinlee

PROFESSIONAL SUMMARY
Analytical business analyst with 5+ years of experience in requirements gathering, 
process improvement, and data analysis. Expert in translating business needs into 
technical solutions and driving organizational efficiency.

CORE COMPETENCIES
• Requirements Analysis & Documentation
• Process Mapping & Improvement
• Data Analysis & Visualization
• Stakeholder Management
• Agile Methodologies
• SQL & Database Queries

EXPERIENCE
Senior Business Analyst | BusinessTech Corp | 2021 - Present
• Led requirements gathering for enterprise software implementation
• Improved operational efficiency by 30% through process optimization
• Created comprehensive documentation and user guides
• Facilitated communication between business and technical teams

Business Analyst | ProcessPro Inc | 2019 - 2021
• Analyzed business processes and identified improvement opportunities
• Created detailed functional specifications for development teams
• Conducted user acceptance testing and training sessions
• Managed multiple projects simultaneously

EDUCATION
Master of Business Administration
Harvard Business School | 2017 - 2019
Bachelor of Science in Business Administration
University of Pennsylvania | 2013 - 2017

CERTIFICATIONS
• Certified Business Analysis Professional (CBAP)
• Agile Certified Practitioner (PMI-ACP)`,

    "Project Manager Resume": `Amanda Wilson
Project Manager
Email: amanda.wilson@email.com | Phone: (555) 258-0741
LinkedIn: linkedin.com/in/amandawilson

PROFESSIONAL SUMMARY
Results-oriented project manager with 7+ years of experience leading cross-functional 
teams and delivering complex projects on time and within budget. Expert in agile 
methodologies, risk management, and stakeholder communication.

CORE COMPETENCIES
• Project Planning & Execution
• Agile/Scrum Methodologies
• Risk Management & Mitigation
• Team Leadership & Development
• Stakeholder Communication
• Budget Management

EXPERIENCE
Senior Project Manager | ProjectSuccess Inc | 2021 - Present
• Led 15+ projects with total value of $10M+ across various industries
• Improved project delivery time by 25% through process optimization
• Managed teams of 10-20 professionals across multiple locations
• Implemented agile methodologies resulting in 40% faster delivery

Project Manager | TechProjects Corp | 2019 - 2021
• Successfully delivered 20+ software development projects
• Coordinated with development, design, and QA teams
• Managed project budgets ranging from $100K to $2M
• Conducted regular project reviews and stakeholder updates

EDUCATION
Master of Science in Project Management
George Washington University | 2017 - 2019
Bachelor of Arts in Business Administration
University of California | 2013 - 2017

CERTIFICATIONS
• Project Management Professional (PMP)
• Certified ScrumMaster (CSM)
• Agile Certified Practitioner (PMI-ACP)`
  };

  return resumeTexts[title] || "Resume text not found";
};
