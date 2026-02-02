// Pre-populated quiz questions for each topic - simplified structure
const quizzesData = {
  'eng-math': [
    {
      id: 'q1',
      question: 'What is the discriminant of the quadratic equation 3x² - 5x + 2 = 0?',
      options: ['1', '7', '-1', '25'],
      correctAnswer: 0,
      explanation: 'D = b² - 4ac = (-5)² - 4(3)(2) = 25 - 24 = 1',
    },
    {
      id: 'q2',
      question: 'If sin θ = 0.6 and cos θ = 0.8, what is sin(2θ)?',
      options: ['0.48', '0.96', '0.28', '1.4'],
      correctAnswer: 1,
      explanation: 'sin(2θ) = 2·sin θ·cos θ = 2(0.6)(0.8) = 0.96',
    },
    {
      id: 'q3',
      question: 'The derivative of x³ - 3x² + 2x is:',
      options: ['3x² - 6x + 2', '3x² - 6x', 'x⁴/4 - x³ + x²', '3x - 6'],
      correctAnswer: 0,
      explanation: 'd/dx(x³) = 3x², d/dx(-3x²) = -6x, d/dx(2x) = 2. Sum = 3x² - 6x + 2',
    },
    {
      id: 'q4',
      question: 'Evaluate: ∫(2x + 3)dx from 0 to 2',
      options: ['10', '8', '12', '14'],
      correctAnswer: 0,
      explanation: '∫(2x + 3)dx = x² + 3x. At x=2: 4 + 6 = 10. At x=0: 0. Result = 10',
    },
    {
      id: 'q5',
      question: 'What is log₁₀(1000)?',
      options: ['2', '3', '4', '10'],
      correctAnswer: 1,
      explanation: 'log₁₀(1000) = log₁₀(10³) = 3',
    },
  ],
  'hydraulics': [
    {
      id: 'h1',
      question: 'Water has a density of 1000 kg/m³. What is the pressure at a depth of 10 meters?',
      options: ['98.1 kPa', '100 kPa', '9.81 kPa', '981 kPa'],
      correctAnswer: 0,
      explanation: 'P = ρgh = 1000 × 9.81 × 10 = 98,100 Pa = 98.1 kPa',
    },
    {
      id: 'h2',
      question: 'According to continuity equation, if pipe diameter is halved, the velocity:',
      options: ['Doubles', 'Quadruples', 'Halves', 'Remains same'],
      correctAnswer: 1,
      explanation: 'A₁v₁ = A₂v₂. If d₂ = d₁/2, then A₂ = A₁/4, so v₂ = 4v₁',
    },
    {
      id: 'h3',
      question: 'In Bernoullis equation, P/ρg represents:',
      options: ['Velocity head', 'Pressure head', 'Elevation head', 'Total head'],
      correctAnswer: 1,
      explanation: 'P/ρg is the pressure head, representing energy per unit weight',
    },
    {
      id: 'h4',
      question: 'The Reynolds number that marks transition from laminar to turbulent is:',
      options: ['500', '2300', '4000', '10000'],
      correctAnswer: 1,
      explanation: 'Re < 2300 is laminar, Re > 4000 is turbulent, transition around 2300',
    },
    {
      id: 'h5',
      question: 'Mannings equation is used to calculate:',
      options: ['Pipe pressure', 'Open channel flow', 'Groundwater seepage', 'Wave height'],
      correctAnswer: 1,
      explanation: 'Mannings equation is for open channel flow calculations',
    },
  ],
  'reinforced-concrete': [
    {
      id: 'rc1',
      question: 'In NSCP, the strength reduction factor (φ) for flexure is:',
      options: ['0.65', '0.75', '0.85', '0.90'],
      correctAnswer: 3,
      explanation: 'For tension-controlled sections, φ = 0.90 per NSCP 2015',
    },
    {
      id: 'rc2',
      question: 'The minimum concrete cover for beams exposed to weather is:',
      options: ['20 mm', '40 mm', '50 mm', '75 mm'],
      correctAnswer: 1,
      explanation: 'Per NSCP, concrete exposed to weather requires 40mm min cover',
    },
    {
      id: 'rc3',
      question: 'In a singly reinforced beam, the neutral axis depth c is related to a by:',
      options: ['c = a', 'c = a/β₁', 'c = β₁·a', 'c = 2a'],
      correctAnswer: 1,
      explanation: 'a = β₁·c, therefore c = a/β₁ where β₁ depends on fc',
    },
    {
      id: 'rc4',
      question: 'The maximum steel ratio to ensure tension-controlled behavior is:',
      options: ['0.75ρb', '0.50ρb', '0.375ρb', '0.25ρb'],
      correctAnswer: 2,
      explanation: 'To ensure tension-controlled behavior, ρmax ≈ 0.375ρb',
    },
    {
      id: 'rc5',
      question: 'Development length is required to:',
      options: ['Prevent shear', 'Ensure steel-concrete bond', 'Control deflection', 'Reduce cracking'],
      correctAnswer: 1,
      explanation: 'Development length ensures adequate bond for full yield strength',
    },
  ],
  'theory-struct': [
    {
      id: 'ts1',
      question: 'A simply supported beam with roller and pin has how many reactions?',
      options: ['2', '3', '4', '6'],
      correctAnswer: 1,
      explanation: 'Pin has 2 reactions (H & V), roller has 1 (V). Total = 3',
    },
    {
      id: 'ts2',
      question: 'The degree of indeterminacy of a fixed-end beam is:',
      options: ['0', '1', '2', '3'],
      correctAnswer: 3,
      explanation: 'Fixed beam: r = 6, equations = 3. DI = 6 - 3 = 3',
    },
    {
      id: 'ts3',
      question: 'Moment distribution method is used to analyze:',
      options: ['Determinate structures', 'Indeterminate structures', 'Trusses only', 'Cables only'],
      correctAnswer: 1,
      explanation: 'Moment distribution is for indeterminate frame analysis',
    },
    {
      id: 'ts4',
      question: 'The carry-over factor for a prismatic member with far end fixed is:',
      options: ['0', '0.25', '0.5', '1.0'],
      correctAnswer: 2,
      explanation: 'For prismatic members with far end fixed, COF = 0.5',
    },
    {
      id: 'ts5',
      question: 'An influence line for reaction shows:',
      options: ['Actual reaction value', 'Maximum reaction', 'Reaction as unit load moves', 'Shear force'],
      correctAnswer: 2,
      explanation: 'Influence line shows how a response varies as unit load position changes',
    },
  ],
  'surveying': [
    {
      id: 's1',
      question: 'In differential leveling, the elevation of B is found by:',
      options: ['HI - FS', 'HI + BS', 'BS - FS', 'HI + FS'],
      correctAnswer: 0,
      explanation: 'Elev B = HI - FS, where HI = Elev A + BS (backsight)',
    },
    {
      id: 's2',
      question: 'The error in a closed traverse that doesnt close is called:',
      options: ['Systematic error', 'Random error', 'Error of closure', 'Blunder'],
      correctAnswer: 2,
      explanation: 'Error of closure is the difference between start and end coordinates',
    },
    {
      id: 's3',
      question: 'Stadia surveying uses the formula D = Ks + C, where K is typically:',
      options: ['1', '10', '100', '1000'],
      correctAnswer: 2,
      explanation: 'The stadia constant K is typically 100 for most instruments',
    },
  ],
  'eng-mech': [
    {
      id: 'em1',
      question: 'The resultant of two concurrent forces of 30N and 40N at right angles is:',
      options: ['10N', '50N', '70N', '35N'],
      correctAnswer: 1,
      explanation: 'R = √(30² + 40²) = √2500 = 50N',
    },
    {
      id: 'em2',
      question: 'A couple produces:',
      options: ['Only translation', 'Only rotation', 'Both', 'Neither'],
      correctAnswer: 1,
      explanation: 'A couple produces pure rotation with no translation',
    },
    {
      id: 'em3',
      question: 'The coefficient of friction μ is equal to:',
      options: ['F/N', 'N/F', 'F×N', 'F+N'],
      correctAnswer: 0,
      explanation: 'μ = F/N where F is friction force and N is normal force',
    },
  ],
  'strength-mat': [
    {
      id: 'sm1',
      question: 'Stress is defined as:',
      options: ['Force × Area', 'Force / Area', 'Force / Length', 'Force × Length'],
      correctAnswer: 1,
      explanation: 'Stress σ = P/A (Force per unit area)',
    },
    {
      id: 'sm2',
      question: 'Youngs modulus E has units of:',
      options: ['N', 'N/m', 'N/m²', 'Dimensionless'],
      correctAnswer: 2,
      explanation: 'E = σ/ε, and strain is dimensionless, so E has same units as stress',
    },
    {
      id: 'sm3',
      question: 'The section modulus S = I/c is used to calculate:',
      options: ['Shear stress', 'Bending stress', 'Torsional stress', 'Bearing stress'],
      correctAnswer: 1,
      explanation: 'Bending stress σ = M/S = Mc/I',
    },
  ],
  'diff-eq': [
    {
      id: 'de1',
      question: 'The order of differential equation dy/dx + y = x² is:',
      options: ['0', '1', '2', '3'],
      correctAnswer: 1,
      explanation: 'Order is the highest derivative present. dy/dx is first derivative',
    },
    {
      id: 'de2',
      question: 'The integrating factor for dy/dx + Py = Q is:',
      options: ['e^P', 'e^(∫Pdx)', 'P', '∫Pdx'],
      correctAnswer: 1,
      explanation: 'Integrating factor μ = e^(∫P dx) for first-order linear ODE',
    },
  ],
  'transpo-eng': [
    {
      id: 'te1',
      question: 'Superelevation is provided in highway curves to:',
      options: ['Increase speed', 'Counteract centrifugal force', 'Improve drainage', 'Reduce noise'],
      correctAnswer: 1,
      explanation: 'Superelevation helps counteract centrifugal force on curves',
    },
    {
      id: 'te2',
      question: 'Sight distance required to stop safely is called:',
      options: ['Passing sight distance', 'Stopping sight distance', 'Decision sight', 'Horizontal sight'],
      correctAnswer: 1,
      explanation: 'Stopping sight distance (SSD) is minimum required to stop',
    },
  ],
  'soil-mech': [
    {
      id: 'soil1',
      question: 'The void ratio e is defined as:',
      options: ['Vv/Vs', 'Vv/V', 'Vs/V', 'V/Vv'],
      correctAnswer: 0,
      explanation: 'Void ratio e = Volume of voids / Volume of solids = Vv/Vs',
    },
    {
      id: 'soil2',
      question: 'Standard Proctor test determines:',
      options: ['Shear strength', 'Permeability', 'Optimum moisture content', 'Consolidation'],
      correctAnswer: 2,
      explanation: 'Proctor test determines optimum moisture for max dry density',
    },
  ],
  'eng-econ': [
    {
      id: 'ee1',
      question: 'If P = 1000, i = 10%, n = 3, the future worth F is:',
      options: ['1100', '1210', '1331', '1300'],
      correctAnswer: 2,
      explanation: 'F = P(1+i)^n = 1000(1.1)³ = 1331',
    },
    {
      id: 'ee2',
      question: 'Depreciation using straight-line method is:',
      options: ['(P-S)/n', '(P-S)×n', 'P/n', 'P×n'],
      correctAnswer: 0,
      explanation: 'Annual depreciation = (Initial cost - Salvage) / Useful life',
    },
  ],
  'foundation-eng': [
    {
      id: 'fe1',
      question: 'Terzaghis bearing capacity equation is used for:',
      options: ['Deep foundations', 'Shallow foundations', 'Retaining walls', 'Slopes'],
      correctAnswer: 1,
      explanation: 'Terzaghis equation is for shallow foundations',
    },
    {
      id: 'fe2',
      question: 'A factor of safety of 3.0 for bearing capacity means:',
      options: ['q_allowable = 3×q_ultimate', 'q_allowable = q_ultimate/3', 'q_allowable = q_ultimate - 3', 'q_allowable = q_ultimate + 3'],
      correctAnswer: 1,
      explanation: 'FS = q_ultimate/q_allowable, so q_allowable = q_ultimate/FS',
    },
  ],
  'steel-design': [
    {
      id: 'steel1',
      question: 'The net area of a tension member accounts for:',
      options: ['Bolt holes', 'Eccentricity', 'Buckling', 'Deflection'],
      correctAnswer: 0,
      explanation: 'Net area = Gross area - Area of bolt holes',
    },
    {
      id: 'steel2',
      question: 'The slenderness ratio KL/r affects:',
      options: ['Tension capacity', 'Compression capacity', 'Shear capacity', 'Torsion'],
      correctAnswer: 1,
      explanation: 'Slenderness ratio determines buckling and compression capacity',
    },
  ],
  'const-mgmt': [
    {
      id: 'cm1',
      question: 'Critical path in CPM is the path with:',
      options: ['Shortest duration', 'Longest duration', 'Most activities', 'Least activities'],
      correctAnswer: 1,
      explanation: 'Critical path is longest path determining minimum project duration',
    },
    {
      id: 'cm2',
      question: 'Float or slack time represents:',
      options: ['Critical activities', 'Delay without affecting project', 'Cost overrun', 'Quality issues'],
      correctAnswer: 1,
      explanation: 'Float is time an activity can be delayed without affecting completion',
    },
  ],
};

// Get quiz by topic ID
export const getQuizByTopic = (topicId) => {
  return quizzesData[topicId] || [];
};

// Get random questions from a topic
export const getRandomQuestions = (topicId, count = 5) => {
  const topicQuiz = quizzesData[topicId] || [];
  const shuffled = topicQuiz.slice().sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
};
