import type { selectMovie } from "~/lib/db/schema";

export const useMovieStore = defineStore("movies", () => {
  // const movies = ref([]);
  const page = ref(1);
  const pageSize = 20;
  // const total = ref(0);

  const loading = ref(false);
  const error = ref(null);

  const search = ref("");
  const filters = reactive({
    genre: null,
    year: null,
    rating: null,
  });

  const query = computed(() => ({
    page: page.value,
    limit: pageSize,
    search: search.value,
    ...filters,
  }));
  const { data: movies, status: movieStatus, error: moviesError, refresh: refreshMovies } = useFetch<selectMovie[]>("/api/movies", {
    default:()=>[],
    lazy: true,
    immediate: false,
    watch: false,
    query,
  });

  console.log("Movies:", movies.value);
 

  return {
    movies,
    movieStatus,
    moviesError,
    refreshMovies,
    loading,
    error,
    search,
    filters,

  };
});
