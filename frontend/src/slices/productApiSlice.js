import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "/product/allproducts",
      providesTags: ["Product"],
    }),
    getLatestProducts: builder.query({
      query: () => "/product/latestproduct",
      providesTags: ["Product"],
    }),
    getSingleProduct: builder.query({
      query: (slug) => `/product/product/${slug}`,
      providesTags: (result, error, slug) => [{ type: "Product", id: slug }],
    }),
    createProduct: builder.mutation({
      query: (data) => ({
        url: "/product/createproduct",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Product", "Dashboard"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/product/deleteproduct/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product", "Dashboard"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetLatestProductsQuery,
  useGetSingleProductQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} = productApiSlice;
