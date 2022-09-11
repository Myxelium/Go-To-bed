import { WebPlugin } from '@capacitor/core';

import type { wolPlugin } from './definitions';

export class wolWeb extends WebPlugin implements wolPlugin {
  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }
}
