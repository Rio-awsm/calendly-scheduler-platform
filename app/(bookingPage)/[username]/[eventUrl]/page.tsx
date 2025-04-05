import RenderCalender from "@/components/BookingForm/RenderCalender";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import prisma from "@/lib/db";
import { BookMarked, CalendarX2, Clock } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";

async function getData(eventUrl: string, userName: string) {
  const data = await prisma.eventType.findFirst({
    where: {
      url: eventUrl,
      user: {
        username: userName,
      },
      active: true,
    },
    select: {
      id: true,
      description: true,
      title: true,
      duration: true,
      videoCallSoftware: true,

      user: {
        select: {
          image: true,
          name: true,
          Availability: {
            select: {
              day: true,
              isActive: true,
            },
          },
        },
      },
    },
  });
  if (!data) {
    return notFound();
  }
  return data;
}

const BookingPage = async ({
  params,
  searchParams,
}: {
  params: { userName: string; eventUrl: string };
  searchParams: { date?: string; time?: string };
}) => {
  const selectedDate = searchParams.date
    ? new Date(searchParams.date)
    : new Date();
  const data = await getData(params.eventUrl, params.userName);

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(selectedDate);
  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
      <Card className="w-full max-w-[1000px] mx-auto">
        <CardContent className="p-5 md:flex md:gap-8">
          <div>
            <Image
              src={data.user.image as string}
              alt={`${data.user.name}'s profile picture`}
              className="size-9 rounded-full"
              width={30}
              height={30}
            />
            <p className="text-sm font-medium text-muted-foreground mt-1">
              {data.user.name}
            </p>
            <h1 className="text-xl font-semibold mt-2">{data.title}</h1>
            <p className="text-sm font-medium text-muted-foreground">
              {data.description}
            </p>
            <div className="mt-5 grid gap-y-3">
              <p className="flex items-center">
                <CalendarX2 className="size-4 mr-2 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">
                  {formattedDate}
                </span>
              </p>
              <p className="flex items-center">
                <Clock className="size-4 mr-2 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">
                  {data.duration} Mins
                </span>
              </p>
              <p className="flex items-center">
                <BookMarked className="size-4 mr-2 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">
                  Google Meet
                </span>
              </p>
            </div>
          </div>

          <div className="md:flex md:gap-8">
            <Separator
              orientation="vertical"
              className="hidden md:block h-full w-[1px]"
            />

            <div className="my-4 md:my-0">
              <RenderCalender daysofWeek={data.user?.Availability as any} />
            </div>

            <Separator
              orientation="vertical"
              className="hidden md:block h-full w-[1px]"
            />

            <>Timeslot</>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingPage;
