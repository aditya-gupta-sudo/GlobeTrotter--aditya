export type ApiSuccess<T> = {
  success: true;
  message: string;
  data: T;
};

export type ApiFailure = {
  success: false;
  message: string;
  error?: unknown;
};

export type ApiEnvelope<T> = ApiSuccess<T> | ApiFailure;

type ValidationDetail = {
  path?: string;
  message: string;
};

const TOKEN_KEY = "globetrotter_token";

export class ApiError extends Error {
  readonly status: number;
  readonly error: unknown;

  constructor(message: string, status: number, error: unknown = {}) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.error = error;
  }
}

type UnauthorizedListener = () => void;

const unauthorizedListeners = new Set<UnauthorizedListener>();

export function subscribeUnauthorized(listener: UnauthorizedListener): () => void {
  unauthorizedListeners.add(listener);
  return () => unauthorizedListeners.delete(listener);
}

function notifyUnauthorized(): void {
  unauthorizedListeners.forEach((listener) => listener());
}

export function getToken(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
  window.localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken(): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(TOKEN_KEY);
}

function getBaseUrl(): string {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL?.trim();

  if (!baseUrl) {
    throw new ApiError(
      "API URL is not configured. Set NEXT_PUBLIC_API_URL.",
      0
    );
  }

  return baseUrl.replace(/\/+$/, "");
}

function getStatusMessage(status: number): string {
  if (status === 401) {
    return "Unauthorized";
  }

  if (status === 403) {
    return "You do not have permission to perform this action.";
  }

  if (status === 500) {
    return "Internal server error";
  }

  if (status === 0) {
    return "Unable to reach the server. Check your connection.";
  }

  return "Request failed";
}

export function getApiErrorMessage(error: unknown): string {
  if (!(error instanceof ApiError)) {
    if (error instanceof Error && error.message) {
      return error.message;
    }

    return "Something went wrong. Please try again.";
  }

  const payload = error.error;

  if (payload && typeof payload === "object" && "details" in payload) {
    const details = (payload as { details?: unknown }).details;

    if (Array.isArray(details)) {
      const messages = details
        .map((item) => {
          if (
            item &&
            typeof item === "object" &&
            "message" in item &&
            typeof (item as ValidationDetail).message === "string"
          ) {
            return (item as ValidationDetail).message;
          }

          return null;
        })
        .filter((message): message is string => Boolean(message));

      if (messages.length > 0) {
        return messages.join(" ");
      }
    }
  }

  return error.message || getStatusMessage(error.status);
}

export async function apiFetch<T>(
  path: string,
  init: RequestInit = {}
): Promise<T> {
  const token = getToken();
  const headers = new Headers(init.headers);

  if (!headers.has("Content-Type") && init.body) {
    headers.set("Content-Type", "application/json");
  }

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  let response: Response;

  try {
    response = await fetch(`${getBaseUrl()}${path}`, {
      ...init,
      headers,
    });
  } catch {
    throw new ApiError(getStatusMessage(0), 0);
  }

  let body: ApiEnvelope<T> | null = null;

  try {
    body = (await response.json()) as ApiEnvelope<T>;
  } catch {
    body = null;
  }

  if (response.status === 401) {
    if (token) {
      clearToken();
      notifyUnauthorized();
    }
  }

  if (!response.ok || !body || body.success === false) {
    const message =
      body && "message" in body && body.message
        ? body.message
        : getStatusMessage(response.status);

    const errorPayload =
      body && body.success === false ? body.error : {};

    throw new ApiError(message, response.status, errorPayload);
  }

  return body.data;
}
