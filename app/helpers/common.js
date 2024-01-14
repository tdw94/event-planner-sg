export const getUniqueFileName = (path) => {
  // create a unique name for the profile image
  const currentTimeUnix = new Date().getTime();
  const fileName = path.split('/')?.pop();
  return `${currentTimeUnix}-${fileName}`;
};
