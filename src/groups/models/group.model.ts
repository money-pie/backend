import {
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { Transaction } from "../../transactions/models/transaction.model";
import { User } from "../../users/models/user.model";

interface GroupCreationAttrs {
  premium: boolean;
}

@Table({ tableName: "group", underscored: true })
export default class Group extends Model<Group, GroupCreationAttrs> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    unique: true,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  premium: boolean;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  aim: number;

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 2 })
  maxCapacity: number;

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 1 })
  curCapacity: number;

  @HasMany(() => User)
  users: User[];

  @HasMany(() => Transaction)
  transactions: Transaction[];
}
