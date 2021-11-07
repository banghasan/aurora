import axios from "axios";
import { useMe } from "../lib/hooks/useMe";
import { useToast } from "../lib/hooks/useToast";
import { Container } from "../components/UI/Container";
import { Heading } from "../components/Heading/Heading";
import { UserForm } from "../components/Users/UserForm";

export default function Profile() {
  const { user, isLoading, error } = useMe();
  const { showSuccess, showError } = useToast();

  const handleSubmit = async (data) => {
    try {
      await axios.put(`/api/me`, data);
      showSuccess("Profile Updated!");
    } catch (err) {
      showError("Error updating profile");
    }
  };

  const isLoaded = !isLoading && !error;

  return (
    <Container>
      <Heading title="Your Profile">
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
