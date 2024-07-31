import type { Plugin } from '@modern-js/runtime';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { SSRLiveReload } from './SSRLiveReload';
console.log('mfSSRPlugin trigger');
export const mfSSRPlugin = ({ metaName }: { metaName: string }): Plugin => ({
  name: '@module-federation/modern-js',
  pre: [`@${metaName}/plugin-router`],
  setup: () => {
    return {
      async beforeRender() {
        console.log('live reload beforeRender');
        if (typeof window !== 'undefined') {
          return;
        }
        globalThis.shouldUpdate = false;
        const nodeUtils = await import('@module-federation/node/utils');
        const shouldUpdate = await nodeUtils.revalidate();
        if (shouldUpdate) {
          console.log('should RELOAD', shouldUpdate);
          await nodeUtils.flushChunks();
          globalThis.shouldUpdate = true;
        }
        return;
      },
      wrapRoot(App) {
        console.log('live reload wrapRoot');
        const AppWrapper = (props: any) => (
          <>
            <SSRLiveReload />
            <App {...props} />
          </>
        );
        return hoistNonReactStatics(AppWrapper, App);
      },
    };
  },
});
