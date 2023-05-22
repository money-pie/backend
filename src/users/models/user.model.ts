import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import Group from "../../groups/models/group.model";
import { Hint } from "../../hints/models/hint.models";
import { HintUsers } from "../../hints/models/hintUsers.model";
import { Subscription } from "../../subscriptions/models/subscription.model";
import { Transaction } from "../../transactions/models/transaction.model";

interface UserCreationAttrs {
  email: string;
  login: string;
  password: string;
}

@Table({ tableName: "user", underscored: true })
export class User extends Model<User, UserCreationAttrs> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    unique: true,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  login: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  password: string;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: true })
  notification: boolean;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  aim: number;

  @ForeignKey(() => Subscription)
  @Column({ type: DataType.UUID, unique: true })
  subId: string;

  @ForeignKey(() => Group)
  @Column({ type: DataType.UUID, defaultValue: null })
  groupId: string;

  @BelongsTo(() => Group)
  group: Group;

  @HasMany(() => Transaction)
  transactions: Transaction[];

  @BelongsToMany(() => Hint, () => HintUsers)
  hints: Hint[];

  @BelongsTo(() => Subscription)
  subscription: Subscription;
}
