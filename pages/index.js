import useTranslation from "next-translate/useTranslation";

import { Container } from "../components/Container";
import { Websites } from "../components/Websites";
import { DividerButton } from "../components/DividerButton";
import { withAuth } from "../hoc/withAuth";

const Home = () => {
  const { t } = useTranslation("index");

  return (
    <Container>
      <div className="flex flex-col justify-center items-start max-w-3xl w-full mx-auto mb-16">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          {t("h1")}
        </h1>

        <p className="prose leading-relaxed text-gray-600 dark:text-gray-400 mb-4">
          {t("description")}
        </p>

        <div className="mt-8 w-full">
          <Websites />
        </div>

        <div className="mt-12 w-full">
          <DividerButton link={`/websites/create`} />
        </div>
      </div>
    </Container>
  );
};

export default withAuth(Home);
