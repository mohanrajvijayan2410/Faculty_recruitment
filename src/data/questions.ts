export interface MCQQuestion {
  id: number;
  question: string;
  options: string[];
  correct: number; // index
}

export interface Subject {
  id: string;
  name: string;
  icon: string;
  questions: MCQQuestion[];
}

export const subjects: Subject[] = [
  {
    id: "programming",
    name: "Programming",
    icon: "💻",
    questions: [
      { id: 1, question: "Which of the following is not a programming paradigm?", options: ["Object-Oriented", "Functional", "Structural", "Relational"], correct: 3 },
      { id: 2, question: "What is the time complexity of binary search?", options: ["O(n)", "O(log n)", "O(n²)", "O(1)"], correct: 1 },
      { id: 3, question: "Which keyword is used to define a class in Python?", options: ["class", "def", "struct", "object"], correct: 0 },
      { id: 4, question: "What does OOP stand for?", options: ["Object-Oriented Programming", "Object-Order Processing", "Open-Oriented Protocol", "Operational Object Programming"], correct: 0 },
      { id: 5, question: "Which data type is immutable in Python?", options: ["List", "Dictionary", "Set", "Tuple"], correct: 3 },
      { id: 6, question: "What is polymorphism?", options: ["Multiple inheritance", "Method with same name behaving differently", "Data hiding", "Code reuse"], correct: 1 },
      { id: 7, question: "Which is not a valid access modifier in Java?", options: ["public", "private", "protected", "friend"], correct: 3 },
      { id: 8, question: "What is recursion?", options: ["A loop", "Function calling itself", "Exception handling", "Memory management"], correct: 1 },
      { id: 9, question: "Which sorting algorithm has best average case?", options: ["Bubble Sort", "Quick Sort", "Selection Sort", "Insertion Sort"], correct: 1 },
      { id: 10, question: "What is an abstract class?", options: ["Class with no methods", "Class that cannot be instantiated", "Class with only static methods", "Final class"], correct: 1 },
    ],
  },
  {
    id: "data-structures",
    name: "Data Structures",
    icon: "🏗️",
    questions: [
      { id: 1, question: "Which data structure uses FIFO?", options: ["Stack", "Queue", "Tree", "Graph"], correct: 1 },
      { id: 2, question: "What is the worst case for searching in a BST?", options: ["O(log n)", "O(n)", "O(n²)", "O(1)"], correct: 1 },
      { id: 3, question: "Which data structure is used in BFS?", options: ["Stack", "Queue", "Heap", "Array"], correct: 1 },
      { id: 4, question: "What is a complete binary tree?", options: ["All levels filled except possibly last", "All nodes have 2 children", "Height is log n", "Balanced tree"], correct: 0 },
      { id: 5, question: "Hash table collision can be resolved by?", options: ["Chaining", "Sorting", "Recursion", "Backtracking"], correct: 0 },
      { id: 6, question: "Which is not a linear data structure?", options: ["Array", "Linked List", "Tree", "Stack"], correct: 2 },
      { id: 7, question: "What is the height of a balanced BST with n nodes?", options: ["O(n)", "O(log n)", "O(n²)", "O(1)"], correct: 1 },
      { id: 8, question: "Postfix expression is evaluated using?", options: ["Queue", "Stack", "Tree", "Graph"], correct: 1 },
      { id: 9, question: "Which traversal gives sorted order in BST?", options: ["Preorder", "Postorder", "Inorder", "Level order"], correct: 2 },
      { id: 10, question: "A graph with no cycles is called?", options: ["Tree", "Forest", "DAG", "All of the above"], correct: 3 },
    ],
  },
  {
    id: "database",
    name: "Database Systems",
    icon: "🗄️",
    questions: [
      { id: 1, question: "Which normal form removes transitive dependency?", options: ["1NF", "2NF", "3NF", "BCNF"], correct: 2 },
      { id: 2, question: "ACID stands for?", options: ["Atomicity, Consistency, Isolation, Durability", "Access, Control, Integrity, Data", "Atomic, Concurrent, Isolated, Durable", "None"], correct: 0 },
      { id: 3, question: "Which SQL command is used to remove a table?", options: ["DELETE", "REMOVE", "DROP", "TRUNCATE"], correct: 2 },
      { id: 4, question: "A foreign key references?", options: ["Primary key of another table", "Any column", "Index", "View"], correct: 0 },
      { id: 5, question: "Which join returns all rows from both tables?", options: ["Inner Join", "Left Join", "Right Join", "Full Outer Join"], correct: 3 },
      { id: 6, question: "What is a view in SQL?", options: ["Physical table", "Virtual table", "Index", "Trigger"], correct: 1 },
      { id: 7, question: "Which is a NoSQL database?", options: ["MySQL", "PostgreSQL", "MongoDB", "Oracle"], correct: 2 },
      { id: 8, question: "Deadlock occurs when?", options: ["Two transactions wait for each other", "Table is full", "Index fails", "Query is slow"], correct: 0 },
      { id: 9, question: "What is indexing used for?", options: ["Security", "Faster retrieval", "Data backup", "Normalization"], correct: 1 },
      { id: 10, question: "Which command is used to add data?", options: ["INSERT", "ADD", "APPEND", "CREATE"], correct: 0 },
    ],
  },
  {
    id: "networks",
    name: "Computer Networks",
    icon: "🌐",
    questions: [
      { id: 1, question: "Which layer is responsible for routing?", options: ["Data Link", "Network", "Transport", "Application"], correct: 1 },
      { id: 2, question: "TCP is a __ protocol?", options: ["Connectionless", "Connection-oriented", "Stateless", "None"], correct: 1 },
      { id: 3, question: "What is the default port for HTTP?", options: ["21", "25", "80", "443"], correct: 2 },
      { id: 4, question: "Which protocol is used for email?", options: ["FTP", "SMTP", "HTTP", "DNS"], correct: 1 },
      { id: 5, question: "IP address belongs to which layer?", options: ["Physical", "Data Link", "Network", "Transport"], correct: 2 },
      { id: 6, question: "What does DNS stand for?", options: ["Domain Name System", "Data Network Service", "Digital Name Server", "Domain Network System"], correct: 0 },
      { id: 7, question: "Which topology has a central hub?", options: ["Bus", "Ring", "Star", "Mesh"], correct: 2 },
      { id: 8, question: "UDP is used for?", options: ["Reliable transfer", "Fast unreliable transfer", "Encryption", "Routing"], correct: 1 },
      { id: 9, question: "Subnet mask is used for?", options: ["Encryption", "Network division", "Routing", "Both B and C"], correct: 3 },
      { id: 10, question: "Which device operates at Layer 2?", options: ["Router", "Switch", "Hub", "Repeater"], correct: 1 },
    ],
  },
  {
    id: "os",
    name: "Operating Systems",
    icon: "⚙️",
    questions: [
      { id: 1, question: "Which scheduling algorithm is non-preemptive?", options: ["Round Robin", "SJF", "FCFS", "Priority"], correct: 2 },
      { id: 2, question: "What is thrashing?", options: ["CPU overuse", "Excessive paging", "Disk failure", "Memory leak"], correct: 1 },
      { id: 3, question: "Semaphore is used for?", options: ["Memory management", "Process synchronization", "File management", "Disk scheduling"], correct: 1 },
      { id: 4, question: "Which is not a process state?", options: ["Ready", "Running", "Blocked", "Compiled"], correct: 3 },
      { id: 5, question: "Virtual memory uses?", options: ["RAM only", "Disk as extension of RAM", "Cache", "Registers"], correct: 1 },
      { id: 6, question: "What is a deadlock?", options: ["Fast processing", "Circular wait among processes", "Memory overflow", "CPU idle"], correct: 1 },
      { id: 7, question: "Page replacement algorithm LRU stands for?", options: ["Last Recently Used", "Least Recently Used", "Latest Resource Utility", "None"], correct: 1 },
      { id: 8, question: "Fork() system call creates?", options: ["Thread", "Process", "File", "Signal"], correct: 1 },
      { id: 9, question: "Which is not a disk scheduling algorithm?", options: ["FCFS", "SSTF", "SCAN", "SJF"], correct: 3 },
      { id: 10, question: "Kernel is?", options: ["Hardware", "Core of OS", "Application", "Driver"], correct: 1 },
    ],
  },
  {
    id: "ai",
    name: "Artificial Intelligence",
    icon: "🤖",
    questions: [
      { id: 1, question: "Which is a supervised learning algorithm?", options: ["K-Means", "Linear Regression", "PCA", "Apriori"], correct: 1 },
      { id: 2, question: "What does NLP stand for?", options: ["Natural Language Processing", "Neural Learning Process", "Network Layer Protocol", "None"], correct: 0 },
      { id: 3, question: "Backpropagation is used in?", options: ["Decision Trees", "Neural Networks", "SVM", "KNN"], correct: 1 },
      { id: 4, question: "Which is an activation function?", options: ["ReLU", "SQL", "HTTP", "TCP"], correct: 0 },
      { id: 5, question: "Overfitting means?", options: ["Model too simple", "Model memorizes training data", "Model is perfect", "Model underfits"], correct: 1 },
      { id: 6, question: "What is a perceptron?", options: ["Database", "Single layer neural network", "Search algorithm", "Sorting method"], correct: 1 },
      { id: 7, question: "Random Forest is an example of?", options: ["Boosting", "Bagging", "Stacking", "Clustering"], correct: 1 },
      { id: 8, question: "Which search is uninformed?", options: ["A*", "BFS", "Hill Climbing", "Best First"], correct: 1 },
      { id: 9, question: "CNN is primarily used for?", options: ["Text", "Images", "Audio", "Graphs"], correct: 1 },
      { id: 10, question: "Turing Test measures?", options: ["Speed", "Machine intelligence", "Memory", "Accuracy"], correct: 1 },
    ],
  },
  {
    id: "se",
    name: "Software Engineering",
    icon: "📐",
    questions: [
      { id: 1, question: "Which is not a SDLC model?", options: ["Waterfall", "Agile", "Spiral", "Binary"], correct: 3 },
      { id: 2, question: "Unit testing tests?", options: ["Whole system", "Individual modules", "Integration", "UI"], correct: 1 },
      { id: 3, question: "What is coupling?", options: ["Dependency between modules", "Cohesion", "Testing", "Design"], correct: 0 },
      { id: 4, question: "UML stands for?", options: ["Unified Modeling Language", "Universal Machine Language", "User Model Logic", "None"], correct: 0 },
      { id: 5, question: "Which is a project management tool?", options: ["JIRA", "MySQL", "Linux", "Python"], correct: 0 },
      { id: 6, question: "Black box testing focuses on?", options: ["Code structure", "Input/Output", "Database", "Network"], correct: 1 },
      { id: 7, question: "What is refactoring?", options: ["Adding features", "Restructuring code without changing behavior", "Bug fixing", "Testing"], correct: 1 },
      { id: 8, question: "Scrum is a type of?", options: ["Waterfall", "Agile framework", "Testing", "Design pattern"], correct: 1 },
      { id: 9, question: "SRS stands for?", options: ["Software Requirement Specification", "System Resource Setup", "Software Runtime System", "None"], correct: 0 },
      { id: 10, question: "Version control is done using?", options: ["Git", "SQL", "HTML", "CSS"], correct: 0 },
    ],
  },
  {
    id: "web",
    name: "Web Technologies",
    icon: "🕸️",
    questions: [
      { id: 1, question: "HTML stands for?", options: ["HyperText Markup Language", "High Text Machine Language", "HyperText Machine Logic", "None"], correct: 0 },
      { id: 2, question: "Which is a CSS framework?", options: ["React", "Bootstrap", "Node.js", "MongoDB"], correct: 1 },
      { id: 3, question: "JavaScript is a __ language?", options: ["Compiled", "Interpreted", "Assembly", "Machine"], correct: 1 },
      { id: 4, question: "REST API uses which protocol?", options: ["FTP", "HTTP", "SMTP", "TCP"], correct: 1 },
      { id: 5, question: "Which is a frontend framework?", options: ["Django", "Flask", "React", "Express"], correct: 2 },
      { id: 6, question: "What does JSON stand for?", options: ["JavaScript Object Notation", "Java Source Object Network", "JSON Simple Object", "None"], correct: 0 },
      { id: 7, question: "Which tag is used for links in HTML?", options: ["<link>", "<a>", "<href>", "<url>"], correct: 1 },
      { id: 8, question: "Node.js is based on?", options: ["Python", "V8 Engine", "JVM", "CLR"], correct: 1 },
      { id: 9, question: "Which HTTP method is used to update?", options: ["GET", "POST", "PUT", "DELETE"], correct: 2 },
      { id: 10, question: "WebSocket provides?", options: ["One-way communication", "Full-duplex communication", "No communication", "Half-duplex"], correct: 1 },
    ],
  },
];

