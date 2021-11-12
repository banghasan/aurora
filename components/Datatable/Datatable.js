import { percentage } from "../../utils/math";
import { Card } from "../UI/Card";
import { Row } from "./Row";
import { Thead } from "./Thead";

export function Datatable(props) {
  const totalViews = props.rows.reduce((acc, el) => acc + Number(el.views), 0);

  const mappedRows = (rows) => {
    return rows.map((row, index) => {
      const perc = percentage(row.views, totalViews);
      return <Row {...row} percentage={perc} key={index} />;
    });
  };

  return (
    <Card className="p-6">
      <div class="space-y-5">
        <h3 class="font-bold tracking-tighter text-3xl text-gray-900">
          {props.title}
        </h3>

        <dl class="space-y-1">
          <Thead />
          {mappedRows(props.rows)}
        </dl>
      </div>
    </Card>
  );
}
