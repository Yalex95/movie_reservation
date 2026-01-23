<template>
  <div class="container mx-auto py-4 px-6  flex-col flex flex-1 min-h-0 overflow-auto ">
    <AppMovieFilter />
    <AppMovieGrid :movies="['movie','movie','movie','movie']" />
  </div>
</template>
