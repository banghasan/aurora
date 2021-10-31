import { Container } from "../../components/Container";
import { UserList } from "../../components/Users/UserList";
import { Heading } from "../../components/Heading/Heading";

const users = [
  {
    id: 1,
    name: "John Doe",
    email: "ciccio@example.com",
    role: "admin",
  },
];

export default function Users(props) {
  return (
    <Container>
      <Heading title="Users List">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi risus
        dui, sagittis nec dapibus in, interdum eget leo. Duis finibus turpis nec
        nibh mattis, in aliquam dui condimentum.
      </Heading>

      <UserList users={users} />
    </Container>
  );
}
