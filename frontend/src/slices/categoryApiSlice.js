import { apiSlice } from "./apiSlice";

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => "/category/allcategory",
      providesTags: ["Category"],
    }),
    createCategory: builder.mutation({
      query: (data) => ({
        url: "/category/createcategory",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Category", "Dashboard"],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/category/deletecategory/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category", "Dashboard"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApiSlice;
