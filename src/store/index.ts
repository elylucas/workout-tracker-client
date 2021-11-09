import { User } from '@/models/User';
import { Session } from '@supabase/supabase-js';
import { reactive } from 'vue';

const state = reactive<{ user?: User }>({
  user: undefined,
});

const methods = {
  setUser(payload: Session | null): void {
    // eslint-disable-next-line no-debugger
    // debugger;
    state.user = payload ? payload.user! : undefined;
  },
};

export default {
  state,
  methods,
};
