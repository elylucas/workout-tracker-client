<template>
  <div class="max-w-screen-sm mx-auto px-4 py-10">
    <div v-if="errorMsg" class="mb-10 p-4 rounded-md bg-light-gray shadow-lg">
      <p class="text-red-500">{{ errorMsg }}</p>
    </div>
    <form
      @submit.prevent="login"
      class="p-8 flex flex-col bg-light-grey rounded-md shadow-lg"
    >
      <h1 class="text-3xl text-at-light-green mb-4">Login</h1>
      <div class="flex flex-col mb-2">
        <label for="email" class="mb-1 text-sm text-at-light-green"
          >Email</label
        >
        <input
          type="text"
          required
          class="p-2 text-gray-500 focus:outline-none"
          id="email"
          v-model="email"
        />
      </div>

      <div class="flex flex-col mb-2">
        <label for="password" class="mb-1 text-sm text-at-light-green"
          >Password</label
        >
        <input
          type="password"
          required
          class="p-2 text-gray-500 focus:outline-none"
          id="password"
          v-model="password"
        />
      </div>
      <Button class="mt-6">Login</Button>

      <router-link
        class="mt-6 text-sm-mt-6 text-center"
        :to="{ name: 'Register' }"
      >
        Don't have an account?
        <span class="text-at-light-green">Register</span>
      </router-link>
    </form>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { supabase } from '../supabase/init';
import { useRouter } from 'vue-router';

export default {
  name: 'login',
  setup() {
    // Create data / vars
    const email = ref<string>();
    const password = ref<string>();
    const errorMsg = ref<string>();
    const router = useRouter();

    // Login function
    const login = async () => {
      try {
        let data = await supabase.auth.signIn({
          email: email.value,
          password: password.value,
        });
        console.log(data);
        if (data.error) {
          throw data.error;
        }
        router.push({ name: 'Home' });
      } catch (error: any) {
        errorMsg.value = `Error: ${error.message}`;
        setTimeout(() => {
          errorMsg.value = undefined;
        }, 5000);
      }
    };

    return { email, password, errorMsg, login };
  },
};
</script>
