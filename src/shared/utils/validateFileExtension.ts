const FILE_ALLOWED_EXT: string[] = [
  ".txt",
  ".pdf",
  ".odt",
  ".doc",
  ".docx",
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
];

export const validateFileExtension = (filename: string): boolean => {
  const ext = filename
    .slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2)
    .toLowerCase();

  return FILE_ALLOWED_EXT.includes(`.${ext}`);
};
