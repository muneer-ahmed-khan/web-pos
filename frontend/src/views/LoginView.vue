<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useTokenManager } from "@/composable/useTokenManager";
import { useAuth } from "@/composable/useAuth";

const router = useRouter();
const { setToken } = useTokenManager();
const { loginUser } = useAuth();

const username = ref("coding_challenge_1");
const password = ref("coding_challenge_1");
const loading = ref(false);
const error = ref(false);

const signIn = async () => {
  loading.value = true;

  const body = {
    username: username.value,
    password: password.value,
  };

  try {
    const data = await loginUser(body);
    if (data) {
      const { token, expireDate } = data;

      setToken({ token, expireDate });
      router.push("/");
    } else {
      error.value = true;
    }
  } catch (error: any) {
    console.error("Error signing in:", error);

    error.value = true;
  } finally {
    loading.value = false;
  }
};
</script>
<template>
  <div class="flex flex-col lg:flex-row h-screen">
    <!-- Left side: Logo and title -->
    <div class="flex justify-center items-center lg:w-1/2 lg:mb-28">
      <div>
        <img
          class="h-25 w-25s mx-auto mb-10 sm:mt-28 md:mt-7"
          style="margin-top: 7rem"
          src="@/assets/munero-logo.png"
          alt="munero-logo"
        />
        <div class="text-center lg:text-left">
          <div class="text-5xl font-bold mb-2 text-center">Welcome</div>
          <div class="text-xl font-normal">
            to the Web-based Point of Sale Application
          </div>
        </div>
      </div>
    </div>

    <!-- Right side: Login Form -->
    <div class="flex-1 flex justify-center items-center lg:w-1/2">
      <div class="bg-white rounded-xl shadow-md p-6 lg:p-10 w-full lg:max-w-md">
        <h2 class="text-3xl text-blue-700 font-semibold mb-6">
          Login to Your Account
        </h2>

        <div class="login-fields mb-6">
          <input
            v-model="username"
            type="text"
            placeholder="Username"
            class="input-field mb-4 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:border-indigo-500"
          />
          <input
            v-model="password"
            type="password"
            placeholder="Password"
            class="input-field mb-4 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div class="w-full h-px bg-gray-400 mb-6"></div>

        <button
          @click="signIn"
          :disabled="!username || !password"
          class="w-full py-3 bg-indigo-600 text-white font-semibold rounded-md focus:outline-none hover:bg-indigo-700"
          :class="{ 'opacity-50 cursor-not-allowed': loading }"
        >
          <span v-if="!loading" class="font-semibold text-xl">Sign In</span>
          <span v-else>Loading...</span>
        </button>

        <div v-if="error" class="text-red-500 mt-4">
          Invalid username or password
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.input-field {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  margin-bottom: 1rem;
}

.input-field:focus {
  outline: none;
  border-color: #4f46e5;
}
</style>
