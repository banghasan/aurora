import { useUsers } from "../../lib/hooks/useUsers";
import { Container } from "../../components/UI/Container";
import { UserList } from "../../components/Users/UserList";
import { Heading } from "../../components/Heading/Heading";

export default function Users() {
  const { users, isLoading, isError } = useUsers();
  const isLoaded = !isLoading && !isError;

  return (
    <Container>
      <Heading title="Users List">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi risus
        dui, sagittis nec dapibus in, interdum eget leo. Duis finibus turpis nec
        nibh mattis, in aliquam dui condimentum.
      </Heading>

      {!isLoaded && <p>Loading...</p>}
      {isLoaded && <UserList users={users} />}
    </Container>
  );
}
