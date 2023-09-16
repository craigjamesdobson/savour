<script setup lang="ts">
definePageMeta({
  layout: "login",
});

import Button from "primevue/button";

const supabase = useSupabaseClient();
const user = useSupabaseUser();

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
});

const signInWithOtp = async () => {
  const { error, data } = await supabase.auth.signInWithOtp({
    email: state.value.email,
    options: {
      emailRedirectTo: `${process.env.SITE_URL}/confirm`,
    },
  });
  if (error) console.log(error);
  console.log(data);
};
</script>
<template>
    <div class="flex flex-col gap-5">
      <label for="username">Email</label>
      <input
      type="text"
        id="username"
        v-model="state.email"
        aria-describedby="email-help"
        class="text-sm"
      />
      <small id="username-help"
        >Fill in your email address and click submit and you will be sent a
        one-time password link to login.</small
      >
      <Button @click="signInWithOtp" label="Submit" />
    </div>
</template>
