import Link from "next/link";
import { useAvatar } from "../../lib/hooks/useAvatar";
import { Card } from "../UI/Card";

export function UserCard(props) {
  const avatar = useAvatar(props.id);

  return (
    <Card>
      <div className="relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
        <div className="flex-shrink-0 rounded-full border p-1.5">
          <img className="h-10 w-10" src={avatar} />
        </div>

        <div className="flex-1 min-w-0">
          <Link href="/users/[id]/edit" as={`/users/${props.id}/edit`}>
            <a className="focus:outline-none">
              <span className="absolute inset-0" aria-hidden="true"></span>
              <p className="text-sm font-medium text-gray-900">
                {props.firtname} {props.lastname}
              </p>
              <p className="text-sm text-gray-500 truncate">{props.email}</p>
            </a>
          </Link>
        </div>
      </div>
    </Card>
  );
}
