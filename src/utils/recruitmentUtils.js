export const isRecruitmentOpen = (deadlineString) => {
  if (!deadlineString) return false;
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const deadline = new Date(deadlineString);
  deadline.setHours(23, 59, 59, 999);
  
  return today <= deadline;
};