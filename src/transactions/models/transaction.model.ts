import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import Group from "../../groups/models/group.model";
import { User } from "../../users/models/user.model";
import { Category, Kind } from "../transactions.constants";

@Table({ tableName: "transaction", underscored: true, timestamps: false })
export class Transaction extends Model<Transaction> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    unique: true,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  sum: number;

  @Column({
    type: DataType.ENUM({ values: Object.values(Category) }),
    allowNull: false,
  })
  category: Category;

  @Column({
    type: DataType.ENUM({ values: Object.values(Kind) }),
    allowNull: false,
  })
  kind: Kind;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  date: Date;

  @Column({ type: DataType.TIME })
  time: Date;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: true })
  personal: boolean;

  @Column({ type: DataType.TEXT, defaultValue: "" })
  description: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    defaultValue: null,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  userId: string;

  @ForeignKey(() => Group)
  @Column({
    type: DataType.UUID,
    defaultValue: null,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  groupId: string;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Group)
  group: Group;
}
