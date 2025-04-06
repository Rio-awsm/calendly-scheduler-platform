"use client"
import { SubmitButton } from "@/app/_components/SubmitButton";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/ButtonGroup";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { EditEventTypeAction } from "@/lib/actions/general.actions";
import { eventTypeSchema } from "@/lib/zodSchemas";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import Link from "next/link";
import { useActionState, useState } from "react";

interface iAppProps {
  id: string;
  title: string;
  url: string;
  description: string;
  duration: number;
  callProvider: string;
}

type Platform = "Zoom Meeting" | "Google Meet" | "Microsoft Teams";

const EditEventTypeForm = ({
  description,
  duration,
  title,
  url,
  callProvider,
  id,
}: iAppProps) => {
  const [lastResult, action] = useActionState(EditEventTypeAction, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: eventTypeSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });
  const [activePlatform, setActivePlatform] = useState<Platform>(
    callProvider as Platform
  );

  const togglePlatform = (platform: Platform) => {
    setActivePlatform(platform);
  };
  return (
    <div className="h-full w-full flex-1 flex flex-col items-center justify-center">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Add new appointment type</CardTitle>
          <CardDescription>
            Create a new appointment type that allows people to book times.
          </CardDescription>
        </CardHeader>
        <form noValidate id={form.id} onSubmit={form.onSubmit} action={action}>
          <input type="hidden" name="id" value={id} />
          <CardContent className="grid gap-y-5">
            <div className="flex flex-col gap-y-2">
              <Label>Title</Label>
              <Input
                name={fields.title.name}
                key={fields.title.key}
                defaultValue={title}
                placeholder="30 min meeting"
              />
              <p className="text-red-500 text-sm">{fields.title.errors}</p>
            </div>

            <div className="grid gap-y-2 ">
              <Label>Url</Label>
              <div className="flex rounded-md">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-muted bg-muted text-muted-foreground text-sm">
                  CalMarshal.com/
                </span>
                <Input
                  type="text"
                  key={fields.url.key}
                  defaultValue={url}
                  name={fields.url.name}
                  placeholder="example-user-1"
                  className="rounded-l-none"
                />
              </div>

              <p className="text-red-500 text-sm">{fields.url.errors}</p>
            </div>

            <div className="grid gap-y-2">
              <Label>Description</Label>
              <Textarea
                name={fields.description.name}
                key={fields.description.key}
                defaultValue={description}
                placeholder="30 min meeting"
              />
              <p className="text-red-500 text-sm">
                {fields.description.errors}
              </p>
            </div>

            <div className="grid gap-y-2">
              <Label>Duration</Label>
              <Select
                name={fields.duration.name}
                key={fields.duration.key}
                defaultValue={String(duration)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select the duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Duration</SelectLabel>
                    <SelectItem value="15">15 Mins</SelectItem>
                    <SelectItem value="30">30 Min</SelectItem>
                    <SelectItem value="45">45 Mins</SelectItem>
                    <SelectItem value="60">1 Hour</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              <p className="text-red-500 text-sm">{fields.duration.errors}</p>
            </div>

            <div className="grid gap-y-2">
              <input
                type="hidden"
                name={fields.videoCallSoftware.name}
                value={activePlatform}
              />
              <Label>Video Call Provider</Label>
              <ButtonGroup className="w-full gap-x-5 pt-2">
                <Button
                  onClick={() => togglePlatform("Zoom Meeting")}
                  type="button"
                  className="text-black dark:text-white h-11 lg:w-[372px]"
                  variant={
                    activePlatform === "Zoom Meeting" ? "secondary" : "default"
                  }
                >
                  Zoom
                </Button>
                <Button
                  onClick={() => togglePlatform("Google Meet")}
                  type="button"
                  className="text-black dark:text-white h-11 lg:w-[372px]"
                  variant={
                    activePlatform === "Zoom Meeting" ? "secondary" : "default"
                  }
                >
                  Google Meet
                </Button>
                <Button
                  type="button"
                  className="text-black dark:text-white h-11 lg:w-[372px]"
                  variant={
                    activePlatform === "Zoom Meeting" ? "secondary" : "default"
                  }
                  onClick={() => togglePlatform("Microsoft Teams")}
                >
                  Microsoft Teams
                </Button>
              </ButtonGroup>
            </div>
          </CardContent>
          <CardFooter className="w-full flex justify-between pt-11">
            <Button asChild variant="secondary" className="lg:w-[500px] h-11 w-[200px]">
              <Link href="/dashboard">Cancel</Link>
            </Button>
            <SubmitButton text="Edit Event Type" className="text-white lg:w-[500px] h-11 w-[200px]" />
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default EditEventTypeForm;
