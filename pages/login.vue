<script setup lang="ts">
definePageMeta({
  layout: "login",
});

const supabase = useSupabaseClient();
const user = useSupabaseUser();
import { useToast } from "primevue/usetoast";
const toast = useToast();

watch(
  user,
  () => {
    if (user.value) {
      return navigateTo("/");
    }
  },
  { immediate: true }
);

const state = ref({
  email: "",
  password: "",
});

const errorLog = ref(null);

const signInWithUserAndPassword = async () => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: state.value.email,
    password: state.value.password,
  });
  if (error) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: error.message,
      life: 3000,
    });
  } else {
    toast.add({
      severity: "success",
      detail: `An email has been sent to ${state.value.email}`,
      life: 3000,
    });
  }
};
</script>
<template>
  <Toast />
  <div class="flex flex-col gap-5">
    <label for="username">Email</label>
    <input
      type="text"
      id="username"
      v-model="state.email"
      aria-describedby="email-help"
      class="p-2 text-sm border rounded-md"
    />
    <input
      type="password"
      id="password"
      v-model="state.password"
      class="p-2 text-sm border rounded-md"
    />
    <small id="username-help">Fill in your details and click submit.</small>
    <button
      class="p-2 text-white rounded-lg bg-primary"
      @click="signInWithUserAndPassword"
    >
      Submit
    </button>
    <Message v-if="errorLog" severity="error">{{ errorLog }}</Message>
  </div>
</template>
