import { render, cleanup } from "@testing-library/react";
import { Prose } from "../../components/UI/Prose";

afterEach(cleanup);

it("renders without crashing", () => {
  const { container } = render(<Prose />);

  expect(container).toBeInTheDocument();
  expect(container).toHaveTextContent("");
});

it("renders with text", () => {
  const { container } = render(<Prose>Hello!</Prose>);

  expect(container).toBeInTheDocument();
  expect(container).toHaveTextContent("Hello");
});
