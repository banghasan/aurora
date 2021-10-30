export function Title(props) {
  return (
    <h1 className="font-bold tracking-tighter text-4xl md:text-7xl text-gray-900 mb-8">
      {props.children}
    </h1>
  );
}
