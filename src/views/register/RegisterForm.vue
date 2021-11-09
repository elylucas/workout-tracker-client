<template>
  <form
    @submit.prevent="register"
    class="p-8 flex flex-col bg-light-grey rounded-md shadow-lg"
    novalidate
  >
    <h1 class="text-3xl text-at-light-green mb-4">Register</h1>
    <div class="flex flex-col mb-2">
      <label for="email" class="mb-1 text-sm text-at-light-green">Email</label>
      <input
        type="text"
        required
        class="p-2 text-gray-500 focus:outline-none"
        id="email"
        v-model="email"
      />
      <p class="text-red-500 mt-2" v-if="submitted && !email">
        Email is required.
      </p>
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
      <p class="text-red-500 mt-2" v-if="submitted && !password">
        Password is required.
      </p>
    </div>

    <div class="flex flex-col mb-2">
      <label for="confirmPassword" class="mb-1 text-sm text-at-light-green"
        >Confirm Password</label
      >
      <input
        type="password"
        required
        class="p-2 text-gray-500 focus:outline-none"
        id="confirmPassword"
        v-model="confirmPassword"
      />
      <p class="text-red-500 mt-2" v-if="submitted && !confirmPassword">
        Confirm Password is required.
      </p>
    </div>
    <p
      class="text-red-500 mt-2"
      v-if="submitted && inputsFilled && password !== confirmPassword"
    >
      Passwords do not match.
    </p>
    <Button class="mt-6" :disabled="submitted && !formValid">Register</Button>
    <router-link class="mt-6 text-sm-mt-6 text-center" :to="{ name: 'Login' }">
      Already have an account?
      <span class="text-at-light-green">Login</span>
    </router-link>
  </form>
</template>

<script lang="ts">
import { computed, ref, defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'register-form',
  // emits: ['register'],
  props: {
    onRegister: {
      type: Function as PropType<(email: string, password: string) => void>,
      required: true,
    },
  },
  setup(props) {

    const email = ref<string>();
    const password = ref<string>();
    const confirmPassword = ref<string>();
    const errorMsg = ref<string>();
    const submitted = ref(false);

    const inputsFilled = computed(() => {
      return !!(email.value && password.value && confirmPassword.value);
    });

    const formValid = computed(() => {
      return !!(inputsFilled.value && password.value === confirmPassword.value);
    });

    const register = async () => {
      if (formValid.value && password.value === confirmPassword.value) {
        props.onRegister(email.value!, password.value!);
        // emit('register', email.value!, password.value!);
      } else if (formValid.value && password.value !== confirmPassword.value) {
        errorMsg.value = 'Error: Passwords do not match';
        setTimeout(() => {
          errorMsg.value = undefined;
        }, 5000);
      }
      submitted.value = true;
    };

    return {
      email,
      password,
      confirmPassword,
      register,
      submitted,
      formValid,
      inputsFilled,
    };
  },
});
</script>
