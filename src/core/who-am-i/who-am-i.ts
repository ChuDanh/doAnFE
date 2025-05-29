import useSWR from 'swr';

export const WhoAmI = () => {
  return useSWR('http://localhost:3001/v1/users/profile', async (url) => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) return null;

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
    return res.json();
  });
};
