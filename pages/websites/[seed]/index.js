import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { withAuth } from "../../../hoc/withAuth";
import { Container } from "../../../components/Container";
import { Dashboard } from "../../../components/Dashboard";

export async function getServerSideProps(context) {
  const { seed } = context.query;
  const { locale } = context;

  return {
    props: {
      seed,
      ...(await serverSideTranslations(locale, ["common", "websites-show"])),
    },
  };
}

const Website = ({ seed }) => {
  const { t } = useTranslation("websites-show");

  return (
    <Container>
      <div className="flex flex-col justify-center items-start max-w-6xl w-full mx-auto mb-16">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          {t("h1")}
        </h1>

        <p className="prose leading-relaxed text-gray-600 dark:text-gray-400 mb-4">
          {t("description")}
        </p>

        <Dashboard seed={seed} />
      </div>
    </Container>
  );
};

export default withAuth(Website);
