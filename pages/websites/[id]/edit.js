import axios from "axios";
import { useRouter } from "next/router";
import { useToast } from "../../../lib/hooks/useToast";
import { useMeWebsite } from "../../../lib/hooks/useMeWebsite";
import { Container } from "../../../components/UI/Container";
import { Heading } from "../../../components/Heading/Heading";
import { WebsiteForm } from "../../../components/Websites/WebsiteForm";

export default function Edit() {
  const router = useRouter();
  const { showSuccess, showError } = useToast();
  const { website, isLoading, error } = useMeWebsite(router.query.id);

  const handleSubmit = async (data) => {
    try {
      await axios.put(`/api/websites/${router.query.id}`, data);
      showSuccess("Website Updated!");
    } catch (err) {
      showError("Error updating website");
    }
  };

  const isLoaded = !isLoading && !error;

  return (
    <Container>
      <Heading title="Edit Website">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi risus
        dui, sagittis nec dapibus in, interdum eget leo. Duis finibus turpis nec
        nibh mattis, in aliquam dui condimentum.
      </Heading>

      {/* TODO: Need to remove non-used value by the form from defaultValues */}
      {!isLoaded && <p>Loading...</p>}
      {isLoaded && (
        <WebsiteForm
          isNew={false}
          defaultValues={website}
          onSubmit={handleSubmit}
        />
      )}
    </Container>
  );
}
