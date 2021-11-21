import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { Container } from "../../../components/UI/Container";
import { Heading } from "../../../components/Heading/Heading";
import { Card } from "../../../components/UI/Card";
import { Statistics } from "../../../components/Dashboard/Statistics";
import { Informations } from "../../../components/Dashboard/Informations";
import { PagesDatatable } from "../../../components/Dashboard/PagesDatatable";
import { ReferrersDatatable } from "../../../components/Dashboard/ReferrersDatatable";
import { OperativeSystemsDatatable } from "../../../components/Dashboard/OperativeSystemsDatatable";
import { BrowsersDatatable } from "../../../components/Dashboard/BrowsersDatatable";
import { DevicesDatatable } from "../../../components/Dashboard/DevicesDatatable";
import { CountriesDatatable } from "../../../components/Dashboard/CountriesDatatable";
import { useState, useEffect } from "react";

const ViewsChart = dynamic(() => import("../../../components/UI/ViewsChart"), {
  ssr: false,
  loading: () => <div style={{ height: 500 }}></div>,
});

const AreaChart = dynamic(() => import("../../../components/UI/AreaChart"), {
  ssr: false,
  loading: () => <div style={{ height: 350 }}></div>,
});

export default function Show(props) {
  const router = useRouter();
  const [filters, setFilters] = useState({});

  useEffect(() => {
    if (router.isReady) {
      console.log(router.query);
      setFilters(router.query);
    }
  }, [router.isReady]);

  const onFilterChange = (data) => {
    setFilters((prev) => {
      const next = { ...prev, ...data };

      // I don't wanna these params in the url
      const { wid, start, end, unit, ...whitelisted } = next;

      // TODO: is this really useful? Consider to disable that.
      router.push(
        { pathname: `/websites/${router.query.wid}`, query: whitelisted },
        undefined,
        {
          shallow: true,
        }
      );

      return next;
    });
  };

  return (
    <Container>
      <Heading title="Dashboard">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi risus
        dui, sagittis nec dapibus in, interdum eget leo. Duis finibus turpis nec
        nibh mattis, in aliquam dui condimentum.
      </Heading>

      <div className="flex flex-col space-y-3">
        <Informations onFilterChange={onFilterChange} activeFilters={filters} />

        <div className="flex space-x-3">
          <Statistics filters={filters} />
        </div>

        <div className="flex">
          <Card className="p-6">
            <ViewsChart />
          </Card>
        </div>

        <div className="flex space-x-3">
          <div className="flex w-2/4">
            <PagesDatatable />
          </div>

          <div className="flex w-2/4">
            <ReferrersDatatable filters={filters} />
          </div>
        </div>

        <div className="flex space-x-3">
          <div className="flex w-2/6">
            <OperativeSystemsDatatable filters={filters} />
          </div>

          <div className="flex w-2/6">
            <BrowsersDatatable filters={filters} />
          </div>

          <div className="flex w-2/6">
            <DevicesDatatable filters={filters} />
          </div>
        </div>

        <div className="flex space-x-3">
          <div className="flex w-3/6">
            <Card>
              <AreaChart />
            </Card>
          </div>

          <div className="flex w-3/6">
            <CountriesDatatable filters={filters} />
          </div>
        </div>
      </div>
    </Container>
  );
}
