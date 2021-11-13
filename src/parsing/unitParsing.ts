const strParser = (v: string) => v;
const dateParser = (v: string): Date => new Date(v);
const defaultParser = (v: any) => (isNaN(Number(v)) ? v : Number(v));
const ageParser = (v: string): number => {
  const [year, days] = v.split("-");

  return Number(year) + Number(days) / 365;
};

const minutesParser = (v: string): number => {
  const [minutes, seconds] = v.split(":");

  return Number(minutes) + Number(seconds) / 60;
};

const parsingMap = {
  Age: ageParser,
  Date: dateParser,
  MP: minutesParser,
  OPP: strParser,
  Tm: strParser,
};

export const parseUnit = (k: string, v: any) => {
  if (parsingMap[k]) {
    return parsingMap[k](v);
  }
  return defaultParser(v);
};
