// Sample lessons with step-by-step solutions - simplified structure
const lessonsData = {
  'eng-math': [
    {
      id: 'eng-math-1',
      title: 'Quadratic Equations and Applications',
      content: `## Quadratic Equations

A quadratic equation is a second-degree polynomial equation of the form:
ax² + bx + c = 0 (where a ≠ 0)

### The Quadratic Formula
The solutions to a quadratic equation can be found using:
x = (-b ± √(b² - 4ac)) / 2a

### Discriminant
The discriminant D = b² - 4ac determines the nature of roots:
• D > 0: Two distinct real roots
• D = 0: One repeated real root  
• D < 0: Two complex conjugate roots

### Example Problem
Problem: Solve 2x² - 7x + 3 = 0

Solution:
1. Identify coefficients: a = 2, b = -7, c = 3
2. Calculate discriminant: D = (-7)² - 4(2)(3) = 49 - 24 = 25
3. Apply formula: x = (7 ± √25) / 4 = (7 ± 5) / 4
4. Solutions: x₁ = 12/4 = 3, x₂ = 2/4 = 0.5

Answer: x = 3 or x = 0.5`,
      formulas: [
        { name: 'Quadratic Formula', formula: 'x = (-b ± √(b² - 4ac)) / 2a' },
        { name: 'Discriminant', formula: 'D = b² - 4ac' }
      ],
    },
    {
      id: 'eng-math-2',
      title: 'Trigonometric Identities',
      content: `## Fundamental Trigonometric Identities

### Pythagorean Identities
• sin²θ + cos²θ = 1
• 1 + tan²θ = sec²θ
• 1 + cot²θ = csc²θ

### Double Angle Formulas
• sin(2θ) = 2sinθ·cosθ
• cos(2θ) = cos²θ - sin²θ = 2cos²θ - 1 = 1 - 2sin²θ
• tan(2θ) = 2tanθ / (1 - tan²θ)

### Example Problem
Problem: If sin θ = 3/5 and θ is in the first quadrant, find sin(2θ).

Solution:
1. Find cos θ using Pythagorean identity:
   cos²θ = 1 - sin²θ = 1 - 9/25 = 16/25
   cos θ = 4/5 (positive in first quadrant)

2. Apply double angle formula:
   sin(2θ) = 2·sinθ·cosθ = 2·(3/5)·(4/5) = 24/25

Answer: sin(2θ) = 24/25`,
      formulas: [
        { name: 'Pythagorean Identity', formula: 'sin²θ + cos²θ = 1' },
        { name: 'Double Angle (sin)', formula: 'sin(2θ) = 2sinθ·cosθ' }
      ],
    },
  ],
  'hydraulics': [
    {
      id: 'hydraulics-1',
      title: 'Fluid Pressure and Hydrostatics',
      content: `## Hydrostatic Pressure

Pressure at a point in a static fluid depends only on depth.

### Pressure Formula
P = ρgh

where:
• P = pressure (Pa)
• ρ = fluid density (kg/m³)
• g = acceleration due to gravity (9.81 m/s²)
• h = depth below surface (m)

### Pascal's Law
Pressure applied to an enclosed fluid is transmitted equally in all directions.

### Example Problem
Problem: A tank contains water (ρ = 1000 kg/m³). Calculate the pressure at a depth of 5 meters.

Solution:
1. Given: ρ = 1000 kg/m³, g = 9.81 m/s², h = 5 m
2. Apply formula: P = ρgh
3. P = 1000 × 9.81 × 5 = 49,050 Pa

Answer: P = 49.05 kPa`,
      formulas: [
        { name: 'Hydrostatic Pressure', formula: 'P = ρgh' },
        { name: 'Force on Surface', formula: 'F = P × A' }
      ],
    },
  ],
  'reinforced-concrete': [
    {
      id: 'rc-1',
      title: 'Flexural Design of Beams',
      content: `## Reinforced Concrete Beam Design

### NSCP Requirements
For singly reinforced rectangular beams:
Mn = As × fy × (d - a/2)

where:
• Mn = nominal moment capacity
• As = area of tension steel
• fy = yield strength of steel
• d = effective depth
• a = depth of compression block

### Compression Block Depth
a = As × fy / (0.85 × f'c × b)

### Example Problem
Problem: Design a beam section for Mu = 200 kN·m. 
Given: f'c = 28 MPa, fy = 415 MPa, b = 300 mm, d = 450 mm.

Solution:
1. Calculate required Mn: Mn = Mu/φ = 200/0.9 = 222.2 kN·m
2. Assume steel ratio ρ = 0.015 (typical)
   As = ρ × b × d = 0.015 × 300 × 450 = 2025 mm²
3. Calculate a: a = (2025 × 415)/(0.85 × 28 × 300) = 117.5 mm

Answer: Use 4-25mm diameter bars`,
      formulas: [
        { name: 'Nominal Moment', formula: 'Mn = As·fy·(d - a/2)' },
        { name: 'Design Moment', formula: 'φMn ≥ Mu, φ = 0.90' }
      ],
    },
  ],
  'theory-struct': [
    {
      id: 'struct-1',
      title: 'Determinacy and Stability',
      content: `## Structural Determinacy

### Degree of Indeterminacy
For plane frames: DI = 3m + r - 3j

where:
• m = number of members
• r = number of reactions
• j = number of joints

### Classification
• DI < 0: Unstable
• DI = 0: Statically determinate
• DI > 0: Statically indeterminate (to DI degree)

### Example Problem
Problem: Determine the degree of indeterminacy of a portal frame with 3 members, 4 joints, and fixed supports at both ends.

Solution:
1. Count members: m = 3
2. Count reactions: r = 6 (3 at each fixed support)
3. Count joints: j = 4
4. Apply formula: DI = 3(3) + 6 - 3(4) = 9 + 6 - 12 = 3

Answer: The structure is indeterminate to the 3rd degree`,
      formulas: [
        { name: 'Plane Frame DI', formula: 'DI = 3m + r - 3j' },
        { name: 'Plane Truss DI', formula: 'DI = m + r - 2j' }
      ],
    },
  ],
};

// Get lessons by topic ID
export const getLessonsByTopic = (topicId) => {
  return lessonsData[topicId] || [];
};

// Get lesson by ID
export const getLessonById = (lessonId) => {
  for (const topicLessons of Object.values(lessonsData)) {
    const lesson = topicLessons.find(l => l.id === lessonId);
    if (lesson) return lesson;
  }
  return null;
};
