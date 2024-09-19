'use server';

import { BASE_URL } from '@/constants/url';

const fetchInstance = async (url, options = {}) => {

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  try {
    const response = await fetch(`${BASE_URL}${url}`, {
      ...options,
      headers,
    });

    

    if (!response.ok) {
      if (response.headers.get('Content-Type')?.includes('application/json')) {
        const errorResponse = await response.json();
        return { error: errorResponse };
      }
      else {
        return { error: await response.text()};
      }
    }


    if (response.headers.get('Content-Type')?.includes('application/json')) {
      const jsonResponse = await response.json();
      return jsonResponse;
    } else {
      return await response.text();
    }
  } catch (error) {
    console.error('Fetch Error:', error);
    throw error;
  }
};

export const instance = fetchInstance;
