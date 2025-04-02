"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm } from "@conform-to/react";
import { Label } from "@/components/ui/label";
import React, { useActionState } from "react";
import { SubmitButton } from "../_components/SubmitButton";
import { OnboardingAction } from "@/lib/actions/general.actions";
import { parseWithZod } from "@conform-to/zod";
import { onBoardingSChema } from "@/lib/zodSchemas";

const OnboardingPage = () => {
  const [lastResult, action] = useActionState(OnboardingAction, undefined);

  const [form, fields] = useForm({
    //sync result of last submission
    lastResult,
    // Reuse the validation logic on the client
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: onBoardingSChema });
    },

    // Validate the form on blur event triggered
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <Card>
        <CardHeader className="lg:w-[600px] w-[350px]">
          <CardTitle className="lg:text-3xl text-xl pb-2">
            Welcome to Calen<span className="text-blue-500">dra.io</span>
          </CardTitle>
          <CardDescription className="lg:text-lg">
            We need the following information to set up your profile
          </CardDescription>
        </CardHeader>

        <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
          <CardContent className="flex flex-col gap-y-5">
            <div className="grid gap-y-3">
              <Label>Full Name</Label>
              <Input
                name={fields.fullname.name}
                defaultValue={fields.fullname.initialValue}
                key={fields.fullname.key}
                placeholder="John Doe"
              />
              <p className="text-red-500 text-sm">{fields.fullname.errors}</p>
            </div>

            <div className="grid gap-y-3">
              <Label>Username</Label>
              <div className="flex rounded-md">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-muted bg-muted text-muted-foreground text-sm">
                  Calendra.io/
                </span>
                <Input
                  type="text"
                  key={fields.username.key}
                  defaultValue={fields.username.initialValue}
                  name={fields.username.name}
                  placeholder="example-user-1"
                  className="rounded-l-none"
                />
              </div>
              <p className="text-red-500 text-sm">{fields.username.errors}</p>
            </div>
          </CardContent>
          <CardFooter className="w-full pt-6">
            <SubmitButton
              className="w-full text-white h-11 text-md"
              text="Submit"
            />
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default OnboardingPage;
