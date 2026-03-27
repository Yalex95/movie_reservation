<script lang="ts" setup>
import type { NavItemLink, Tab } from "~~/lib/types";

import OrganismsOverview from "~/components/organisms/overview.vue";
import OrganismsPermissions from "~/components/organisms/permissions.vue";

const route = useRoute();
definePageMeta({
  layout: "authenticated",
});

const { data: user } = await useFetch(`/api/user/${route.params.id}`, {
  method: "GET",
});

const tabs: Array<Tab> = [
  {
    label: "Overview",
    component: OrganismsOverview,
    props: { user: user.value },
  },
  {
    label: "Permissions",
    component: OrganismsPermissions,
    props: { user: user.value },

  },
];
const currentTab = ref(0);

const breadCrumbs: Array<NavItemLink> = [
  {
    id: "staff",
    label: "Staff",
    to: "/staff",
  },
  {
    id: "user",
    label: user?.value?.name || "",
    to: route.path,
  },
];
</script>

<template>
  <div class="flex-1 flex-col flex min-h-0 mx-auto px-10 py-4">
    <div class="container flex justify-between ">
      <AppBreadcrumb :bread-crumbs />
    </div>
    <div class="container   gap-6 flex flex-1 min-h-0 overflow-auto">
      <div class="w-1/4 grid grid-cols-1 gap-6">
        <div class="card bg-base-100 rounded-md  shadow-sm  items-center p-10 gap-4">
          <AtomsAvatar :avatar="user?.image" :name="user?.name" />
          <div class="card-body w-full items-center  p-0">
            <h2 class="card-title">
              {{ user?.name }}
            </h2>

            <p>{{ user?.email }}</p>
            <div class="grid grid-cols-2 w-full pt-8 gap-y-4">
              <p><b class="capitalize">Role</b></p>
              <p class="text-end text-blue-400 capitalize font-bold">
                {{ user?.role }}
              </p>
              <p><b class="capitalize">Last session</b></p>
              <p class="text-end">
                {{ user?.last_login_at }}
              </p>
            </div>
          </div>
        </div>
        <div class="p-4 border border-red-600  rounded-md bg-base-100 h-fit">
          <p class="uppercase text-base text-red-600 font-bold">
            Danger zone
          </p>
          <p class="text-red-700 text-sm">
            Temporarly prevent this user from accessing the system. All current sessions will be terminated
          </p>
          <button class="bg-red-600  font-semibold  btn mt-3 w-full">
            Susspend account
          </button>
        </div>
      </div>
      <div class="border border-base-300 rounded-md bg-base-100 flex-1  overflow-auto">
        <AppTab
          v-model="currentTab"
          :tabs="tabs"
        />
        <component
          :is="tabs[currentTab]?.component"
          :key="tabs[currentTab]?.component"
          v-bind="tabs[currentTab]?.props"
        />
      </div>
    </div>
  </div>
</template>
