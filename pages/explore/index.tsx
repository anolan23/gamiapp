import Navbar from '../../components/Navbar';
import Button from '../../components/Button';
import Event from '../../components/Event';

function Explore() {
  return (
    <div className="explore">
      <Navbar>
        <Button color="primary">Create event</Button>
      </Navbar>
      <div className="explore__content">
        <Event
          event={{
            title: 'Halo LAN Party',
            game: 'Halo 3',
            summary: 'This is a summary',
            attendees: 7,
            date: new Date(),
          }}
        />
      </div>
    </div>
  );
}

export default Explore;
