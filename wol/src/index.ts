import { registerPlugin } from '@capacitor/core';

import type { wolPlugin } from './definitions';

const wol = registerPlugin<wolPlugin>('wol', {
  web: () => import('./web').then(m => new m.wolWeb()),
});

export * from './definitions';
export { wol };
