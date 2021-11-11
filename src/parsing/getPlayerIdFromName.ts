const combining = /[\u0300-\u036F]/g;

export const getPlayerIdFromName = (fullName: string): string => {
  if (!fullName) {
    return "";
  }
  const normalizedName = fullName
    .normalize("NFKD")
    .replace(combining, "")
    .replace(".", "")
    .replace("*", "")
    .toLowerCase();

  const [firstName, ...lastNames] = normalizedName.split(" ");
  const concatLastname = lastNames.join("");

  const pre =
    concatLastname.length > 5 ? concatLastname.slice(0, 5) : concatLastname;

  // TODO: actually determine suffixes ahhahah
  const num = normalizedName.includes("jr.") ? "02" : "01";

  return `${pre}${firstName.slice(0, 2)}${num}`;
};
