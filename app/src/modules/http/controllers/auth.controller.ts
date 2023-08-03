import {
	Controller,
	HttpCode,
	HttpStatus,
	Post,
	UseGuards,
	Request,
} from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { IsPublic } from 'src/modules/auth/decorators/is-public.decorator';
import { LocalAuthGuard } from 'src/modules/auth/guards/local-auth.guard';
import { AuthService } from 'src/services/auth.service';

@Controller()
export class AuthController {
	constructor(private authService: AuthService) {}

	@IsPublic()
	@Post('login')
	@HttpCode(HttpStatus.OK)
	@UseGuards(LocalAuthGuard)
	login(@Request() req: { user: User }) {
		return this.authService.login(req.user);
	}
}
