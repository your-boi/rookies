export interface SelectOption<T = string> {
  value: T;
  label: string;
}

export const toSelectOption = <T>(o: T): SelectOption<T> => ({
  value: o,
  label: `${o}`,
});
