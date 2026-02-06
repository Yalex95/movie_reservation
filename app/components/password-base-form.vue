<script lang="ts" setup generic="T extends Password">
import type { Password } from "~~/lib/types";
import type { FetchError } from "ofetch";
import type { ZodType } from "zod";

import { toTypedSchema } from "@vee-validate/zod";

const props = defineProps<{
  schema: ZodType<T>;
  onSubmit: (password: T) => Promise<any>;
  submitLabel: string;
}>();
const { setToast, toast } = useToast();

const submitted = ref(false);
const loading = ref(false);

const { handleSubmit, errors, setErrors, meta } = useForm({
  validationSchema: toTypedSchema(props.schema),
});
const onSubmit = handleSubmit(async (values: T) => {
  try {
    loading.value = true;
    await props.onSubmit(values);
    submitted.value = true;
    setToast({
      message: "Password updated succesfully",
      type: "success",
      show: true,
    });
  }
  catch (e) {
    const error = e as FetchError;
    if (error.data?.data) {
      setErrors(error.data?.data);
    }
    setToast({
      message: getFetchErrorMessage(error),
      type: "error",
      show: true,
    });
  }
  loading.value = false;
},
);
onBeforeRouteLeave(() => {
  if (!submitted.value && meta.value.dirty) {
    // eslint-disable-next-line no-alert
    const isConfirmed = window.confirm("Are you sure you want to leave? All unsaved changes will be lost.");
    if (!isConfirmed) {
      return false;
    }
  }
  return true;
});

</script>

<template>
  <AppToast
    :show="toast.show"
    :label="toast.message"
    :alert-type="toast.type"
  />
  <form class="grid grid-cols-2 gap-6" @submit.prevent="onSubmit">
    <slot :errors="errors" :loading="loading" />
    
    <button
      type="submit"
      class="btn btn-info text-white w-fit col-span-2"
      :disabled="loading"
    >
      {{ submitLabel }}
      <span v-if="loading" class="loading loading-spinner loading-xs" />
    </button>
  </form>
</template>
