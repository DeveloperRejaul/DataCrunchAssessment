/* eslint-disable no-param-reassign */
import { PostItem, ApiResponse } from 'types';
import { api } from '@/src/core/rtk/api';
import { animatedToast } from '@/src/core/components/Toast';

export const homeApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    /**
     * Fetches the first 10 posts from JSONPlaceholder.
     *
     * @returns {ApiResponse<PostItem[]>}
     */
    getPosts: build.query<ApiResponse<PostItem[]>, null>({
      query: () => '/posts?_page=1&_limit=10',
      transformResponse: (response: PostItem[]): ApiResponse<PostItem[]> => ({
        status: 'success',
        body: response,
      }),
    }),

    /**
     * Fetches paginated posts and appends them to the getPosts cache.
     *
     * @param {page, limit} - Page number and limit for pagination.
     * @returns {ApiResponse<PostItem[]>}
     */
    getPostsByPage: build.query<ApiResponse<PostItem[]>, { page: number; limit: number }>({
      query: ({ page = 1, limit = 10 }) => `/posts?_page=${page}&_limit=${limit}`,
      transformResponse: (response: PostItem[]): ApiResponse<PostItem[]> => ({
        status: 'success',
        body: response,
      }),
      async onQueryStarted(queryArg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            homeApi.util.updateQueryData('getPosts', null, (draft) => {
              if (data?.body && draft?.body && queryArg.page > 1) {
                draft.body.push(...data.body);
              }
            }),
          );
        } catch (err) {
          console.error('Pagination error:', err);
        }
      },
    }),

    /**
     * DELETE post by ID and remove from getPosts cache
     */
    deletePost: build.mutation<{ id: number }, number>({
      query: (id) => ({
        url: `/posts/${id}`,
        method: 'DELETE',
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patch = dispatch(
          homeApi.util.updateQueryData('getPosts', null, (draft) => {
            if (draft?.body) {
              draft.body = draft.body.filter((post) => post.id !== id);
            }
          }),
        );
        try {
          await queryFulfilled;
          animatedToast.show({
            type: 'success',
            title: 'Deleted',
            message: 'Post deleted successfully!',
            hideDuration: 2000,
          });
        } catch {
          animatedToast.show({
            type: 'error',
            title: 'Error',
            message: 'Failed to delete post.',
            hideDuration: 2500,
          });
          patch.undo();
        }
      },
    }),

    /**
     * PUT (update) post by ID and update in getPosts cache
     */
    updatePost: build.mutation<PostItem, Partial<PostItem> & { id: number }>({
      query: ({ id, ...body }) => ({
        url: `/posts/${id}`,
        method: 'PUT',
        body,
      }),
      async onQueryStarted(updatedPost, { dispatch, queryFulfilled }) {
        const patch = dispatch(
          homeApi.util.updateQueryData('getPosts', null, (draft) => {
            const index = draft?.body?.findIndex((post) => post.id === updatedPost.id);
            if (index !== -1 && draft?.body) {
              draft.body[index] = { ...draft.body[index], ...updatedPost };
            }
          }),
        );

        try {
          await queryFulfilled;
          animatedToast.show({
            type: 'success',
            title: 'Updated',
            message: 'Post updated successfully!',
            hideDuration: 2000,
          });
        } catch {
          animatedToast.show({
            type: 'error',
            title: 'Update Failed',
            message: 'Could not update the post.',
          });
          patch.undo();
        }
      },
    }),

  }),
});

export const {
  useGetPostsQuery,
  useLazyGetPostsByPageQuery,
  useDeletePostMutation,
  useUpdatePostMutation,
} = homeApi;
