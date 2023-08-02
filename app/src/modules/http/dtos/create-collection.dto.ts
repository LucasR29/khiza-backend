import { IsNotEmpty } from 'class-validator';

export class createCollectionBody {
	@IsNotEmpty()
	contract: string;
}
