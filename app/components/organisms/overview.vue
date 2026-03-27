<script lang="ts" setup>
import type { AppUser } from "~~/lib/types";

defineProps<{ user: AppUser }>();
</script>

<template>
  <div class="p-4 flex flex-col gap-6">

    <section>
      <AppHeader header="Personal information" icon="material-symbols-light:person-2-rounded" />
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 ">
        <article class="border border-base-300 bg-base-200 rounded-md p-4">
          <p class="uppercase text-gray-600 font-semibold">
            Email Address
          </p>
          <p>
            {{ user?.email }}
          </p>
        </article>
        <article class="border border-base-300 bg-base-200 rounded-md p-4">
          <p class="uppercase text-gray-600 font-semibold">
            Phone number
          </p>
          <p>
            {{ user?.phone }}
          </p>
        </article>
        <article class="border border-base-300 bg-base-200 rounded-md p-4">
          <p class="uppercase text-gray-600 font-semibold">
            Joined Date
          </p>
        </article>
        <article class="border border-base-300 bg-base-200 rounded-md p-4">
          <p class="uppercase text-gray-600 font-semibold">
            Location
          </p>
        </article>
      </div>
    </section>
    <section >
      <AppHeader header="Security Role & Access" icon="material-symbols:security" />
      <article class="border border-base-200 bg-base-200 rounded-md flex gap-6 p-4 ">
        <Icon name="material-symbols:security" size="36"/>
        <div class="flex-1">
          <h3 class="text-lg font-semibold">System Administration</h3>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia minus dolores unde alias libero id incidunt quia! Debitis veritatis in similique provident rem repellat earum voluptate aliquid, nesciunt, voluptatem alias.</p>

        </div>
      </article>
    </section>
    <section>
      <AppHeader header="Last Login Details" icon="streamline-ultimate:synchronize-arrows-three-bold" />
      <MoleculesTable :headers="['device', 'ip address', 'time', 'status']">
        <template #body>
          <tr>
            <td>Chrome on MacOS</td>
            <td>192.100.32.10</td>
            <td>Today, 09:12 Am</td>
            <td>
              <div class="badge badge-soft badge-success">
                Success
              </div>
            </td>
          </tr>
        </template>
      </MoleculesTable>
    </section>
  </div>
</template>
