import { Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

export interface UserPayload {
	sub: string;
	username: string;
	iat?: number;
	exp?: number;
}

export interface UserToken {
	access_token: string;
}

@Injectable()
export class AuthService {
	constructor(
		private userServise: UserService,
		private jwtService: JwtService,
	) {}

	login(user: User): UserToken {
		const payload: UserPayload = {
			sub: user.id,
			username: user.username,
		};

		const jwtToken = this.jwtService.sign(payload);

		return { access_token: jwtToken };
	}

	async validateUser(username: string, password: string) {
		const user = await this.userServise.findByUsename(username);

		if (user) {
			const isPasswordValid = await bcrypt.compare(password, user.password);

			if (isPasswordValid) {
				return {
					...user,
					password: undefined,
				};
			}
		}

		throw new Error('Username or password is incorrect');
	}
}
