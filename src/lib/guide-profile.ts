type MinimalGuideProfile = {
  bio: string | null;
  phone: string | null;
  location: string | null;
  specialties: unknown;
  languages: unknown;
  hourlyRate: unknown;
};

function hasListValues(value: unknown) {
  return Array.isArray(value) && value.length > 0;
}

function toNumber(value: unknown) {
  if (typeof value === "number") {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  return 0;
}

export function isGuideProfileComplete(profile: MinimalGuideProfile | null) {
  if (!profile) {
    return false;
  }

  return Boolean(
    profile.bio?.trim() &&
      profile.phone?.trim() &&
      profile.location?.trim() &&
      hasListValues(profile.specialties) &&
      hasListValues(profile.languages) &&
      toNumber(profile.hourlyRate) > 0,
  );
}
