import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DeleteEventTypeAction } from "@/lib/actions/general.actions"
import Link from "next/link"

const EventDeletePage = ({ params }: { params: { eventTypeId: string } }) => {
  return (
    <div className="flex-1 flex items-center justify-center">
      <Card className="w-[300px]">
        <CardHeader>
          <CardTitle>Delete Event Type</CardTitle>
          <CardDescription>
            Are you sure you want to delete this event type?
          </CardDescription>
        </CardHeader>
        <CardFooter className="w-full flex justify-between">
          <Button asChild variant="secondary" className="text-white h-11 md:w-[100px]">
            <Link href="/dashboard">Cancel</Link>
          </Button>
          <form action={DeleteEventTypeAction}>
            <input type="hidden" name="id" value={params.eventTypeId} />
            <Button variant="destructive" className="h-11 md:w-[100px]">Delete</Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  )
}

export default EventDeletePage
