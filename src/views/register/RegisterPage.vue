<template>
  <div class="max-w-screen-sm mx-auto px-4 py-10">
    <div v-if="errorMsg" class="mb-10 p-4 rounded-md bg-light-gray shadow-lg">
      <p class="text-red-500">{{ errorMsg }}</p>
    </div>
    <RegisterForm @register="handleRegister" />
  </div>
</template>

<script lang="ts">
import { supabase } from '@/supabase/init';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import RegisterForm from './RegisterForm.vue';
export default {
  name: 'register-page',
  components: {
    RegisterForm,
  },
  setup() {
    const errorMsg = ref<string>();
    const router = useRouter();

    // Register function
    const handleRegister = async (email: string, password: string) => {
      try {
        const { error } = await supabase.auth.signUp({
          email: email,
          password: password,
        });
        if (error) {
          throw error;
        }
        router.push({ name: 'Home' });
      } catch (e: any) {
        errorMsg.value = e.message;
      }
    };

    return {
      errorMsg,
      handleRegister,
    };
  },
};
</script>
