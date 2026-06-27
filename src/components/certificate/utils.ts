export const generateCertificateId = (prefix: string = 'PG'): string => {
  const year = new Date().getFullYear();
  const randomHex = Math.floor(Math.random() * 16777215).toString(16).toUpperCase().padStart(6, '0');
  return `${prefix}-${year}-${randomHex}`;
};

export const formatDate = (date: Date | string): string => {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
