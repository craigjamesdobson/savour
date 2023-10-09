import { defineStore } from "pinia";
import { Database } from "~/types/database.types";

export const useAccountStore = defineStore("account", () => {
  const supabase = useSupabaseClient<Database>();

  const user = ref();
  const dataLoaded: Ref<boolean> = ref(false);

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
