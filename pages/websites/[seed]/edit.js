import { Formik, Form } from "formik";
import { useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { TextField } from "../../../components/TextField";
import { Radio } from "../../../components/Radio";
import { Button } from "../../../components/Button";
import { Show } from "../../../components/Show";
import { withAuth } from "../../../hoc/withAuth";
import { useMeWebsite } from "../../../hooks/useMeWebsite";
import { SharedLink } from "../../../components/ShareLink";
import { Container } from "../../../components/Container";
import { client } from "../../../utils/api";
import { Alert } from "../../../components/Alert";
import { useTranslation } from "next-i18next";

export async function getServerSideProps(context) {
  const { seed } = context.query;

  return {
    props: {
      seed,
      ...(await serverSideTranslations(locale, ["common", "websites-edit"])),
    },
  };
}

const Edit = ({ seed }) => {
  const [errors, setErrors] = useState([]);
  const { website, isLoading, isError, mutate } = useMeWebsite({ seed });
  const { t } = useTranslation("websites-edit");

  const handleSubmit = async (values, { setSubmitting }) => {
    setErrors([]);
    values.shared = Boolean(Number(values.shared));

    try {
      await client.put(`/v2/me/websites/${seed}`, values);
      await mutate(`/v2/me/websites/${seed}`);
    } catch (err) {
      setErrors([err.response.data.message]);
    }

    setSubmitting(false);
  };

  const generate = (seed) =>
    `<script async defer
  src="${process.env.NEXT_PUBLIC_API_URL}/public/aurora.js"
  aurora-id="${seed}">
</script>`;

  if (isLoading) return <div>Loading..</div>;
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

        <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 sm:p-8 mt-8">
          <Show when={errors.length}>
            <div className="mb-4">
              <Alert title="Something goes wrong!" messages={errors} />
            </div>
          </Show>

          <Formik initialValues={website} onSubmit={handleSubmit}>
            {({ isSubmitting }) => (
              <Form>
                <div className="space-y-8 divide-y divide-gray-200 dark:divide-gray-800">
                  <div className="space-y-8">
                    <div className="space-y-6">
                      <div className="sm:col-span-6">
                        <TextField
                          label={t("website-name")}
                          name="name"
                          type="text"
                          autocomplete="none"
                        />
                      </div>

                      <div className="sm:col-span-6">
                        <TextField
                          label={t("website-url")}
                          name="url"
                          type="text"
                          autocomplete="none"
                        />
                      </div>
                    </div>

                    <div>
                      <h3 className="font-bold text-2xl md:text-2xl tracking-tight mt-14 mb-1 text-black dark:text-white">
                        {t("share-statistics")}
                      </h3>
                      <p className="prose leading-relaxed text-gray-600 dark:text-gray-400 mb-2">
                        {t("share-statistics-description")}
                      </p>
                    </div>

                    <div className="mt-6">
                      <fieldset>
                        <div className="space-y-4">
                          <Radio value="1" label={t("make-it-public")} name="shared" />
                          <Radio value="0" label={t("keep-it-private")} name="shared" />
                        </div>
                      </fieldset>

                      <Show when={website.shared}>
                        <div>
                          <h3 className="font-bold text-2xl md:text-2xl tracking-tight mt-14 mb-1 text-black dark:text-white">
                            {t("share-link")}
                          </h3>
                          <p className="prose leading-relaxed text-gray-600 dark:text-gray-400 mb-2">
                            <SharedLink seed={seed} />
                          </p>
                        </div>
                      </Show>
                    </div>

                    <div className="hidden sm:block">
                      <div>
                        <h3 className="font-bold text-2xl md:text-2xl tracking-tight mt-14 mb-1 text-black dark:text-white">
                          {t("how-to-connect")}
                        </h3>
                        <p className="prose leading-relaxed text-gray-600 dark:text-gray-400 mb-2">
                          {t("how-to-connect-description")}
                        </p>
                      </div>

                      <pre className="rounded-md p-4 bg-gray-200 dark:bg-gray-800 text-black dark:text-white">
                        {generate(seed)}
                      </pre>
                    </div>
                  </div>

                  <div className="pt-5">
                    <div className="flex justify-end">
                      <Button type="submit" value={t("update-website")} isLoading={isSubmitting} />
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Container>
  );
};

export default withAuth(Edit);
