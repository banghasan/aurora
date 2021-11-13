import { Card } from "../UI/Card";

export function Statistic(props) {
  return (
    <div>
      <div className="tracking-tighter text-md text-gray-500">
        {props.label}
      </div>
      <div className="font-bold tracking-tighter text-3xl text-gray-900">
        {props.value}
      </div>
    </div>
  );
}

export function Statistics(props) {
  return (
    <Card className="p-6">
      <div className="flex flex-col space-y-6">
        <div className="flex space-x-14">
          <Statistic label="Page Views" value="40k" />
          <Statistic label="Unique Visits" value="20k" />
          <Statistic label="Bounces" value="354" />
          <Statistic label="Visit Duration" value="45s" />
          <Statistic label="Current Visitors" value="12" />
        </div>
      </div>
    </Card>
  );
}
