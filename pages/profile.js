import { Container } from "../components/Container";
import { Heading } from "../components/Heading/Heading";

export default function Profile(props) {
  /* TODO: Valutare se rimuovere questa pagina, lascio tutto nel menu utenti. */

  return (
    <Container>
      <Heading title="Your Profile">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi risus
        dui, sagittis nec dapibus in, interdum eget leo. Duis finibus turpis nec
        nibh mattis, in aliquam dui condimentum.
      </Heading>
    </Container>
  );
}
