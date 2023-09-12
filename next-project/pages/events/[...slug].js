
import { useRouter } from "next/router"
import EventList from "@/components/events/eventList";
import ResultsTitle from "@/components/events/ResultsTitle";
import { Fragment, useEffect, useState } from "react";
import Button from "@/components/ui/button";
import ErrorAlert from "@/components/ui/error-alert/errorAlert";
import useSWR from 'swr'

export default function FilteredEventsPage(props) {
  const [loadedEvents, setLoadedEvents] = useState()
  const router = useRouter();

  const filterData = router.query.slug;
  const fetcher = (...args) => fetch(...args).then(res => res.json())

  const { data, error } = useSWR('https://events-b3389-default-rtdb.firebaseio.com/events.json', fetcher);

  useEffect(() => {
    if (data) {
      const events = [];

      for (const key in data) {
        events.push({
          id: key,
          ...data[key],
        })
      }
      setLoadedEvents(events);
    }
  }, [data])

  if (!loadedEvents) {
    return <p className='center'>Loading...</p>
  }

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  
  if (isNaN(numYear) ||
  isNaN(numMonth) ||
  numYear > 2023 ||
  numYear < 2021 ||
  numMonth < 1 ||
  numMonth > 12 ||
  error
  ) {
    return (
    <Fragment>
        <ErrorAlert>
          <p>invalid filter. Please adjust your values!</p>
        </ErrorAlert>

        <div>
          <Button link='/events'>Show all Events</Button>
        </div>
      </Fragment>
    )
    }
    
    const filteredEvents = loadedEvents.filter((event) => {
      const eventDate = new Date(event.date);
      return eventDate.getFullYear() === numYear && eventDate.getMonth() === numMonth - 1;
    });
    if (!filteredEvents || filteredEvents.length === 0) {
      return (
      <Fragment>
        <ErrorAlert> <p>No Events found for the chosen Filter!!</p></ErrorAlert>

        <div className='center'>
          <Button link='/events'>Show all Events</Button>
        </div>

      </Fragment>
      )
    }

    const date = new Date(numYear, numMonth - 1)

    return (
      <Fragment>
        <ResultsTitle date={date} />
        <EventList items={filteredEvents} />
      </Fragment>
    )
  }

  // export async function getServerSideProps(context) {
  //   const { params } = context;

  //   const filterData = params.slug;

  //   const filteredYear = filterData[0];
  //   const filteredMonth = filterData[1];

  //   const numYear = +filteredYear;
  //   const numMonth = +filteredMonth;

  //   if (isNaN(numYear) || isNaN(numMonth) || numYear > 2023 || numYear < 2021 || numMonth < 1 || numMonth > 12) {
  //     props: { hasError: true }
  //     //  notFound: true,
  //     //  redirect: {
  //     //   destination: '/error'
  //     //  };
  //   };

  //   const filteredEvents = await getFilteredEvents({
  //     year: numYear,
  //     month: numMonth,
  //   });


  //   return {
  //     props: {
  //       events: filteredEvents,
  //       date: {
  //         year: numYear,
  //         month: numMonth,
  //       }
  //     }
  //   };

  // }
