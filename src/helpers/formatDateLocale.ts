export const formatDateLocale = (date: Date | null): string => {
  return date ? date.toLocaleDateString() : 'N/A';
};