export interface PsychometricQuestion {
  id: number;
  question: string;
  category: string;
  options?: string[];
  correct?: number;
}

export const psychometricQuestions: PsychometricQuestion[] = [
  { id: 1, question: "I enjoy explaining complex concepts to students in multiple ways until they understand.", category: "Teaching" },
  { id: 2, question: "I remain calm and composed when students challenge my viewpoint in class.", category: "Stress Management" },
  { id: 3, question: "I believe in adapting my teaching methods based on student feedback.", category: "Student Interaction" },
  { id: 4, question: "I can handle multiple responsibilities simultaneously without feeling overwhelmed.", category: "Stress Management" },
  { id: 5, question: "I proactively mentor students beyond the curriculum requirements.", category: "Student Interaction" },
  { id: 6, question: "I take initiative in organizing academic events and workshops.", category: "Leadership" },
  { id: 7, question: "I believe academic integrity should never be compromised regardless of circumstances.", category: "Ethics" },
  { id: 8, question: "I am comfortable with peer review and constructive criticism of my work.", category: "Classroom Behavior" },
  { id: 9, question: "I actively participate in faculty development programs.", category: "Leadership" },
  { id: 10, question: "I would report a colleague's unethical behavior even if they are a friend.", category: "Ethics" },
  { id: 11, question: "I encourage students to think critically rather than memorize answers.", category: "Teaching" },
  { id: 12, question: "I maintain professional boundaries while being approachable to students.", category: "Student Interaction" },
  { id: 13, question: "I can effectively manage a classroom with diverse learning abilities.", category: "Classroom Behavior" },
  { id: 14, question: "I believe in continuous research alongside teaching responsibilities.", category: "Leadership" },
  { id: 15, question: "I handle disagreements with administration diplomatically and professionally.", category: "Stress Management" },
  { id: 16, question: "I regularly update my course material with the latest developments.", category: "Teaching" },
  { id: 17, question: "I am comfortable using technology-enhanced learning tools.", category: "Classroom Behavior" },
  { id: 18, question: "I treat all students equally regardless of their background.", category: "Ethics" },
  { id: 19, question: "I can effectively lead a team of junior faculty members.", category: "Leadership" },
  { id: 20, question: "I maintain emotional stability during examination and evaluation periods.", category: "Stress Management" },
];

