import { createAuthClient } from "better-auth/vue";

const authClient = createAuthClient();

type SignInForm = {
  email: string;
  password: string;
};

export const useAuthStore = defineStore("useAuthStore", () => {
  const session = ref<Awaited<ReturnType<typeof authClient.useSession>> | null>(null);

  async function init() {
    const data = await authClient.useSession(useFetch);
    session.value = data;
  }

  const user = computed(() => session.value?.data?.user);
  const loading = computed(() => session.value?.isPending);

  async function signIn(form: SignInForm) {
    await authClient.signIn.email({
      email: form.email,
      password: form.password,
      rememberMe: true,
      callbackURL: "/auth/callback",
    });
  }

  async function signOut() {
    await authClient.signOut();
    navigateTo("/");
  }
  return {
    // state
    session,
    user,
    loading,

    // actions
    signIn,
    signOut,
    init,
  };
});
