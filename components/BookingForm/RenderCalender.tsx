"use client";
import {
  CalendarDate,
  DateValue,
  getLocalTimeZone,
  today,
  parseDate,
} from "@internationalized/date";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Calender from "./Calender";

interface iAppProps {
  daysofWeek: { day: string; isActive: boolean }[];
}

const RenderCalender = ({ daysofWeek }: iAppProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [date, setDate] = useState<CalendarDate>(() => {
    const dateParam = searchParams.get("date");
    return dateParam ? parseDate(dateParam) : today(getLocalTimeZone());
  });

  useEffect(() => {
    const dateParam = searchParams.get("date");
    if (dateParam) {
      setDate(parseDate(dateParam));
    }
  }, [searchParams]);

  const handleChangeDate = (date: DateValue) => {
    console.log(date);
    setDate(date as CalendarDate);
    const url = new URL(window.location.href);

    url.searchParams.set("date", date.toString());

    router.push(url.toString());
  };

  const isDateUnavailable = (date: DateValue) => {
    const dayOfWeek = date.toDate(getLocalTimeZone()).getDay();
    const adjustedIndex = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    return !daysofWeek[adjustedIndex].isActive;
  };
  return (
    <Calender
      minValue={today(getLocalTimeZone())}
      defaultValue={today(getLocalTimeZone())}
      value={date}
      onChange={handleChangeDate}
      isDateUnavailable={isDateUnavailable}
    />
  );
};

export default RenderCalender;
