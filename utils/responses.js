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

export const formatWebsite = (website) => {
  return {
    id: website.id,
    name: website.name,
    url: website.url,
    is_public: website.is_public,
    user_id: website.user_id,
    created_at: website.created_at,
    updated_at: website.updated_at,
  };
};
