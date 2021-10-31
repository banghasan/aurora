import { Container } from "../../../components/Container";
import { Heading } from "../../../components/Heading/Heading";
import { WebsiteForm } from "../../../components/Websites/WebsiteForm";

const website = {
  id: 7,
  name: "Nlounge",
  url: "https://hp.com",
  description: "Nlounge is a website for the best coffee in the world",
  is_public: 1,
};

export default function Edit(props) {
  const handleSubmit = async (data) => {
    console.log("Parto In Edit");
    await simulateServerResponse();
    console.log(data);
  };

  const simulateServerResponse = () => {
    return new Promise((resolve) => setTimeout(resolve, 1000));
  };

  return (
    <Container>
      <Heading title="Edit Website">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi risus
        dui, sagittis nec dapibus in, interdum eget leo. Duis finibus turpis nec
        nibh mattis, in aliquam dui condimentum.
      </Heading>

      {/* TODO: Need to remove non-used value by the form from defaultValues */}
      <WebsiteForm
        isNew={false}
        defaultValues={website}
        actionText="Update Website!"
        onSubmit={handleSubmit}
      />
    </Container>
  );
}
