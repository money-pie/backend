import { MockTransaction } from "./transaction";
import { v4 as uuidv4 } from "uuid";
import { Category, Kind } from "src/transactions/transactions.constants";

export const usr = {
  login: "Ева Ивановна",
  email: "eva-money@mail.com",
  notification: false,
  aim: 64000,
  subId: null,
  groupId: null,
};

const arrOfTransactions: MockTransaction[] = [
  {
    id: uuidv4(),
    sum: 2349,
    category: Category.EDUCATION,
    kind: Kind.COSTS,
    date: "2023-05-01",
    personal: true,
    description: "Образовательные курсы",
    author: usr.login,
  },
  {
    id: uuidv4(),
    sum: 5200,
    category: Category.TAXES,
    kind: Kind.COSTS,
    date: "2023-05-30",
    personal: true,
    description: "Налог",
    author: usr.login,
  },
  {
    id: uuidv4(),
    sum: 3499,
    category: Category.HOME,
    kind: Kind.COSTS,
    date: "2023-05-18",
    personal: true,
    description: "Оплата коммунальных услуг",
    author: usr.login,
  },
  {
    id: uuidv4(),
    sum: 25000,
    category: Category.SALARY,
    kind: Kind.INCOME,
    date: "2023-05-05",
    personal: true,
    description: "Аванс",
    author: usr.login,
  },
  {
    id: uuidv4(),
    sum: 1700,
    category: Category.PRODUCTS,
    kind: Kind.COSTS,
    date: "2023-05-02",
    personal: true,
    description: "Еда на неделю",
    author: usr.login,
  },
  {
    id: uuidv4(),
    sum: 2475,
    category: Category.PRODUCTS,
    kind: Kind.COSTS,
    date: "2023-05-10",
    personal: true,
    description: "Продукты родителям",
    author: usr.login,
  },
  {
    id: uuidv4(),
    sum: 5670,
    category: Category.PRODUCTS,
    kind: Kind.COSTS,
    date: "2023-05-13",
    personal: true,
    description: "Продукты на оставшийся месяц",
    author: usr.login,
  },
  {
    id: uuidv4(),
    sum: 1455,
    category: Category.PRODUCTS,
    kind: Kind.COSTS,
    date: "2023-05-05",
    personal: true,
    description: "Заказ роллов",
    author: usr.login,
  },
  {
    id: uuidv4(),
    sum: 1230,
    category: Category.PRODUCTS,
    kind: Kind.COSTS,
    date: "2023-05-24",
    personal: true,
    description: "Пицца",
    author: usr.login,
  },
  {
    id: uuidv4(),
    sum: 449,
    category: Category.TRANSPORT,
    kind: Kind.COSTS,
    date: "2023-05-07",
    personal: true,
    description: "Недельные расходы на транспорт, неделя первая",
    author: usr.login,
  },
  {
    id: uuidv4(),
    sum: 353,
    category: Category.TRANSPORT,
    kind: Kind.COSTS,
    date: "2023-05-20",
    personal: true,
    description: "Такси",
    author: usr.login,
  },
  {
    id: uuidv4(),
    sum: 324,
    category: Category.TRANSPORT,
    kind: Kind.COSTS,
    date: "2023-05-14",
    personal: true,
    description: "Недельные расходы на транспорт, неделя вторая",
    author: usr.login,
  },
  {
    id: uuidv4(),
    sum: 234,
    category: Category.TRANSPORT,
    kind: Kind.COSTS,
    date: "2023-05-21",
    personal: true,
    description: "Недельные расходы на транспорт, неделя третья",
    author: usr.login,
  },
  {
    id: uuidv4(),
    sum: 389,
    category: Category.TRANSPORT,
    kind: Kind.COSTS,
    date: "2023-05-28",
    personal: true,
    description: "Недельные расходы на транспорт, неделя четвертая",
    author: usr.login,
  },
  {
    id: uuidv4(),
    sum: 5000,
    category: Category.PRESENT,
    kind: Kind.INCOME,
    date: "2023-05-08",
    personal: true,
    description: "Подарок на день рождения",
    author: usr.login,
  },
  {
    id: uuidv4(),
    sum: 2499,
    category: Category.FITNESS,
    kind: Kind.COSTS,
    date: "2023-05-25",
    personal: true,
    description: "Оплата абонемента в тренажерный зал",
    author: usr.login,
  },
  {
    id: uuidv4(),
    sum: 1200,
    category: Category.FITNESS,
    kind: Kind.COSTS,
    date: "2023-05-03",
    personal: true,
    description: "Спортивное питание",
    author: usr.login,
  },
  {
    id: uuidv4(),
    sum: 560,
    category: Category.ENTERTAINMENT,
    kind: Kind.COSTS,
    date: "2023-05-23",
    personal: true,
    description: "Билеты в кино",
    author: usr.login,
  },
  {
    id: uuidv4(),
    sum: 40000,
    category: Category.SALARY,
    kind: Kind.INCOME,
    date: "2023-05-25",
    personal: true,
    description: "Зарплата",
    author: usr.login,
  },
  {
    id: uuidv4(),
    sum: 1530,
    category: Category.PRODUCTS,
    kind: Kind.COSTS,
    date: "2023-05-16",
    personal: true,
    description: "Ужин в кафе",
    author: usr.login,
  },
];

const sortedTransactions = arrOfTransactions.sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
);

export const mapOfTransactions = new Map();
sortedTransactions.forEach((transaction) =>
  mapOfTransactions.set(transaction.id, transaction),
);
