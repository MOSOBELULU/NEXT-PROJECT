import { getEventById } from "@/dummy-data";
import { useRouter } from "next/router"
import { Fragment } from "react";
import EventSummary from "@/components/event-detail/event-summary";
import EventLogistics from "@/components/event-detail/event-logistics";
import EventContent from "@/components/event-detail/event-content";
import LogisticsItem from "@/components/event-detail/logistics-item";


export default function EventDetailPage() {
  const router = useRouter();

 const eventId = router.query.eventId;
 const event = getEventById(eventId);

 if (!event) {
  return <p>No event Found</p>;
 }

  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics date={event.date} address={event.location} image={event.image}/>
      <EventContent>
        <p>{event.description}</p>
      </EventContent>

    </Fragment>
  )
}
