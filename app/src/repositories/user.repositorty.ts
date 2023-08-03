import { CreateUserDto } from 'src/modules/http/dtos/create-user.dto';
import { User } from 'src/entities/user.entity';

export abstract class UserRepository {
	abstract create(data: CreateUserDto): Promise<User | { message: string }>;
	abstract findByUsername(username: string): Promise<User>;
}
