import { render, screen, cleanup } from "@testing-library/react";
import { Title } from "../../components/UI/Title";

afterEach(cleanup);

it("renders without crashing", () => {
  render(<Title />);

  expect(screen.getByRole("heading")).toBeInTheDocument();
  expect(screen.getByRole("heading")).toHaveTextContent("");
});

it("renders with text", () => {
  render(<Title>Hello!</Title>);

  expect(screen.getByRole("heading")).toBeInTheDocument();
  expect(screen.getByRole("heading")).toHaveTextContent("Hello");
});
