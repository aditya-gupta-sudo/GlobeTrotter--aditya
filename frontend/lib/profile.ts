import { apiFetch } from "@/lib/api";

export type ProfileUser = {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  createdAt: string;
  updatedAt: string;
};

export type UpdateProfilePayload = {
  name?: string;
  avatar?: string | null;
};

export async function getProfile(): Promise<ProfileUser> {
  const data = await apiFetch<{ user: ProfileUser }>("/api/profile");
  return data.user;
}

export async function updateProfile(
  payload: UpdateProfilePayload
): Promise<ProfileUser> {
  const data = await apiFetch<{ user: ProfileUser }>("/api/profile", {
    method: "PUT",
    body: JSON.stringify(payload),
  });
  return data.user;
}
