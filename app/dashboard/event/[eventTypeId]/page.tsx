import prisma from "@/lib/db";
import { notFound } from "next/navigation";
import EditEventTypeForm from "../../_components/EditEventTypeForm";
async function getData(eventTypeId: string) {
    const data = await prisma.eventType.findUnique({
      where: {
        id: eventTypeId,
      },
      select: {
        title: true,
        description: true,
        duration: true,
        url: true,
        id: true,
        videoCallSoftware: true,
      },
    });
  
    if (!data) {
      return notFound();
    }
  
    return data;
  }
const EditEvent = async ({
    params,
  }: {
    params: { eventTypeId: string };
  }) => {
    const data = await getData(params.eventTypeId);
  return (
    <EditEventTypeForm
      description={data.description}
      duration={data.duration}
      title={data.title}
      url={data.url}
      key={data.id}
      id={data.id}
      callProvider={data.videoCallSoftware}
    />
  )
}

export default EditEvent
