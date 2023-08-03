import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CollectionSetMiddleware implements NestMiddleware {
	async use(req: Request, res: Response, next: NextFunction) {
		const body = req.body;
		const regex = new RegExp(/^0x[a-fA-F0-9]{40}$/);
		let isValid = true;
		let err = { error: '' };

		if (!body.collections) {
			return res.status(400).json({ error: 'collections cannot be empty' });
		}

		body.collections.forEach((x) => {
			if (!regex.test(x)) {
				isValid = false;
				err = {
					error: `${x} fails to match the required pattern: /^0x[a-fA-F0-9]{40}$/`,
				};
			}
		});

		if (!isValid) {
			return res.status(400).json(err);
		}

		next();
	}
}
