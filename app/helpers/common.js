// create a unique name for the profile image
export const getUniqueFileName = (path) => {
  const currentTimeUnix = new Date().getTime();
  const fileName = path.split('/')?.pop();
  return `${currentTimeUnix}-${fileName}`;
};
