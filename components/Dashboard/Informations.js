import { useState } from "react";
import { useForm } from "react-hook-form";
import { Filters } from "./Filters";
import { Button } from "../UI/Button";
import { Select } from "../UI/Select";
import { SubTitle } from "../UI/SubTitle";
import { Modal } from "../UI/Modal";
import { getTimestamps } from "../../utils/dates";

export function Informations(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { register, handleSubmit } = useForm();

  const filters = [
    { label: "Country", value: "country" },
    { label: "Browser", value: "browser" },
    { label: "Page", value: "page" },
  ];

  const handleRangeChange = (e) => {
    const { value } = e.target;
    const { start, end, unit } = getTimestamps(value);

    props.onFilterChange({
      start: start.getTime(),
      end: end.getTime(),
      unit,
    });
  };

  const onSubmit = (data) => {
    props.onFilterChange({ [data.filter]: data.value });
    setIsModalOpen(false);
  };

  return (
    <div className="flex items-center space-x-5">
      <h3 className="tracking-tighter font-medium text-2xl text-gray-900">
        useaurora.app
      </h3>

      <Filters filters={props.activeFilters} />

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
