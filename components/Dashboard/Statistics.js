import { animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { formatter } from "../../utils/math";
import { Card } from "../UI/Card";

export function Statistic(props) {
  const numberRef = useRef();

  useEffect(() => {
    const node = numberRef.current;

    const controls = animate(0, props.value, {
      delay: 0.2,
      type: "spring",
      stiffness: 10,
      onUpdate: (v) => {
        node.textContent = formatter(Math.round(v));
      },
    });

    return () => controls.stop();
  }, [props.value]);

  return (
    <div>
      <div className="tracking-tighter text-lg text-gray-500">
        {props.label}
      </div>
      <div
        className="font-bold tracking-tighter text-5xl text-gray-900"
        ref={numberRef}
      >
        0
      </div>
    </div>
  );
}

export function Statistics(props) {
  return (
    <Card className="p-6">
      <div className="flex flex-col space-y-6">
        <div className="flex space-x-14">
          <Statistic label="Page Views" value={4000000000} />
          <Statistic label="Unique Visits" value={200000000} />
          <Statistic label="Bounces" value={354325} />
          <Statistic label="Visit Duration" value={45} />
          <Statistic label="Current Visitors" value={12} />
        </div>
      </div>
    </Card>
  );
}
