export default function createProfileDevRes(
  id,
  git_exists,
  name,
  user,
  password,
  bio,
  avatar
) {
  return {
    id,
    git_exists,
    name,
    user,
    password,
    bio,
    avatar,
  };
}
