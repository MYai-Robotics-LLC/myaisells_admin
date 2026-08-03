import type {
  BusinessSupportAccessResponse,
  CreateBusinessOnboardingResponse,
  CreateBusinessRequest,
  GetAdminBusinessesResponse,
  GetAdminBusinessResponse,
  UpdateBusinessStatusRequest,
  UpdateBusinessStatusResponse,
} from '@/types';
import { baseApi } from '@/store/api/baseApi';
import { getBaseUrl } from '@/utils/Helpers';

const baseUrl = getBaseUrl('/api/admin');

export const businessesApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getAdminBusinesses: builder.query<GetAdminBusinessesResponse, {
      page?: number;
      limit?: number;
      status?: string;
      search?: string;
      partner?: string;
      attributionSource?: string;
      setupStatus?: string;
      country?: string;
      dateFrom?: string;
      dateTo?: string;
    }>({
      query: ({ page = 1, limit = 15, status, search, partner, attributionSource, setupStatus, country, dateFrom, dateTo } = {}) => ({
        url: `${baseUrl}/businesses`,
        params: {
          page,
          limit,
          ...(status && { status }),
          ...(search && { search }),
          ...(partner && { partner }),
          ...(attributionSource && { attributionSource }),
          ...(setupStatus && { setupStatus }),
          ...(country && { country }),
          ...(dateFrom && { dateFrom }),
          ...(dateTo && { dateTo }),
        },
      }),
      providesTags: ['Business'],
    }),

    getAdminBusiness: builder.query<GetAdminBusinessResponse, string>({
      query: id => ({ url: `${baseUrl}/businesses/${id}` }),
      providesTags: ['Business'],
    }),

    createBusinessOnboarding: builder.mutation<CreateBusinessOnboardingResponse, CreateBusinessRequest>({
      query: ({ name, email, phone, website, country, address, subscription_plan, business_sector_id, contact_person }) => {
        const [contactFirstName, ...contactRest] = (contact_person ?? '').trim().split(/\s+/);
        return {
          url: `${baseUrl}/business-onboarding`,
          method: 'POST',
          // The backend validates nested business_profile and contact
          // objects, not the flat shape this form used to send. Discovered
          // live, one required field at a time, via a sequence of 400s.
          body: {
            name,
            subscription_plan,
            business_profile: {
              name,
              business_email: email,
              phone,
              website,
              country,
              address,
              business_sector_id,
            },
            contact: {
              first_name: contactFirstName || contact_person,
              last_name: contactRest.join(' ') || contactFirstName,
              phone,
              email,
            },
          },
        };
      },
      invalidatesTags: ['Business'],
    }),

    updateBusinessStatus: builder.mutation<UpdateBusinessStatusResponse, { id: string; body: UpdateBusinessStatusRequest }>({
      query: ({ id, body }) => ({
        url: `${baseUrl}/businesses/${id}/status`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Business'],
    }),

    businessSupportAccess: builder.mutation<BusinessSupportAccessResponse, { id: string; reason: string }>({
      query: ({ id, reason }) => ({
        url: `${baseUrl}/businesses/${id}/support-access`,
        method: 'POST',
        body: { reason },
      }),
      invalidatesTags: ['Business'],
    }),
  }),
});

export const {
  useGetAdminBusinessesQuery,
  useLazyGetAdminBusinessesQuery,

  useGetAdminBusinessQuery,
  useLazyGetAdminBusinessQuery,

  useCreateBusinessOnboardingMutation,

  useUpdateBusinessStatusMutation,

  useBusinessSupportAccessMutation,
} = businessesApi;
