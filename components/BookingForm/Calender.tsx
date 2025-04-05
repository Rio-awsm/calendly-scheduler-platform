import { CalendarProps, DateValue, useCalendar, useLocale } from "react-aria";
import { createCalendar } from "@internationalized/date";
import { useCalendarState } from "react-stately";
import CalenderHeader from "./CalenderHeader";
import CalenderGrid from "./CalenderGrid";

const Calender = (
  props: CalendarProps<DateValue> & {
    isDateUnavailable?: (date: DateValue) => boolean;
  }
) => {
  const { locale } = useLocale();
  const state = useCalendarState({
    ...props,
    visibleDuration: { months: 1 },
    locale,
    createCalendar,
  });
  const { calendarProps, prevButtonProps, nextButtonProps } = useCalendar(
    props,
    state
  );
  return (
    <div {...calendarProps} className="inline-block">
      <CalenderHeader
        state={state}
        calendarProps={calendarProps}
        prevButtonProps={prevButtonProps}
        nextButtonProps={nextButtonProps}
      />

      <div className="flex gap-8">
        <CalenderGrid
          state={state}
          isDateUnavailable={props.isDateUnavailable}
        />
      </div>
    </div>
  );
};

export default Calender;
