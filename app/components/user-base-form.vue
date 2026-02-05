<script setup lang="ts" generic="T extends Profile">
import type { Profile } from "~~/lib/types";
import type { FetchError } from "ofetch";
import type { ZodType } from "zod";

const props = defineProps<{
  initialValues: T;
  schema: ZodType<T>;
  onSubmit: (profile: T) => Promise<any>;
  submitLabel: string;
}>();

const submitted = ref(false);
const submitError = ref("");
const loading = ref(false);

const { handleSubmit, errors, setErrors, meta } = useForm({
  validationSchema: toTypedSchema(props.schema),
  initialValues: props.initialValues,
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
});

onBeforeRouteLeave(() => {
  if (!submitted.value && meta.value.dirty) {
    // eslint-disable-next-line no-alert
    const isConfirmed = window.confirm("Are you sure you want to leave? all unsave changes will be lost.");
    if (!isConfirmed)
      return false;
  }
  return true;
});
</script>

<template>
  <form
    class="grid grid-cols-2 gap-6"
    @submit.prevent="onSubmit"
  >
    <slot :errors="errors" :loading="loading" />
    <div class="col-span-2 flex justify-end gap-3">
      <button
        class="btn btn-info text-white w-fit "
        :disabled="loading"
      >
        {{ submitLabel }}
        <span v-if="loading" class="loading loading-spinner loading-xs" />
      </button>
      <button
        class="btn btn-outline btn-error text-white w-fit "
        disabled
      >
        Change Email
      </button>
    </div>
  </form>
</template>
