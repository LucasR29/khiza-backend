import { Controller, Post, Body, Res } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserService } from 'src/services/user.service';
import { IsPublic } from 'src/modules/auth/decorators/is-public.decorator';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@IsPublic()
	@Post()
	async create(@Body() createUserDto: CreateUserDto, @Res() res) {
		const data = await this.userService.create(createUserDto);

		if (Object.keys(data).includes('message')) {
			return res.status(409).json(data);
		}

		return res.status(200).json(data);
	}
}
