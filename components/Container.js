import { Navbar } from "./Navbar/Navbar";

export function Container(props) {
  return (
    <div className="bg-white">
      <Navbar />

      <div className="max-w-7xl mx-auto">
        <main className="px-6 md:px-0 py-14">{props.children}</main>
      </div>
    </div>
  );
}
