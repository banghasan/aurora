import { useMeWebsites } from "../lib/hooks/useMeWebsites";
import { Container } from "../components/UI/Container";
import { Heading } from "../components/Heading/Heading";
import { WebsiteList } from "../components/Websites/WebsiteList";

export default function Home() {
  const { websites, isLoading, isError } = useMeWebsites();
  const isLoaded = !isLoading && !isError;

  return (
    <Container>
      <Heading title="Your Websites">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi risus
        dui, sagittis nec dapibus in, interdum eget leo. Duis finibus turpis nec
        nibh mattis, in aliquam dui condimentum.
      </Heading>

      {!isLoaded && <p>Loading...</p>}
      {isLoaded && <WebsiteList websites={websites} />}
    </Container>
  );
}
