import { Container } from "../../components/Container";
import { Heading } from "../../components/Heading/Heading";
import { WebsiteForm } from "../../components/Websites/WebsiteForm";

export default function Create(props) {
  const handleSubmit = async (data) => {
    console.log("Parto");
    await simulateServerResponse();
    console.log(data);
  };

  const simulateServerResponse = () => {
    return new Promise((resolve) => setTimeout(resolve, 5000));
  };

  return (
    <Container>
      <Heading title="Create Website">
        In this page you can create a new website. Fill the form and click on
        the "Create Website!" button to create a new website. All the required
        fields are marked with an asterisk (*).
      </Heading>

      <WebsiteForm actionText="Create Website!" onSubmit={handleSubmit} />
    </Container>
  );
}
