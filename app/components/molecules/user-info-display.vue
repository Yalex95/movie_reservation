<script lang="ts" setup>
import type { AppUser } from "~~/lib/types";

// Props específicas del dominio (aceptable en molécula)
const props = defineProps<{
  user: AppUser | null | undefined;
  showRole?: boolean;
  nameSize?: "xs" | "sm" | "base" | "lg";
  roleSize?: "xs" | "sm";
}>();

const userName = computed(() => props.user?.name ?? "Usuario");
const userRole = computed(() => props.user?.role ?? "user");
</script>

<template>
  <AtomsBox
    direction="col"
    justify="center"
    align="end"
    :gap="1"
  >
    <AtomsText :size="nameSize || 'sm'" bold>
      {{ userName }}
    </AtomsText>

    <AtomsText
      v-if="showRole !== false"
      variant="muted"
      :size="roleSize || 'sm'"
      uppercase
    >
      {{ userRole }}
    </AtomsText>
  </AtomsBox>
</template>
