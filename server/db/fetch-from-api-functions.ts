export async function fetchTrainingsHistory(day: string) {
  const response = await fetch(`/api/training-history?date=${day}`, {
    cache: 'no-cache',
  });
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
}

export async function fetchUserInfo(userId: string) {
  const response = await fetch(`/api/user-info?userId=${userId}`, {
    cache: 'no-cache',
  });
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
}
