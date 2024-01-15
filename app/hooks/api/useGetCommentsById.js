import { useQuery } from 'react-query';
import { get } from '../../services/api';
import { endpoints } from '../../constants/endpoints';

const getCommentsById = async (postId) => {
  if (!postId) return [];
  const { data } = await get(`${endpoints.posts}/${postId}/${endpoints.comments}`);
  return data;
};

export function useGetCommentsById (postId) {
  return useQuery(['getCommentsById', postId], () => getCommentsById(postId));
}
