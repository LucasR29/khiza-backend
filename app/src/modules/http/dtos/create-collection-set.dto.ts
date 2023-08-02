import { ArrayMinSize, IsArray, IsNotEmpty, Length } from 'class-validator';

export class createCollectionsSetBody {
	@IsNotEmpty()
	@IsArray()
	@ArrayMinSize(2)
	collections: string[];
}
