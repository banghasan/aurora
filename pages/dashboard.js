import dynamic from "next/dynamic";
import { Container } from "../components/UI/Container";
import { Heading } from "../components/Heading/Heading";
import { Card } from "../components/UI/Card";
import { Statistics } from "../components/Dashboard/Statistics";
import { Informations } from "../components/Dashboard/Informations";
import { PagesDatatable } from "../components/Dashboard/PagesDatatable";
import { ReferrersDatatable } from "../components/Dashboard/ReferrersDatatable";
import { OperativeSystemsDatatable } from "../components/Dashboard/OperativeSystemsDatatable";
import { BrowsersDatatable } from "../components/Dashboard/BrowsersDatatable";
import { DevicesDatatable } from "../components/Dashboard/DevicesDatatable";
import { CountriesDatatable } from "../components/Dashboard/CountriesDatatable";

const MentionChart = dynamic(() => import("../components/UI/MentionChart"), {
  ssr: false,
  loading: () => <div style={{ height: 350 }}></div>,
});

const AreaChart = dynamic(() => import("../components/UI/AreaChart"), {
  ssr: false,
  loading: () => <div style={{ height: 350 }}></div>,
});

export default function Dashboard(props) {
  return (
    <Container>
      <Heading title="Dashboard">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi risus
        dui, sagittis nec dapibus in, interdum eget leo. Duis finibus turpis nec
        nibh mattis, in aliquam dui condimentum.
      </Heading>

      <div className="flex flex-col space-y-3">
        <Informations />

        <div className="flex space-x-3">
          <Statistics />
        </div>

        <div className="flex">
          <Card className="p-6">
            <MentionChart />
          </Card>
        </div>

        <div className="flex space-x-3">
          <div className="flex w-2/4">
            <PagesDatatable />
          </div>

          <div className="flex w-2/4">
            <ReferrersDatatable />
          </div>
        </div>

        <div className="flex space-x-3">
          <div className="flex w-2/6">
            <OperativeSystemsDatatable />
          </div>

          <div className="flex w-2/6">
            <BrowsersDatatable />
          </div>

          <div className="flex w-2/6">
            <DevicesDatatable />
          </div>
        </div>

        <div className="flex space-x-3">
          <div className="flex w-3/6">
            <Card>
              <AreaChart />
            </Card>
          </div>

          <div className="flex w-3/6">
            <CountriesDatatable />
          </div>
        </div>
      </div>
    </Container>
  );
}
