import { useRouter } from "next/router";
import { useState } from "react";
import { Formik, Form } from "formik";
import { TextField } from "../components/TextField";
import { withAuth } from "../hoc/withAuth";
import { Button } from "../components/Button";
import { useUser } from "../hooks/useUser";
import { localize } from "../utils/dates";
import { Container } from "../components/Container";
import { client } from "../utils/api";
import { Show } from "../components/Show";
import { Alert } from "../components/Alert";
import useTranslation from "next-translate/useTranslation";

const Profile = () => {
  const router = useRouter();
  const [errors, setErrors] = useState([]);
  const { user, isLoading, isError } = useUser();
  const { t } = useTranslation("profile");

  const handleSubmit = async (values, { setSubmitting }) => {
    setErrors([]);

    try {
      await client.put(`/v2/me`, values);
    } catch (err) {
      setErrors([err.response.data.message]);
    }

    setSubmitting(false);
  };

  const logout = async () => {
    // TODO:
    try {
      await axios.post("/api/auth/logout");
      router.push("/auth/login");
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>failed to load</div>;

  return (
    <Container>
      <div className="flex flex-col justify-center items-start max-w-3xl w-full mx-auto mb-16">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          {t("h1")}
        </h1>

        <p className="prose leading-relaxed text-gray-600 dark:text-gray-400 mb-4">
          {t("description")}
        </p>

        <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 sm:p-8 mt-8 w-full">
          <Show when={errors.length}>
            <div className="mb-4">
              <Alert title="Something goes wrong!" messages={errors} />
            </div>
          </Show>

          <Formik initialValues={user} onSubmit={handleSubmit}>
            {({ isSubmitting }) => (
              <Form>
                <div className="space-y-8 divide-y divide-gray-200 dark:divide-gray-800">
                  <div className="space-y-8">
                    <div className="space-y-6">
                      <TextField
                        label={t("first-name")}
                        name="firstname"
                        type="text"
                        autocomplete="none"
                      />

                      <TextField
                        label={t("last-name")}
                        name="lastname"
                        type="text"
                        autocomplete="none"
                      />
                    </div>

                    <div>
                      <h3 className="font-bold text-2xl md:text-2xl tracking-tight mt-14 mb-1 text-black dark:text-white">
                        {t("personal-info")}
                      </h3>
                      <p className="prose leading-relaxed text-gray-600 dark:text-gray-400 mb-2">
                        {t("personal-info-description")}
                      </p>
                    </div>

                    <div className="space-y-6">
                      <TextField
                        label={t("email-address")}
                        name="email"
                        type="email"
                        autocomplete="none"
                      />

                      <div className="grid sm:grid-cols-2 gap-x-4 gap-y-6">
                        <TextField
                          label={t("new-password")}
                          name="password"
                          type="password"
                          autocomplete="none"
                        />

                        <TextField
                          label={t("repeat-new-password")}
                          name="password_confirmation"
                          type="password"
                          autocomplete="none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-5">
                    <div className="flex justify-end">
                      <Button type="submit" value={t("update-profile")} isLoading={isSubmitting} />
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>

        <div className="flex justify-center mt-8 w-full">
          <p className="prose leading-relaxed text-gray-600 dark:text-gray-400 mb-2">
            {t("account-creation-date")} {localize(user.created_at)}.
          </p>
        </div>
      </div>
    </Container>
  );
};

export default withAuth(Profile);
