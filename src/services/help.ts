import type { CreateHowTo, CreateHowToResponse, GetAllHowTosResponse, GetOneHowToResponse } from '@/types';
import { baseApi } from '@/store/api/baseApi';
import { getBaseUrl } from '@/utils/Helpers';

// Every other admin-scoped service prefixes with /api/admin; this one was
// left on the bare /api default and 404'd as a result (confirmed live).
const baseUrl = getBaseUrl('/api/admin');

export const howtosApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    createHowTo: builder.mutation<CreateHowToResponse, CreateHowTo[]>({
      query: body => ({
        url: `${baseUrl}/howtos`,
        method: 'POST',
        body,
      }),
    }),

    getAllHowTos: builder.query<GetAllHowTosResponse, { page?: number; pageSize?: number }>({
      query: ({ page = 1, pageSize = 10 }) => ({
        url: `${baseUrl}/howtos`,
        params: { page, pageSize },
      }),
    }),

    getOneHowTo: builder.query<GetOneHowToResponse, number>({
      query: id => ({
        url: `${baseUrl}/howtos/${id}`,
      }),
    }),
  }),
});

export const { useGetAllHowTosQuery, useGetOneHowToQuery, useCreateHowToMutation } = howtosApi;
