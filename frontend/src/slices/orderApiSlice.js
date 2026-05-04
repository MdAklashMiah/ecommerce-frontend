import { apiSlice } from "./apiSlice";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => "/order/allorder",
      providesTags: ["Order"],
    }),
    getUserOrders: builder.query({
      query: (id) => `/order/userorder/${id}`,
      providesTags: ["Order"],
    }),
    createOrder: builder.mutation({
      query: (data) => ({
        url: "/order/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Order", "Dashboard"],
    }),
    updateOrderStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/order/updateorder/${id}`,
        method: "PATCH",
        body: { orderStatus: status },
      }),
      invalidatesTags: ["Order", "Dashboard"],
    }),
    getDashboardStats: builder.query({
      query: () => "/dashboard/stats",
      providesTags: ["Dashboard"],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetUserOrdersQuery,
  useCreateOrderMutation,
  useUpdateOrderStatusMutation,
  useGetDashboardStatsQuery,
} = orderApiSlice;
