import { Container } from "../../components/Container";
import { Heading } from "../../components/Heading/Heading";
import { CreateUserForm } from "../../components/Users/CreateUserForm";

export default function Create(props) {
  return (
    <Container>
      <Heading title="Create User">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi risus
        dui, sagittis nec dapibus in, interdum eget leo. Duis finibus turpis nec
        nibh mattis, in aliquam dui condimentum.
      </Heading>

      <CreateUserForm />
    </Container>
  );
}
