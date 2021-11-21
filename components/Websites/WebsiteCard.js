import { Card } from "../UI/Card";
import { Button } from "../UI/Button";

export function WebsiteCard(props) {
  return (
    <Card className="p-4 flex flex-col justify-between h-48 relative">
      <div className="flex justify-end absolute right-0 px-4">
        <span className="items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-gray-100 text-gray-800">
          {props.is_public ? "Public" : "Private"}
        </span>
      </div>

      <div>
        <h3 className="font-medium text-2xl tracking-tighter text-gray-800">
          {props.name}
        </h3>
        <h4 className="font-medium tracking-tighter text-gray-500">
          {props.url}
        </h4>
      </div>
      <div className="flex space-x-4">
        <Button
          variant="outline"
          role="link"
          href={`/websites/${props.id}/edit`}
          label="Edit"
        />
        <Button label="Dashboard" role="link" href={`/websites/${props.id}`} />
      </div>
    </Card>
  );
}
