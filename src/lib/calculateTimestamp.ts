export function calculateTimestamp(
  year: string, 
  month: string, 
  day: string
) {
  
  const y = parseInt(year);
  const m = parseInt(month);
  const d = parseInt(day);
  
  return new Date(y, m - 1, d).getTime();
}