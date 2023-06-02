import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsUUID } from "class-validator";

export class CreateSubResponse {
  @ApiProperty({
    description: "Subscription id",
    nullable: false,
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    description: "End date of subscription",
    nullable: false,
  })
  @IsDate()
  endDate: Date;

  @ApiProperty({
    description: "Subscription status",
    example: true,
    nullable: false,
  })
  @IsBoolean()
  active: boolean;
}
