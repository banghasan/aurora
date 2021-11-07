import axios from "axios";
import { useRouter } from "next/router";
import { useToast } from "../../lib/hooks/useToast";
import { Container } from "../../components/UI/Container";
import { Heading } from "../../components/Heading/Heading";
import { WebsiteForm } from "../../components/Websites/WebsiteForm";

export default function Create() {
  const router = useRouter();
  const { showSuccess, showError } = useToast();

  const handleSubmit = async (data) => {
    try {
      const res = await axios.post("/api/websites", data);
      showSuccess("Website created successfully");
      router.push(`/websites/${res.data.id}/edit`);
    } catch (error) {
      showError("Error creating website");
    }
  };

  return (
    <Container>
      <Heading title="Create Website">
        In this page you can create a new website. Fill the form and click on
        the "Create Website!" button to create a new website. All the required
        fields are marked with an asterisk (*).
      </Heading>

      <WebsiteForm onSubmit={handleSubmit} />
    </Container>
  );
}
