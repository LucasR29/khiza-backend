import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/repositories/user.repositorty';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/modules/http/dtos/create-user.dto';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
	constructor(private userRepository: UserRepository) {}

	async create(
		createUserDto: CreateUserDto,
	): Promise<User | { message: string }> {
		const data = {
			...createUserDto,
			password: await bcrypt.hash(createUserDto.password, 10),
		};

		const res = await this.userRepository.create(data);

		return res as User;
	}

	async findByUsename(username: string) {
		return await this.userRepository.findByUsername(username);
	}
}
