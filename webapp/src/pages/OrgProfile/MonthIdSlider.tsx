import { useMemo } from "react";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useOrganisation } from "@/hooks/useOrganisation";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import dayjs from "dayjs";
import objectSupport from "dayjs/plugin/objectSupport";
dayjs.extend(objectSupport);

export const MonthIDSlider = () => {
  const { monthYear, updateMonthYear } = useOrganisation();

  const dayjsMonthYear = useMemo(() => {
    return dayjs({
      month: monthYear.month - 1, // month is 0 indexed in dayjs
      year: monthYear.year,
    });
  }, [monthYear]);

  const onPrevClick = () => {
    const updatedDayjs = dayjsMonthYear.subtract(1, "month");
    updateMonthYear(updatedDayjs.month() + 1, updatedDayjs.year());
  };

  const onNextClick = () => {
    const updatedDayjs = dayjsMonthYear.add(1, "month");
    updateMonthYear(updatedDayjs.month() + 1, updatedDayjs.year());
  };

  return (
    <ToggleGroup type="single" size="sm">
      <p className="text-foreground/80 font-semibold text-lg">
        {dayjsMonthYear.format("MMM YYYY")}
      </p>

      <ToggleGroupItem value="prev" onClick={onPrevClick}>
        <ChevronLeftIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="next" onClick={onNextClick}>
        <ChevronRightIcon />
      </ToggleGroupItem>
    </ToggleGroup>
  );
};
