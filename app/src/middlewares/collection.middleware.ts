import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CollectionMiddleware implements NestMiddleware {
	async use(req: Request, res: Response, next: NextFunction) {
		const contract = req.body.contract;

		if (!contract) {
			return res.status(400).json({
				error: `contract cannot be empty`,
			});
		}

		const regex = new RegExp(/^0x[a-fA-F0-9]{40}$/);

		if (!regex.test(contract)) {
			return res.status(400).json({
				error: `${contract} fails to match the required pattern: /^0x[a-fA-F0-9]{40}$/`,
			});
		}

		next();
	}
}
