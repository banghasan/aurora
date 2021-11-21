import { animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { useStatistics } from "../../lib/hooks/useStatistics";
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
  const { data, isLoading, isError } = useStatistics(props.filters);
  const isLoaded = !isLoading && !isError;

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  const { visits, uniqueVisits, bounces, sessions, avgDuration } = data;

  return (
    <Card className="p-6">
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between">
          <Statistic label="Page Views" value={visits._count._all} />
          <Statistic label="Unique Visits" value={uniqueVisits._count._all} />
          <Statistic label="Bounces" value={bounces._count._all} />
          <Statistic label="Sessions" value={sessions._count._all} />
          <Statistic label="Visit Duration" value={avgDuration._avg.duration} />
          <Statistic label="Current Visitors" value={12} />
        </div>
      </div>
    </Card>
  );
}
