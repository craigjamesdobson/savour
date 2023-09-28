import { defineStore } from "pinia";

export const useAccountStore = defineStore("account", () => {
  const supabase = useSupabaseClient();

  const user = ref(null);
  const dataLoaded = ref(false);

  const fetchUser = async () => {
    const { data } = await supabase.auth.getUser()
    user.value = data.user
  };

  const isLoaded = computed(() => dataLoaded.value);

  return {
    user,
    dataLoaded,
    isLoaded,
    fetchUser,
  };
});
