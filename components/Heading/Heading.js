import { Prose } from "../UI/Prose";
import { Title } from "./Title";

export function Heading(props) {
  return (
    <div className="mb-20">
      <Title>{props.title}</Title>
      <Prose>{props.children}</Prose>
    </div>
  );
}
