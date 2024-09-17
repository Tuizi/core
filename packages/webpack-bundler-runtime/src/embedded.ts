import * as runtime from '@module-federation/runtime/embedded';
import { Federation } from './types';
import { remotes } from './remotes';
import { consumes } from './consumes';
import { initializeSharing } from './initializeSharing';
import { installInitialConsumes } from './installInitialConsumes';
import { attachShareScopeMap } from './attachShareScopeMap';
import { initContainerEntry } from './initContainerEntry';

export * from './types';
//@ts-ignore
// const federationInstance = new globalThis.sharedRuntime.FederationManager();
// const runtime = {
//   //@ts-ignore
//   ...globalThis.sharedRuntime,
//   ...federationInstance.getMethods(),
// };
// debugger;
const federation: Federation = {
  runtime,
  instance: undefined,
  initOptions: undefined,
  bundlerRuntime: {
    remotes,
    consumes,
    I: initializeSharing,
    S: {},
    installInitialConsumes,
    initContainerEntry,
  },
  attachShareScopeMap,
  bundlerRuntimeOptions: {},
};
export default federation;
