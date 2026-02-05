export function useToast() {
  const toast = ref<Toast>({
    message: "",
    type: "info",
    show: false,

  });
  const setToast = (payload: Partial<Toast>) => {
    toast.value = {
      ...toast.value,
      ...payload,
    };
    setTimeout(() => {
      toast.value.show = false;
    }, 1500);
  };
  return {
    setToast,
    toast,
  };
}
export type Toast = {
  message: string | object;
  type: "info" | "success" | "warning" | "error";
  show: boolean;
};
