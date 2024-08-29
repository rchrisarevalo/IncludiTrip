export const calculateAge = (birthday: string) => {
  const birthday_info = birthday.split("-");
  const birth_month = parseInt(birthday_info[1]);
  const birth_date = parseInt(birthday_info[2]);
  const birth_year = parseInt(birthday_info[0]);

  let age =
    new Date().getFullYear() -
    new Date(birth_year, birth_month - 1, birth_date).getFullYear();

  const month_difference =
    new Date().getMonth() -
    new Date(birth_year, birth_month - 1, birth_date).getMonth();

  if (
    month_difference <= 0 &&
    new Date() < new Date(new Date().getFullYear(), birth_month - 1, birth_date)
  ) {
    age--;
  }

  return age;
};
