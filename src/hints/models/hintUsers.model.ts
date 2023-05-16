import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "../../users/models/user.model";
import { Hint } from "./hint.models";

@Table({ tableName: "hint_users", underscored: true, timestamps: false })
export class HintUsers extends Model<HintUsers> {
  @ForeignKey(() => Hint)
  @Column({ type: DataType.INTEGER })
  hintId: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID })
  userId: number;
}
