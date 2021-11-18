import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Filters } from "./Filters";
import { Button } from "../UI/Button";
import { Select } from "../UI/Select";
import { SubTitle } from "../UI/SubTitle";
import { Modal } from "../UI/Modal";
import { useForm } from "react-hook-form";

const {
  subHours,
  subDays,
  subYears,
  startOfToday,
  startOfWeek,
  startOfMonth,
  startOfYear,
} = require("date-fns");

export function Informations(props) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState(router.query);
  const { register, handleSubmit, formState } = useForm();

  useEffect(() => {
    if (router.isReady) {
      setActiveFilters(router.query);
    }
  }, [router.isReady]);

  const filters = [
    { label: "Country", value: "country" },
    { label: "Browser", value: "browser" },
    { label: "Page", value: "page" },
  ];

  // TODO: Pls god fix this shit (indentation)
  const getTimestamps = (filter) => {
    switch (filter) {
      case "LAST_24_HOURS":
        return {
          start: new Date(),
          end: subHours(new Date(), 24),
          unit: "hour",
        };
      case "LAST_7_DAYS":
        return { start: new Date(), end: subDays(new Date(), 7), unit: "day" };
      case "LAST_30_DAYS":
        return { start: new Date(), end: subDays(new Date(), 30), unit: "day" };
      case "LAST_90_DAYS":
        return { start: new Date(), end: subDays(new Date(), 90), unit: "day" };
      case "LAST_YEAR":
        return {
          start: new Date(),
          end: subYears(new Date(), 1),
          unit: "month",
        };
      case "TODAY":
        return {
          start: startOfToday(new Date()),
          end: new Date(),
          unit: "hour",
        };
      case "THIS_WEEK":
        return { start: startOfWeek(new Date()), end: new Date(), unit: "day" };
      case "THIS_MONTH":
        return {
          start: startOfMonth(new Date()),
          end: new Date(),
          unit: "day",
        };
      case "THIS_YEAR":
        return {
          start: startOfYear(new Date()),
          end: new Date(),
          unit: "month",
        };
      default:
        return { start: new Date(), end: subHours(new Date(), 24) };
    }
  };

  // TODO: Cool approach to handle the filters, but consider to do it using switch
  // const MULTIPLIERS = {
  //   HOURS: 1,
  //   DAYS: 24,
  // };

  // const getStartDate = (filter) => {
  //   const matches = filter.match(/([A-Z]*)_([\d+]*)_([A-Z]*)+/);
  //   const [, , number, multiplier] = matches;

  //   const startDate = new Date();
  //   startDate.setHours(startDate.getHours() - MULTIPLIERS[multiplier] * number);
  //   return startDate;
  // };

  // const getTimestamps = (filter) => {
  //   const endDate = new Date();
  //   const startDate = getStartDate(filter);

  //   return {
  //     start: startDate.getTime(),
  //     end: endDate.getTime(),
  //   };
  // };

  const handleRangeChange = (e) => {
    const { value } = e.target;
    // const { start, end } = getTimestamps(value);
    const { start, end, unit } = getTimestamps(value);
    handleApply({ start: start.getTime(), end: end.getTime(), unit });
  };

  const onSubmit = (data) => {
    handleApply({ [data.filter]: data.value });
  };

  const handleApply = (data) => {
    setActiveFilters((prev) => {
      const next = { ...prev, ...data };

      // I don't wanna these params in the url
      const { start, end, unit, ...whitelisted } = next;

      // TODO: use router real path
      // TODO2: is this really useful? Consider to disable that.
      router.push({ pathname: "/dashboard", query: whitelisted }, undefined, {
        shallow: true,
      });

      return next;
    });

    setIsModalOpen(false);
  };

  return (
    <div className="flex items-center space-x-5">
      <h3 className="tracking-tighter font-medium text-2xl text-gray-900">
        useaurora.app
      </h3>

      <Filters filters={activeFilters} />

      <div className="flex justify-end w-4/12 space-x-2">
        <div className="flex w-2/4">
          <Button label="Add Filter" onClick={() => setIsModalOpen(true)} />
        </div>
        <div className="flex w-full">
          <Select
            name="range"
            options={[
              { value: "LAST_24_HOURS", label: "Last 24 Hours" },
              { value: "LAST_7_DAYS", label: "Last 7 Days" },
              { value: "LAST_30_DAYS", label: "Last 30 Days" },
              { value: "LAST_90_DAYS", label: "Last 90 Days" },
              { value: "LAST_YEAR", label: "Last Year" },
              { value: "TODAY", label: "Today" },
              { value: "THIS_WEEK", label: "This Week" },
              { value: "THIS_MONTH", label: "This Month" },
              { value: "THIS_YEAR", label: "This Year" },
            ]}
            onChange={handleRangeChange}
          />
        </div>
      </div>

      <Modal isOpen={isModalOpen}>
        <div className="space-y-3 mb-10 flex flex-col">
          <SubTitle>Add Filter</SubTitle>
          <div className="max-w-sm flex text-lg text-gray-600">
            Select the filter, and click.
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-5 mb-10 flex flex-col">
            <Select label="Filter" {...register("filter")} options={filters} />
            <Select
              label="Value"
              options={[
                { value: "firefox", label: "Firefox" },
                { value: "chrome", label: "Chrome" },
              ]}
              {...register("value")}
            />
          </div>
          <div className="flex space-x-4">
            <Button type="submit" label="Apply!" />
            <Button onClick={() => setIsModalOpen(false)} label="Close!" />
          </div>
        </form>
      </Modal>
    </div>
  );
}
