import { useQuery } from 'react-query';
import { get } from '../../services/api';
import { endpoints } from '../../constants/endpoints';

const getPosts = async () => {
  const { data } = await get(endpoints.posts);
  return data;
};

export function useGetPosts () {
  return useQuery('getPosts', getPosts);
}
