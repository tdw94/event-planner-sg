import { useQuery } from 'react-query';
import { get } from '../../services/api';
import { endpoints } from '../../constants/endpoints';

const getOrganizers = async () => {
  const { data } = await get(endpoints.users);
  return data;
};

export function useGetOrganizers () {
  return useQuery('getOrganizers', getOrganizers);
}
