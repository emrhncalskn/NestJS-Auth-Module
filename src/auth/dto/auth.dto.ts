import { ApiProperty } from "@nestjs/swagger";

export class AuthDto {
    @ApiProperty() // For the parameters in the body section to appear in Swagger
    email: string;
    @ApiProperty()
    password: string;
}