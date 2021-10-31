import { Container } from "../../components/Container";
import { Heading } from "../../components/Heading/Heading";
import { UserForm } from "../../components/Users/UserForm";

export default function Create(props) {
  const handleSubmit = (data) => {
    console.log(data);
  };

  return (
    <Container>
      <Heading title="Create User">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi risus
        dui, sagittis nec dapibus in, interdum eget leo. Duis finibus turpis nec
        nibh mattis, in aliquam dui condimentum.
      </Heading>

      <UserForm onSubmit={handleSubmit} />
    </Container>
  );
}
