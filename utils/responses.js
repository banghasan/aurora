export const formatUser = (user) => {
  return {
    id: user.id,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    created_at: user.created_at,
    updated_at: user.updated_at,
  };
};
