import axios from "axios";
import { Container } from "../../components/UI/Container";
import { Heading } from "../../components/Heading/Heading";
import { UserForm } from "../../components/Users/UserForm";
import { useRouter } from "next/router";
import { useToast } from "../../lib/hooks/useToast";

export default function Create() {
  const router = useRouter();
  const { showSuccess, showError } = useToast();

  const handleSubmit = async (data) => {
    try {
      const res = await axios.post("/api/users", data);
      showSuccess("User created successfully");
      router.push(`/users/${res.data.id}/edit`);
    } catch (error) {
      console.log(error);
      showError("Error creating user");
    }
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
