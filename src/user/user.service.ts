import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';
import { Observable, from } from "rxjs";
import {FindManyOptions} from "typeorm/find-options/FindManyOptions";
import {map} from "rxjs/operators";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    findAll(options?: FindManyOptions<UserEntity>): Observable<UserEntity[]> {
        return from(this.userRepository.find(options));
    }

    findOne(id: string): Observable<UserEntity> {
        return from(this.userRepository.findOne(id));
    }

    save(user: UserEntity): Observable<UserEntity> {
        return from(this.userRepository.save(user));
    }

    remove(user: UserEntity): Observable<void> {
        return from(this.userRepository.remove(user)).pipe(map(_=>{}));
    }

    count(options?: FindManyOptions<UserEntity>): Observable<number> {
        return from(this.userRepository.count(options));
    }

    clear(): Observable<void> {
        return from(this.userRepository.clear());
    }
}