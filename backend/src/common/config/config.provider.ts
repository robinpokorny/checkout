import { Provider } from '@nestjs/common';
import * as config from 'config';
import { IConfig } from 'config';

export const CONFIG_PROVIDER = 'CONFIG_PROVIDER';
export type IConfig = IConfig;

export const configProvider: Provider = {
  useFactory: (): IConfig => {
    return config;
  },
  provide: CONFIG_PROVIDER,
};
