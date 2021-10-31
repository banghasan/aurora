import { BarChart } from "../components/UI/BarChart";
import { Container } from "../components/Container";
import { Heading } from "../components/Heading/Heading";
import { Card } from "../components/UI/Card";

export default function Dashboard(props) {
  // TOBEREMOVE TODO

  return (
    <Container>
      <Heading title="Dashboard">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi risus
        dui, sagittis nec dapibus in, interdum eget leo. Duis finibus turpis nec
        nibh mattis, in aliquam dui condimentum.
      </Heading>

      <Card className="p-6 flex justify-between">
        <Card className="p-6">Nome Sito</Card>
        <Card className="p-6">Filtro</Card>
      </Card>

      <Card className="p-6 flex">
        <Card className="p-6">Total Views</Card>
        <Card className="p-6">Unique Visitors</Card>
        <Card className="p-6">Bounces</Card>
        <Card className="p-6">Visit Time</Card>
      </Card>

      <Card className="p-6">
        <BarChart />
      </Card>

      <Card className="p-6 flex">
        <Card className="p-6">Pages</Card>
        <Card className="p-6">Referrers</Card>
      </Card>

      <Card className="p-6 flex">
        <Card className="p-6">Operative Systems</Card>
        <Card className="p-6">Browsers</Card>
        <Card className="p-6">Devices</Card>
      </Card>

      <Card className="p-6 flex">
        <Card className="p-6">Map</Card>
        <Card className="p-6">Countries</Card>
      </Card>
    </Container>
  );
}
