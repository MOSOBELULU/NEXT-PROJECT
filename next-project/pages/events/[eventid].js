import { getEventById } from "@/dummy-data";
import { useRouter } from "next/router"
import { Fragment } from "react";
import EventSummary from "@/components/event-detail/event-summary";
import EventLogistics from "@/components/event-detail/event-logistics";
import EventContent from "@/components/event-detail/event-content";
import ErrorAlert from "@/components/ui/errorAlert";


export default function EventDetailPage() {
  const router = useRouter();

 const eventId = router.query.eventId;
 const event = getEventById(eventId);

 if (!event) {
  return 
  <ErrorAlert><p>No event Found</p></ErrorAlert>;
 }

  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics date={event.date} address={event.location} image={event.image} imageAlt={image.title}/>
      <EventContent>
        <p>{event.description}</p>
      </EventContent>

    </Fragment>
  )
}
