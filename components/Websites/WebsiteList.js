import { useRouter } from "next/dist/client/router";
import { WebsiteCard } from "./WebsiteCard";
import { EmptyState } from "../UI/EmptyState";

export function WebsiteList(props) {
  const router = useRouter();

  const handleClick = () => {
    router.push("/websites/create");
  };

  if (props.websites.length < 1) {
    return <EmptyState text="Create a new Website!" onClick={handleClick} />;
  }

  if (props.websites.length > 0) {
    return (
      <div className="grid grid-cols-3 gap-4">
        {props.websites.map((website) => (
          <WebsiteCard
            key={website.id}
            name={website.name}
            url={website.url}
            is_public={website.is_public}
          />
        ))}

        <EmptyState text="Create a new Website!" onClick={handleClick} />
      </div>
    );
  }
}

WebsiteList.defaultProps = {
  websites: [],
};
