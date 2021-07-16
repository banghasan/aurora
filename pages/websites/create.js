import { Formik, Form } from "formik";
import { useState } from "react";
import { useRouter } from "next/router";
import { TextField } from "../../components/TextField";
import { Radio } from "../../components/Radio";
import { withAuth } from "../../hoc/withAuth";
import { Button } from "../../components/Button";
import { client } from "../../utils/api";
import { Container } from "../../components/Container";
import { Show } from "../../components/Show";
import { Alert } from "../../components/Alert";
import useTranslation from "next-translate/useTranslation";

const Create = () => {
  const router = useRouter();
  const [errors, setErrors] = useState([]);
  const { t } = useTranslation("websites-create");
  const initialValues = { name: "", url: "", shared: "0" };

  const handleSubmit = async (values, { setSubmitting }) => {
    setErrors([]);
    values.shared = Boolean(Number(values.shared));

    try {
      const res = await client.post("/v2/me/websites", values);
      router.push(`/websites/${res.data.seed}/edit`);
    } catch (err) {
      setErrors([err.response.data.message]);
      setSubmitting(false);
    }
  };

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

          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
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
                    </div>
                  </div>

                  <div className="pt-5">
                    <div className="flex justify-end">
                      <Button type="submit" value={t("create")} isLoading={isSubmitting} />
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

export default withAuth(Create);
