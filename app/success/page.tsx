import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";

const Successpage = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <Card className="max-w-[400px] w-full mx-auto">
        <CardContent className="p-6 flex flex-col w-full items-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <Check className="w-8 h-8 text-green-500" />
          </div>
          <h1 className="text-2xl font-semibold mt-4">
            This event is scheduled
          </h1>
          <p className="text-sm text-muted-foreground text-center mt-1">
            We emailed you and the other attendees a calendar invitation with
            all the details.
          </p>
        </CardContent>
        <CardFooter>
          <Button className="w-full text-white h-11" asChild>
            <Link href="/">Close this Page</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Successpage;
