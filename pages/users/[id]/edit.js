import axios from "axios";
import { useRouter } from "next/router";
import { useUser } from "../../../lib/hooks/useUser";
import { useToast } from "../../../lib/hooks/useToast";
import { Container } from "../../../components/UI/Container";
import { Heading } from "../../../components/Heading/Heading";
import { UserForm } from "../../../components/Users/UserForm";

export default function Edit(props) {
  const router = useRouter();
  const { showSuccess, showError } = useToast();
  const { user, isLoading, error } = useUser(router.query.id);

  const handleSubmit = async (data) => {
    try {
      await axios.put(`/api/users/${router.query.id}`, data);
      showSuccess("User Updated!");
    } catch (err) {
      showError("Error updating user");
    }
  };

  const isLoaded = !isLoading && !error;

  return (
    <Container>
      <Heading title="Edit User">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi risus
        dui, sagittis nec dapibus in, interdum eget leo. Duis finibus turpis nec
        nibh mattis, in aliquam dui condimentum.
      </Heading>

      {!isLoaded && <p>Loading...</p>}
      {isLoaded && (
        <UserForm isNew={false} defaultValues={user} onSubmit={handleSubmit} />
      )}
    </Container>
  );
}
