type JsonFetchResult<T> = {
  response: Response;
  data: T;
};

function normalizePath(path: string) {
  return path.startsWith('/') ? path : `/${path}`;
}

function getApiBaseUrl() {
  const configuredBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim();

  if (configuredBaseUrl) {
    return configuredBaseUrl.replace(/\/$/, '');
  }

  if (typeof window === 'undefined') {
    return '';
  }

  const { protocol, hostname, port } = window.location;
  const isLocalHost = hostname === 'localhost' || hostname === '127.0.0.1';

  if (isLocalHost && port !== '3001') {
    return `${protocol}//${hostname}:3001`;
  }

  return '';
}

export function getApiUrl(path: string) {
  return `${getApiBaseUrl()}${normalizePath(path)}`;
}

export async function fetchApiJson<T>(path: string, init?: RequestInit): Promise<JsonFetchResult<T>> {
  const response = await fetch(getApiUrl(path), init);
  const responseText = await response.text();
  const contentType = response.headers.get('content-type') || '';
  const trimmedResponse = responseText.trimStart();

  if (!contentType.includes('application/json')) {
    if (trimmedResponse.startsWith('<!DOCTYPE') || trimmedResponse.startsWith('<html')) {
      throw new Error(
        'The app reached a frontend HTML page instead of the API. Start the Express server with npm run dev, or set VITE_API_BASE_URL to your backend URL.',
      );
    }

    throw new Error('The server returned an unexpected response format instead of JSON.');
  }

  try {
    return {
      response,
      data: JSON.parse(responseText) as T,
    };
  } catch {
    throw new Error('The server returned invalid JSON.');
  }
}