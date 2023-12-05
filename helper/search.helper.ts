import unidecode from "unidecode";

export const search = (keyword: string): string => {
  const stringUnidecode = unidecode(keyword.trim());
  let slug: string = stringUnidecode.replace(/\s+/g, "-");
  return slug;
}
