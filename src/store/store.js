import { init } from '@rematch/core';

import { topic } from '../models/topic';
import { menu } from '../models/menu';

export const store = init({
	models: {
		topic,
		menu,
	},
});
