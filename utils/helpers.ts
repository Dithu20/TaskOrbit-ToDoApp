export const getUsernameFromEmail = (email: string = ""): string => {
  if (!email.includes("@")) return email;
  return email.split("@")[0];
};

export const getAvatarInitials = (name: string = ""): string => {
  if (!name) return "?";
  return name.charAt(0).toUpperCase();
};
