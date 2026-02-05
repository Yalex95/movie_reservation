<script lang="ts" setup generic="T extends Password">
import type { Password } from "~~/lib/types";
import type { FetchError } from "ofetch";
import type { ZodType } from "zod";

import { toTypedSchema } from "@vee-validate/zod";

const props = defineProps<{
  // initialValues: T;// T
  schema: ZodType<T>;
  onSubmit: (password: T) => Promise<any>;
  submitLabel: string;
}>();
const submitted = ref(false);
const submitError = ref("");
const loading = ref(false);

const { handleSubmit, errors, setErrors, meta } = useForm({
  validationSchema: toTypedSchema(props.schema),
});
const onSubmit = handleSubmit(async (values: T) => {
  try {
    submitError.value = "";
    await props.onSubmit(values);
    submitted.value = true;
  }
  catch (e) {
    const error = e as FetchError;
    if (error.data?.data) {
      setErrors(error.data?.data);
    }
    submitError.value = getFetchErrorMessage(error);
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
  <div
    v-if="submitError"
    role="alert"
    class="alert alert-error mt-3"
  >
    <span>{{ submitError }}</span>
  </div>
  <form class="grid grid-cols-2 gap-6" @submit.prevent="onSubmit">
    <slot :errors="errors" :loading="loading" />

    <button
      class="btn btn-info text-white w-fit col-span-2"
      :disabled="loading"
    >
      {{ submitLabel }}
      <span v-if="loading" class="loading loading-spinner loading-xs" />
    </button>
  </form>
</template>
