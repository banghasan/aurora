import { render, screen, cleanup } from "@testing-library/react";
import { Input } from "../../components/UI/Input";

afterEach(cleanup);

it("renders without crashing", () => {
  const { container } = render(<Input />);

  expect(container).toBeInTheDocument();
});

it("renders the label without for attribute", () => {
  const { getByText } = render(<Input label="test" />);

  expect(getByText("test")).toBeInTheDocument();
  expect(getByText("test")).not.toHaveAttribute("for");
  expect(getByText("test")).toHaveTextContent("test");
});

it("renders the label with for attribute", () => {
  const { getByText } = render(<Input label="test" id="test" />);

  expect(getByText("test")).toBeInTheDocument();
  expect(getByText("test")).toHaveAttribute("for");
  expect(getByText("test")).toHaveTextContent("test");
});

it("shoult render the input with type text by default", () => {
  const { getByRole } = render(<Input />);

  expect(getByRole("textbox")).toHaveAttribute("type", "text");
});

it.skip("should render the input with the correct type", () => {
  const { getByRole } = render(<Input type="number" />);

  expect(getByRole("textbox")).toHaveAttribute("type", "number");
});

it("should render the input with the correct name", () => {
  const { getByRole } = render(<Input name="test" />);

  expect(getByRole("textbox")).toHaveAttribute("name", "test");
  expect(getByRole("textbox")).toHaveAttribute("id", "test");
});

it("renders a different id if it is specified", () => {
  const { getByRole } = render(<Input id="test" name="name" />);

  expect(getByRole("textbox")).toHaveAttribute("id", "test");
  expect(getByRole("textbox")).toHaveAttribute("name", "name");
});