export const jobOpenings = [
  { id: 1, department: "Artificial Intelligence & Data Science", qualification: "Ph.D./M.Tech in AI, Data Science, or related field", experience: "2+ years teaching or research experience", skills: ["machine learning", "data science", "deep learning", "python", "analytics", "ai ethics"] },
  { id: 2, department: "Electronics & Communication", qualification: "Ph.D./M.Tech in ECE or related field", experience: "3+ years teaching experience", skills: ["signal processing", "vlsi", "embedded systems", "communication", "circuits", "microprocessor"] },
  { id: 3, department: "Information Technology", qualification: "Ph.D./M.Tech in IT or related field", experience: "2+ years teaching experience", skills: ["web development", "networking", "database", "cloud computing", "security", "javascript"] },
  { id: 4, department: "Computer Science", qualification: "Ph.D./M.Tech in Computer Science or related field", experience: "3+ years teaching experience", skills: ["programming", "algorithms", "data structures", "machine learning", "python", "java"] },
  { id: 5, department: "Electrical & Electronics Engineering", qualification: "Ph.D./M.Tech in EEE or related field", experience: "3+ years teaching experience", skills: ["power systems", "electrical machines", "control systems", "circuits", "renewable energy", "measurements"] },
  { id: 6, department: "Mechanical Engineering", qualification: "Ph.D./M.Tech in Mechanical Engineering", experience: "3+ years teaching experience", skills: ["thermodynamics", "fluid mechanics", "manufacturing", "cad", "materials", "design"] },
  { id: 7, department: "Civil Engineering", qualification: "Ph.D./M.Tech in Civil Engineering", experience: "3+ years teaching experience", skills: ["structural engineering", "surveying", "geotechnical", "transportation", "construction", "environmental engineering"] },
  { id: 8, department: "Chemistry", qualification: "Ph.D./M.Sc. in Chemistry or related field", experience: "2+ years teaching experience", skills: ["organic chemistry", "inorganic chemistry", "physical chemistry", "lab instruction", "materials", "research"] },
  { id: 9, department: "Mathematics", qualification: "Ph.D./M.Sc. in Mathematics", experience: "2+ years teaching experience", skills: ["calculus", "linear algebra", "statistics", "probability", "discrete mathematics", "numerical methods"] },
  { id: 10, department: "Physics", qualification: "Ph.D./M.Sc. in Physics or related field", experience: "2+ years teaching experience", skills: ["mechanics", "electromagnetism", "quantum physics", "optics", "lab instruction", "research"] },
];
