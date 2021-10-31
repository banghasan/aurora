import { Container } from "../../components/Container";
import { Heading } from "../../components/Heading/Heading";
import { CreateWebsiteForm } from "../../components/Websites/CreateWebsiteForm";

export default function Create(props) {
  return (
    <Container>
      <Heading title="Create Website">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi risus
        dui, sagittis nec dapibus in, interdum eget leo. Duis finibus turpis nec
        nibh mattis, in aliquam dui condimentum.
      </Heading>
      <CreateWebsiteForm />
    </Container>
  );
}
