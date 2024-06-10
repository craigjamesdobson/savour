import { defineStore } from "pinia";
import { Database } from "~/types/database.types";

export const useAccountStore = defineStore("account", () => {
  const supabase = useSupabaseClient<Database>();

  const user = ref();
  const dataLoaded: Ref<boolean> = ref(false);

  const fetchUser = async () => {
    const { data: auth } = await supabase.auth.getUser();
    const { data: profile } = await supabase
      .from("profiles")
      .select(
        `
          id,
          first_name,
          last_name,
          user_group,
          is_admin
        `
      )
      .eq("id", auth.user?.id)
      .maybeSingle();

    user.value = profile;
    user.value.email = auth.user?.email
    dataLoaded.value = true;
  };

  const isLoaded = computed(() => dataLoaded.value);

  return {
    user,
    dataLoaded,
    isLoaded,
    fetchUser,
  };
});
