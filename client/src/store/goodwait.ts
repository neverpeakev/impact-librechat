import { createStorageAtom } from './jotai-utils';

/** Per-user opt-out for the Goodwait sponsored line; the operator switch is `GOODWAIT`. */
export const showGoodwaitAtom = createStorageAtom<boolean>('showGoodwait', true);
