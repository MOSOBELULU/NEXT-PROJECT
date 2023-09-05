import { Fragment } from "react"
import { getAllEvents } from "@/dummy-data"
import EventList from "@/components/events/eventList"
import EventSearch from "@/components/events/EventSearch"
import { useRouter } from "next/router"

export default function AllEventsPage() {
  const events = getAllEvents();
  const router = useRouter();

  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}/abc`;
    router.push(fullPath);
  }
  return (
    <Fragment>
      <EventSearch onSearch={findEventsHandler}/>
      <EventList
      items={events}/>
    </Fragment>
   
  )
}
