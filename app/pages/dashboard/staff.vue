<script setup lang="ts">
definePageMeta({
  layout: "authenticated",
});
const headers = [
  "user",
  "role",
  "status",
  "actions",
];
const route = useRoute();
const query = computed(() => route.query);
const { data: users, error, status } = await useFetch("/api/users", {
  method: "GET",
  query,
});
</script>

<template>
  <div class="flex-1 flex min-h-0">
    <div class="container mx-auto py-10 gap-10 flex-col flex flex-1 min-h-0 overflow-auto">
      <div>
        <h1 class="text-3xl font-bold mb-2">
          User Management
        </h1>
        <p>Manage and monitor cinema staff accounts, permissions and security roles</p>
      </div>
      <AppTable
        :headers
      >
        <template #body>
          <tr v-if="users?.length === 0">
            <td colspan="4" class="text-center">
              No users to show
            </td>
          </tr>
          <tr
            v-for="user in users"
            v-else
            :key="user.id"
            class="hover:bg-base-300"
          >
            <td>{{ user.name }}</td>
            <th>
              <div class="badge badge-outline badge-secondary">
                {{ user.role }}
              </div>
            </th>
            <td>
              <div class="badge badge-success ">
                <Icon name="pajamas:status-active" size="6" /> {{ user.banned ? 'inactive' : 'active' }}
              </div>
            </td>
            <td>
              <button class="btn btn-square btn-ghost">
                <Icon name="material-symbols:edit-outline" size="20" />
              </button>
              <button class="btn btn-square btn-ghost">
                <Icon name="material-symbols:person-off" size="20" />
              </button>
              <button class="btn btn-square btn-ghost">
                <Icon name="gridicons:visible" size="20" />
              </button>
            </td>
          </tr>
        </template>
        <template #footer>
          <tr>
            <td colspan="2">
              Showing <strong>1</strong> to <strong>5</strong> of <strong>150</strong> results
            </td>

            <td colspan="2" class="text-end">
              <div class="join">
                <button class="join-item btn">
                  «
                </button>
                <button class="join-item btn">
                  Page 22
                </button>
                <button class="join-item btn">
                  »
                </button>
              </div>
            </td>
          </tr>
        </template>
      </AppTable>
    </div>
  </div>
</template>
