import {Body, Controller, Get, Param, ParseIntPipe, Post, Query} from "@nestjs/common";
import {UserEntity} from "../../entity/user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {ApiOperation, ApiTags} from "@nestjs/swagger";

@ApiTags('Users')
@Controller('users')
export class UserController {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) {}

    @ApiOperation({
        description: 'Get a single user',
    })
    @Get(':id')
    async getOne(
        @Param('id', ParseIntPipe) id: number
    ): Promise<UserEntity> {
        return (await this.userRepository
            .find({
                skip: id,
                take: 1
            }))[0];
    }

    @ApiOperation({
        description: 'Get *size* users, skipping first *offset*',
    })
    @Get()
    async getMany(
        @Query('offset', ParseIntPipe) offset: number,
        @Query('size', ParseIntPipe) size: number,
    ): Promise<UserEntity[]> {
        return this.userRepository
            .find({
                skip: offset,
                take: size
            });
    }

    @ApiOperation({
        description: 'Get user by his user_id',
    })
    @Get()
    async getByUid(
        @Query('uid') uid: string,
    ): Promise<UserEntity> {
        return this.userRepository
            .findOne({
                where: {
                    user_id: uid
                }
            });
    }

    @ApiOperation({
        description: 'Add one user to the database',
    })
    @Post()
    async addOne(
        @Body() newUser: UserEntity
    ): Promise<void> {
        await this.userRepository
            .save(newUser);
    }
}
