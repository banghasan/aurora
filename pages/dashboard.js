import { BarChart } from "../components/UI/BarChart";
import { Container } from "../components/UI/Container";
import { Heading } from "../components/Heading/Heading";
import { Card } from "../components/UI/Card";
import { Datatable } from "../components/Datatable/Datatable";

const pages = [
  {
    element: "/",
    views: "1400",
    unique: "1000",
  },
  {
    element: "/about",
    views: "1200",
    unique: "400",
  },
];

const referrers = [
  {
    element: "https://d3ward.github.io/",
    views: "100",
    unique: "12",
  },
  {
    element: "https://alternativeto.net/",
    views: "40",
    unique: "2",
  },
  {
    element: "https://www.google.com/",
    views: "30",
    unique: "1",
  },
  {
    element: "https://www.facebook.com/",
    views: "20",
    unique: "1",
  },
  {
    element: "https://www.youtube.com/",
    views: "10",
    unique: "1",
  },
];

const operativeSystems = [
  {
    element: "Windows",
    views: "100",
    unique: "12",
  },

  {
    element: "Mac",
    views: "40",
    unique: "2",
  },

  {
    element: "Linux",
    views: "30",
    unique: "1",
  },

  {
    element: "Android",
    views: "20",
    unique: "1",
  },

  {
    element: "IOS",
    views: "10",
    unique: "1",
  },
];

const browsers = [
  {
    element: "Chrome",
    views: "100",
    unique: "12",
  },

  {
    element: "Firefox",
    views: "40",
    unique: "2",
  },

  {
    element: "Safari",
    views: "30",
    unique: "1",
  },

  {
    element: "Opera",
    views: "20",
    unique: "1",
  },

  {
    element: "Edge",
    views: "10",
    unique: "1",
  },

  {
    element: "IE",
    views: "10",
    unique: "1",
  },
];

const countries = [
  {
    element: "United States",
    views: "100",
    unique: "12",
  },

  {
    element: "United Kingdom",
    views: "40",
    unique: "2",
  },

  {
    element: "Germany",
    views: "30",
    unique: "1",
  },

  {
    element: "France",
    views: "20",
    unique: "1",
  },

  {
    element: "Italy",
    views: "10",
    unique: "1",
  },

  {
    element: "Spain",
    views: "10",
    unique: "1",
  },
];

const devices = [
  {
    element: "Desktop",
    views: "100",
    unique: "12",
  },

  {
    element: "Tablet",
    views: "40",
    unique: "2",
  },

  {
    element: "Mobile",
    views: "30",
    unique: "1",
  },
];

export default function Dashboard(props) {
  // TOBEREMOVE TODO

  return (
    <Container>
      <Heading title="Dashboard">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi risus
        dui, sagittis nec dapibus in, interdum eget leo. Duis finibus turpis nec
        nibh mattis, in aliquam dui condimentum.
      </Heading>

      <div className="flex flex-col space-y-3">
        <div className="flex space-x-3">
          <div className="flex w-3/4">
            <Card className="p-6">
              <div className="flex flex-col space-y-6">
                <div className="flex flex-col space-y-1">
                  <h3 className="tracking-tighter text-xl text-gray-500">
                    useaurora.app
                  </h3>
                  <div className="font-bold tracking-tighter text-5xl text-gray-900">
                    40k
                  </div>
                </div>

                <div className="flex space-x-14">
                  <div>
                    <div className="tracking-tighter text-md text-gray-500">
                      Total Visits
                    </div>
                    <div className="font-bold tracking-tighter text-3xl text-gray-900">
                      410k
                    </div>
                  </div>

                  <div>
                    <div className="tracking-tighter text-md text-gray-500">
                      Unique Visits
                    </div>
                    <div className="font-bold tracking-tighter text-3xl text-gray-900">
                      50k
                    </div>
                  </div>

                  <div>
                    <div className="tracking-tighter text-md text-gray-500">
                      Bounces
                    </div>
                    <div className="font-bold tracking-tighter text-3xl text-gray-900">
                      345
                    </div>
                  </div>

                  <div>
                    <div className="tracking-tighter text-md text-gray-500">
                      Avg Visit Time
                    </div>
                    <div className="font-bold tracking-tighter text-3xl text-gray-900">
                      37s
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="flex w-1/4">
            <Card className="flex justify-center items-center p-6">
              <div className="flex flex-col space-y-4">
                <h3 className="tracking-tighter text-xl text-gray-500 text-center">
                  Current Visitors
                </h3>
                <div className="font-bold tracking-tighter text-5xl text-gray-900 text-center">
                  15
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div className="flex space-x-3">
          <div className="flex w-2/4">
            <Datatable title="Pages" rows={pages} />
          </div>

          <div className="flex w-2/4">
            <Datatable title="Referrers" rows={referrers} />
          </div>
        </div>

        <div className="flex space-x-3">
          <div className="flex w-2/6">
            <Datatable title="Operative Systems" rows={operativeSystems} />
          </div>

          <div className="flex w-2/6">
            <Datatable title="Browsers" rows={browsers} />
          </div>

          <div className="flex w-2/6">
            <Datatable title="Devices" rows={devices} />
          </div>
        </div>

        <div className="flex space-x-3">
          <div className="flex w-3/6">
            <Datatable title="Operative Systems" rows={operativeSystems} />
          </div>

          <div className="flex w-3/6">
            <Datatable title="Countries" rows={countries} />
          </div>
        </div>
      </div>

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
