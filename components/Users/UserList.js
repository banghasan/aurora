import { useRouter } from "next/dist/client/router";
import { EmptyState } from "../UI/EmptyState";
import { UserCard } from "./UserCard";

export function UserList(props) {
  const router = useRouter();

  const handleClick = () => {
    router.push("/users/create");
  };

  if (props.users.length < 1) {
    return <EmptyState text="Create a new User!" onClick={handleClick} />;
  }

  if (props.users.length > 0) {
    return (
      <div className="space-y-3">
        {props.users.map((user) => (
          <UserCard key={user.id} {...user} />
        ))}

        <EmptyState text="Create New User!" onClick={handleClick} />
      </div>
    );
  }
}

UserList.defaultProps = {
  users: [],
};
