export function formatTel(tel: string): string {
  const cleanNumber: string = tel.replace(/\D/g, "");

  const regexTel: RegExp = /^(\d{2})(\d{5})(\d{4})$/;

  if (regexTel.test(cleanNumber)) {
    return `(${cleanNumber.substring(0, 2)}) ${cleanNumber.substring(
      2,
      7
    )}-${cleanNumber.substring(7)}`;
  } else {
    return tel;
  }
}
