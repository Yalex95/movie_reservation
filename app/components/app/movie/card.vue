<template>
  <div class="card bg-base-100  shadow-sm">
    <div class="relative w-full h-96 rounded-t-md">
      <div class="flex w-full justify-between z-1 top-0 left-0 p-2 absolute">
        <div class="badge badge-primary ">
          NEW
        </div>
        <div class="badge badge-neutral text-yellow-300">
          <Icon name="heroicons:star-16-solid"/>
          5.0
        </div>
      </div>
      <img
        src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
        class="h-full w-full object-cover rounded-t-md"
        alt="Shoes"
      >
    </div>
    <div class="card-body">
      <h2 class="card-title">
        Interestelar Voyage
      </h2>
      <div class="flex justify-between items-center">
        <ul>
          <li>Sci-fi</li>
          <li>Sci-fi</li>
        </ul>
        <div class="inline-flex items-center gap-2">
          <Icon name="heroicons:clock-solid" />
          <p>3h 22m</p>
        </div>
      </div>
      <!-- <p>A card component has a figure, a body part, and inside body there are title and actions parts</p> -->
      <!-- <div class="card-actions justify-end">
        <button class="btn btn-primary">
          Buy Now
        </button>
      </div> -->
    </div>
  </div>
</template>
