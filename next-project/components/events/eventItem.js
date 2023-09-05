import classes from "./eventItem.module.css"
import Button from "../ui/button"
import DateIcon from "../icons/date-icon"
import AddressIcon from "../icons/address-icon"
import ArrowRightIcon from "../icons/arrow-right-icon"

export default function EventItem(props) {
    const {title, image, date, location, id} = props

    const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    })

    const formatedAddress = location.replace(',', '/n')

    const exploreLink = '/events/${id}'
  return (
    <div>
      <li className={classes.item}>
        <img src={'/' + image} alt={title}/>
      </li>
    <div className={classes.content}>
        <div className={classes.summary}>
        <h2>{title}</h2>
    </div>
    <div className={classes.date}>
        <DateIcon />
        <time>{humanReadableDate}</time>
    </div>
    <div className={classes.address}>
        <AddressIcon/>
        <address>{formatedAddress}</address>
        <div className={classes.actions}>
            <Button link={exploreLink}>
                Explore Event
                <span className={classes.icon}>
                    <ArrowRightIcon/>
                    </span>
            </Button>
        </div>
        </div>
    </div>
    </div>
  )
}
