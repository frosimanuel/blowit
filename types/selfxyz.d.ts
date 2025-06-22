// Custom type definitions for @selfxyz packages to fix import issues

declare module '@selfxyz/common/utils/appType' {
  export interface SelfApp {
    appName: string;
    logoBase64?: string;
    endpointType: 'https' | 'celo' | 'staging_celo' | 'staging_https';
    endpoint: string;
    header?: string;
    scope: string;
    sessionId?: string;
    userId: string;
    userIdType?: string;
    devMode?: boolean;
    disclosures?: any;
  }

  export class SelfAppBuilder {
    constructor(config: Partial<SelfApp>);
    build(): SelfApp;
  }

  export function getUniversalLink(selfApp: SelfApp): string;
}

declare module '@selfxyz/qrcode' {
  import { SelfApp } from '@selfxyz/common/utils/appType';
  
  export { SelfApp, SelfAppBuilder } from '@selfxyz/common/utils/appType';
  export { countries } from '@selfxyz/common/constants/countries';
  
  interface SelfQRcodeProps {
    selfApp: SelfApp;
    onSuccess: () => void;
    onError: (data: {
      error_code?: string;
      reason?: string;
    }) => void;
    type?: 'websocket' | 'deeplink';
    websocketUrl?: string;
    size?: number;
    darkMode?: boolean;
    children?: React.ReactNode;
  }

  export const SelfQRcodeWrapper: React.ComponentType<SelfQRcodeProps>;
  export const SelfQRcode: React.ComponentType<SelfQRcodeProps>;
} 