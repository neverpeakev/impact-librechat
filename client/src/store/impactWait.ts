import { createStorageAtom } from './jotai-utils';

/** Per-user opt-out for the ImpactWait sponsored line; the operator switch is `IMPACT_WAIT`. */
export const showImpactWaitAtom = createStorageAtom<boolean>('showImpactWait', true);
