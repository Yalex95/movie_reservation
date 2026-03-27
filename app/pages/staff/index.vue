<script setup lang="ts">
import _ from "lodash";

definePageMeta({
  layout: "authenticated",
});
const headers = [
  "user",
  "role",
  "status",
  "actions",
];

const router = useRouter();
const route = useRoute();
const query = computed(() => route.query);

type Filters = {
  status?: string;
  banned?: string;
  search?: string;
};

const filters = ref<Filters>({ search: "" });

Object.entries(route.query).forEach(([key, value]) => {
  if (typeof value === "string") {
    filters.value[key as keyof Filters] = value;
  }
});

const { data: users } = await useFetch("/api/users", {
  method: "GET",
  query,
});

function verifyFilterType(value: string) {
  switch (value) {
    case "active":
      return "status";
    case "banned":
      return "banned";
    case "all-users":
      return null;
    default:
      return null;
  }
}

function applyButtonFilter(value: string) {
  const key = verifyFilterType(value);

  if (!key) {
    delete filters.value.status;
    delete filters.value.banned;
    delete filters.value.search;
  }
  else {
    filters.value[key] = value;
  }

  const query = _.cloneDeep(filters.value);
  router.replace({
    path: route.path,
    query,
  });
}

const onSearch = _.debounce((value: string) => {
  if (!value) {
    delete filters.value.search;
  }
  else {
    filters.value.search = value;
  }
  const query = _.cloneDeep(filters.value);
  router.replace({
    path: route.path,
    query,
  });
}, 700);

const btns = [
  {
    label: "all users",
    value: "all-users",
    active: true,
  },
  {
    label: "Active",
    value: "active",
    active: false,
  },
  {
    label: "Inactive",
    value: "inactive",
    active: false,
  },
];

const activeValues = computed<(string)[]>(() => {
  const values = Object.values(route.query);
  return values.flatMap(v => Array.isArray(v) ? v : [v]).filter((v): v is string => typeof v === "string");
});

function handlePagination(page: number | undefined, direction: string) {
  if (direction === "previuos" && page)
    page--;
  else if (direction === "next" && page)
    page++;
  router.replace({ path: route.path, query: { page } });
}
</script>

<template>
  <div class="flex-1 flex min-h-0">
    <div class="container mx-auto p-10 gap-10 flex-col flex flex-1 min-h-0 overflow-auto">
      <div>
        <h1 class="text-3xl font-bold mb-2">
          User Management
        </h1>
        <p>Manage and monitor cinema staff accounts, permissions and security roles</p>
      </div>
      <Filter
        v-model="filters.search"
        search-placeholder="Search by email, name or specific role...."
        :btn-group="btns"
        button-class="btn-soft"
        :active-values
        @btn-click="applyButtonFilter"
        @update:model-value="(value) => onSearch(value)"
      />
      <MoleculesTable
        :headers
      >
        <template #body>
          <tr v-if="users?.data.length === 0">
            <td colspan="4" class="text-center">
              No users to show
            </td>
          </tr>
          <tr
            v-for="user in users?.data"
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
              <button class="btn btn-square btn-ghost" onclick="bann.showModal()">
                <Icon name="material-symbols:person-off" size="20" />
              </button>
              <NuxtLink :to="`/staff/${user.id}`" class="btn btn-square btn-ghost">
                <Icon name="gridicons:visible" size="20" />
              </NuxtLink>
            </td>
          </tr>
        </template>
        <template #footer>
          <tr>
            <td colspan="2">
              Showing <strong>{{ users?.pagination.total }}</strong> to <strong>{{ users?.pagination.limit }}</strong> of <strong>{{ users?.pagination.totalPages }}</strong> results
            </td>

            <td colspan="2" class="text-end">
              <div class="join">
                <button

                  class="join-item btn"
                  :disabled="Number(users?.pagination.page) === 1"
                  @click="handlePagination(users?.pagination.page, 'previous')"
                >
                  «
                </button>
                <button class="join-item btn">
                  {{ users?.pagination.page }}
                </button>
                <button
                  :disabled="Number(users?.pagination.page) === users?.pagination.totalPages || users?.pagination.totalPages === 0"
                  class="join-item btn"
                  @click="handlePagination(users?.pagination.page, 'next')"
                >
                  »
                </button>
              </div>
            </td>
          </tr>
        </template>
      </MoleculesTable>
      <AppModal id="bann">
        <Icon name="material-symbols:group-remove" size="24" />
        <h3 class="text-lg font-bold">
          Temporarly bann this user?
        </h3>
        <button>cancel</button>
        <button>confirm remove</button>
      </AppModal>
    </div>
  </div>
</template>
