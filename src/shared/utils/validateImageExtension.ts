const IMAGE_ALLOWED_EXT: string[] = [".png", ".jpg", ".jpeg", ".webp"];

export const validateImageExtension = (imageName: string): boolean => {
  const ext = imageName
    .slice(((imageName.lastIndexOf(".") - 1) >>> 0) + 2)
    .toLowerCase();

  return IMAGE_ALLOWED_EXT.includes(`.${ext}`);
};
