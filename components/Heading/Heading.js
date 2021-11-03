import { Prose } from "../UI/Prose";
import { Title } from "../UI/Title";

export function Heading(props) {
  return (
    <div className="mb-20">
      <Title>{props.title}</Title>
      <Prose>{props.children}</Prose>
    </div>
  );
}
