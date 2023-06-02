export const EXCESSING_CATEGORIES =
  "Превышено количество категорий. Оформите премиум-подписку.";
export const CREATE_TRANSACTION_ERROR =
  "Ошибка при создании транзакции, попробуйте позже.";
export const FIND_TRANSACTION_ERROR = "Транзакции с таким id не найдена.";
export const FIND_TRANSACTIONS_ERROR = "Транзакции не найдены.";
export const FIND_INFO_ERROR = "Информация о транзакциях не найдена.";

export enum Category {
  PRODUCTS = "Продукты",
  ENTERTAINMENT = "Развлечения",
  TRANSPORT = "Транспорт",
  HEALTH = "Здоровье",
  HOME = "ЖКХ",
  EDUCATION = "Обучение",
  FITNESS = "Фитнес",
  TAXES = "Налоги",
  SALARY = "Зарплата",
  REWARD = "Награда",
  PRESENT = "Подарок",
  SALES = "Продажа",
  OTHER = "Другое",
}

export enum Month {
  JANUARY = "01",
  FEBRUARY = "02",
  MARCH = "03",
  APRIL = "04",
  MAY = "05",
  JUNE = "06",
  JULY = "07",
  AUGUST = "08",
  SEPTEMBER = "09",
  OCTOBER = "10",
  NOVEMBER = "11",
  DECEMBER = "12",
}

export enum Kind {
  COSTS = "Расходы",
  INCOME = "Доходы",
}
