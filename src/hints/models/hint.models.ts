import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { User } from "../../users/models/user.model";
import { Theme } from "../hints.constants";
import { HintUsers } from "./hintUsers.model";

interface HintCreationAttrs {
  theme: Theme;
  title: string;
  text: string;
}

@Table({ tableName: "hint", underscored: true })
export class Hint extends Model<Hint, HintCreationAttrs> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    allowNull: false,
    unique: true,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({
    type: DataType.ENUM({ values: Object.values(Theme) }),
    allowNull: false,
  })
  theme: Theme;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: "" })
  title: string;

  @Column({ type: DataType.TEXT, allowNull: false, defaultValue: "" })
  text: string;

  @BelongsToMany(() => User, () => HintUsers)
  users: User[];
}
