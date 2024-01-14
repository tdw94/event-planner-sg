import { useQuery } from 'react-query';
import { get } from '../../services/api';
import { endpoints } from '../../constants/endpoints';

const getPhotos = async () => {
  const { data } = await get(endpoints.photos);
  return data;
};

export function useGetPhotos () {
  return useQuery('getPhotos', getPhotos);
}
