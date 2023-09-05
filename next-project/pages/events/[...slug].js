import { getFilteredEvents } from "@/dummy-data";
import { useRouter } from "next/router"
import EventList from "@/components/events/eventList";
import ResultsTitle from "@/components/events/ResultsTitle";
import { Fragment } from "react";
import Button from "@/components/ui/button";
import ErrorAlert from "@/components/ui/errorAlert";

export default function FilteredEventsPage() {
  const router = useRouter();

  const filterData = router.query.slug;
  console.log(filterData)

  if (!filterData){
    return <p className='center'>Loading...</p>
  }

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if(isNaN(numYear) || isNaN(numMonth) || numYear > 2023 || numYear < 2021 || numMonth < 1 || numMonth > 12) {
    return 
    <Fragment>
      <ErrorAlert>
      <p>invalid filter. Please adjust your values!</p>
      </ErrorAlert>
      
      <div>
      <Button link='/events'>Show all Events</Button>
      </div>
    </Fragment>
  }
  const filteredEvents = getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  if (!filteredEvents || filteredEvents.length === 0){ <Fragment>
    <ErrorAlert> <p>No Events found for the chosen Filter!!</p></ErrorAlert>
   
    <div className='center'> 
    <Button link='/events'>Show all Events</Button>
    </div>
    
  </Fragment>
  }

  const date = new Date(numYear, numMonth - 1)

  return (
    <Fragment>
      <ResultsTitle date={date}/>
      <EventList items={filteredEvents}/>
    </Fragment>
  )
}
