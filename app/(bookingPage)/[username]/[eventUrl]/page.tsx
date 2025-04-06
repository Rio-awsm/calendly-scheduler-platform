import { SubmitButton } from "@/app/_components/SubmitButton";
import RenderCalender from "@/components/BookingForm/RenderCalender";
import TimeTable from "@/components/BookingForm/TimeTable";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CreateMeeting } from "@/lib/actions/general.actions";
import prisma from "@/lib/db";
import { BookMarked, CalendarX2, Clock } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";

async function getData(eventUrl: string, username: string) {
  const data = await prisma.eventType.findFirst({
    where: {
      url: eventUrl,
      user: {
        username: username,
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
  params: { username: string; eventUrl: string };
  searchParams: { date?: string; time?: string };
}) => {
  const selectedDate = searchParams.date
    ? new Date(searchParams.date)
    : new Date();
  const data = await getData(params.eventUrl, params.username);
  const showForm = !!searchParams.date && !!searchParams.time;

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(selectedDate);

  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
      {showForm ? (
        <Card className="max-w-[600px] w-full">
          <CardContent className="p-5 grid md:grid-cols-2 gap-4">
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
                    {data.videoCallSoftware}
                  </span>
                </p>
              </div>
            </div>
            <form className="flex flex-col gap-y-4 w-full" action={CreateMeeting}>
              <input type="hidden" name="eventTypeId" value={data.id} />
              <input type="hidden" name="username" value={params.username} />
              <input type="hidden" name="fromTime" value={searchParams.time} />
              <input type="hidden" name="eventDate" value={searchParams.date} />
              <input type="hidden" name="meetingLength" value={data.duration} />
              <div className="flex flex-col gap-y-1">
                <Label>Your Name</Label>
                <Input name="name" placeholder="Your Name" />
              </div>

              <div className="flex flex-col gap-y-1">
                <Label>Your Email</Label>
                <Input name="email" placeholder="johndoe@gmail.com" />
              </div>

              <SubmitButton
                text="Book Meeting"
                className="text-white h-11 w-full"
              />
            </form>
          </CardContent>
        </Card>
      ) : (
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

              <TimeTable
                selectedDate={selectedDate}
                userName={params.username}
                meetingDuration={data.duration}
              />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BookingPage;
