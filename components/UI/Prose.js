export function Prose(props) {
  return (
    <p className="text-gray-500 prose lg:prose-xl tracking-tighter">
      {props.children}
    </p>
  );
}
