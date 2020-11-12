import {UserService} from "./user.service";
import {Controller, Get, Param} from "@nestjs/common";
import {UserEntity} from "../entity/user.entity";

@Controller('api/users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get(':id')
    findOne(@Param() params): UserEntity {
        return this.userService.findOne(params.id);
    }
}
