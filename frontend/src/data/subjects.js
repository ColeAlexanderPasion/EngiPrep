// Pre-populated sample content for CE Board Exam - Flat structure

// Subject definitions
export const subjects = [
  {
    id: 'math-survey-transpo',
    name: 'Mathematics, Surveying & Transportation',
    shortName: 'Math & Survey',
    description: 'Engineering Mathematics, Differential Equations, Surveying, and Transportation Engineering',
    icon: 'Calculator',
    color: 'bg-blue-500',
    topicIds: ['eng-math', 'diff-eq', 'surveying', 'transpo-eng'],
  },
  {
    id: 'hydraulics-geotech',
    name: 'Hydraulics & Geotechnical Engineering',
    shortName: 'Hydraulics & Geotech',
    description: 'Engineering Mechanics, Strength of Materials, Hydraulics, and Soil Mechanics',
    icon: 'Waves',
    color: 'bg-cyan-500',
    topicIds: ['eng-mech', 'strength-mat', 'hydraulics', 'eng-econ', 'soil-mech', 'foundation-eng'],
  },
  {
    id: 'structural-construction',
    name: 'Structural Engineering & Construction',
    shortName: 'Structural & Const',
    description: 'Theory of Structures, Reinforced Concrete, Steel Design, and Construction Management',
    icon: 'Building2',
    color: 'bg-orange-500',
    topicIds: ['theory-struct', 'reinforced-concrete', 'steel-design', 'const-mgmt'],
  },
];

// Topics flat array
export const topics = [
  { id: 'eng-math', name: 'Engineering Mathematics', description: 'Algebra, Trigonometry, Calculus, and Numerical Methods', subjectId: 'math-survey-transpo' },
  { id: 'diff-eq', name: 'Differential Equations', description: 'First-order, Higher-order, and Applications', subjectId: 'math-survey-transpo' },
  { id: 'surveying', name: 'Surveying', description: 'Leveling, Traversing, Triangulation, and GPS', subjectId: 'math-survey-transpo' },
  { id: 'transpo-eng', name: 'Transportation Engineering', description: 'Highway Design, Traffic Engineering', subjectId: 'math-survey-transpo' },
  { id: 'eng-mech', name: 'Engineering Mechanics', description: 'Statics, Dynamics, and Friction', subjectId: 'hydraulics-geotech' },
  { id: 'strength-mat', name: 'Strength of Materials', description: 'Stress, Strain, Beam Design', subjectId: 'hydraulics-geotech' },
  { id: 'hydraulics', name: 'Hydraulics', description: 'Fluid Statics, Fluid Flow, Open Channels', subjectId: 'hydraulics-geotech' },
  { id: 'eng-econ', name: 'Engineering Economics', description: 'Interest, Depreciation, Economic Analysis', subjectId: 'hydraulics-geotech' },
  { id: 'soil-mech', name: 'Soil Mechanics', description: 'Soil Classification, Compaction', subjectId: 'hydraulics-geotech' },
  { id: 'foundation-eng', name: 'Foundation Engineering', description: 'Shallow and Deep Foundations', subjectId: 'hydraulics-geotech' },
  { id: 'theory-struct', name: 'Theory of Structures', description: 'Determinate and Indeterminate Structures', subjectId: 'structural-construction' },
  { id: 'reinforced-concrete', name: 'Reinforced Concrete Design', description: 'NSCP Code, Beam and Slab Design', subjectId: 'structural-construction' },
  { id: 'steel-design', name: 'Steel Design', description: 'Tension Members, Compression Members', subjectId: 'structural-construction' },
  { id: 'const-mgmt', name: 'Construction Management', description: 'Project Planning, Scheduling', subjectId: 'structural-construction' },
];

// Get topics for a subject
export const getTopicsForSubject = (subjectId) => {
  return topics.filter(t => t.subjectId === subjectId);
};

// Get subject by ID
export const getSubjectById = (id) => {
  const subject = subjects.find(s => s.id === id);
  if (subject) {
    return {
      ...subject,
      topics: getTopicsForSubject(id),
    };
  }
  return null;
};

// Get topic by ID with subject info
export const getTopicById = (topicId) => {
  const topic = topics.find(t => t.id === topicId);
  if (topic) {
    const subject = subjects.find(s => s.id === topic.subjectId);
    return {
      ...topic,
      subjectName: subject ? subject.name : '',
    };
  }
  return null;
};

// Get all subjects with topics populated
export const getAllSubjectsWithTopics = () => {
  return subjects.map(s => ({
    ...s,
    topics: getTopicsForSubject(s.id),
  }));
};
