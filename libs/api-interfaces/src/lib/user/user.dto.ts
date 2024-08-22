import { ApiProperty } from "@nestjs/swagger";

export class UserDto {
  @ApiProperty({
    example: 'Joe',
    description: 'The first name of the user'
  })
  firstName: string;
  @ApiProperty({
    example: 'Blow',
    description: 'The last name of the user'
  })
  lastName: string;
  @ApiProperty({
    example: 'joeblow@email.com',
    description: 'The email address of the user'
  })
  username: string;
}
