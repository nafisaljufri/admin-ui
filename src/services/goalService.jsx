// Mock goal data
const mockGoals = [
  {
    id: 1,
    targetAmount: 20000,
    presentAmount: 12500,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const getGoalsService = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockGoals[0];
};
