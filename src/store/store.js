import { init } from '@rematch/core';

import { topic } from '../models/topic';

export const store = init({
	models: {
		topic,
	},
});
