import { UserRepository } from 'src/repositories/user.repositorty';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from 'src/modules/http/dtos/create-user.dto';
import { User } from 'src/entities/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaUserRepository implements UserRepository {
	constructor(private prismaService: PrismaService) {}

	async create(data: CreateUserDto): Promise<User | { message: string }> {
		const userExist = await this.prismaService.user.findUnique({
			where: { username: data.username },
		});

		if (userExist) {
			return { message: 'Username alredy in use' };
		}

		const user = await this.prismaService.user.create({
			data: {
				username: data.username,
				password: data.password,
			},
		});

		return {
			...user,
			password: undefined,
		};
	}

	async findByUsername(username: string): Promise<User> {
		const user = await this.prismaService.user.findUnique({
			where: { username },
		});

		return user;
	}
}
