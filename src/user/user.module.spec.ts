import {Test} from '@nestjs/testing';
import {UserService} from "./user.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "../entity/user.entity";
import {UserModule} from "./user.module";

describe('UserModule', () => {
    let userService: UserService

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forRoot({
                    type: 'sqlite',
                    database: './test.db',
                    entities: [UserEntity],
                    synchronize: true
                }),
                UserModule,
            ],
        }).compile();

        userService = moduleRef.get(UserService);
    })

    beforeEach(async () => {
        userService.clear();
    });

    function UserTest(id: string): UserEntity {
        return {
            user_id: id,
            first_name: 'User' + id,
            last_name: 'User' + id,
            username: 'User' + id,
            language_code: 'en'
        };
    }


    describe('user repository test', () => {
        it('empty test', async () => {
            expect(await userService.count().toPromise()).toEqual(0);
            expect(await userService.findAll().toPromise()).toEqual([]);
        });

        it('save test', async () => {
            expect(await userService.save(UserTest('1')).toPromise()).toEqual(UserTest('1'));
            expect(await userService.count().toPromise()).toEqual(1);
        });

        it('find test', async () => {
            expect(await userService.save(UserTest('1')).toPromise()).toEqual(UserTest('1'));
            expect(await userService.save(UserTest('2')).toPromise()).toEqual(UserTest('2'));
            expect(await userService.count().toPromise()).toEqual(2);
            expect(await userService.findOne('1').toPromise()).toEqual(UserTest('1'));
            expect(await userService.findAll().toPromise()).toEqual([UserTest('1'), UserTest('2')]);
        });

        it('remove test', async () => {
            expect(await userService.save(UserTest('1')).toPromise()).toEqual(UserTest('1'));
            expect(await userService.save(UserTest('2')).toPromise()).toEqual(UserTest('2'));
            expect(await userService.count().toPromise()).toEqual(2);
            expect(await userService.remove(UserTest('1')).toPromise()).toEqual(undefined);
            expect(await userService.count().toPromise()).toEqual(1);
            expect(await userService.findOne('1').toPromise()).toEqual(undefined);
        });
    })

});
