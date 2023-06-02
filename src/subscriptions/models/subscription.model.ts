import {
  Column,
  DataType,
  HasOne,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { User } from "../../users/models/user.model";

@Table({ tableName: "subscription", underscored: true })
export class Subscription extends Model<Subscription> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    unique: true,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({ type: DataType.DATE, allowNull: false })
  endDate: Date;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  active: boolean;

  @HasOne(() => User)
  user: User;
}
