import Navbar from '../../../components/Navbar';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import FormSection from '../../../components/FormSection';
import InputGroup from '../../../components/InputGroup';

function Create() {
  return (
    <div className="create">
      <Navbar></Navbar>
      <div className="create__content">
        <FormSection
          title="Basic Info"
          description="Name your game event and tell gamers what game will be played. Add
            details that highlight what makes it unique."
          icon="segment"
        >
          <InputGroup
            label="Event title"
            placeholder="Be clear and descriptive"
          />
          <InputGroup label="Featured game" placeholder="Search games" />
        </FormSection>
        <FormSection
          title="Location"
          description="Help gamers in the area discover your event and let attendees know where to show up."
          icon="map"
        >
          <InputGroup
            label="Venue location"
            placeholder="Search for a venue or address"
          />
        </FormSection>
        <FormSection
          title="Date and time"
          description="Tell gamers when your event starts and ends so they can make plans to attend."
          icon="date_range"
        >
          <InputGroup
            label="Venue location"
            placeholder="Search for a venue or address"
          />
        </FormSection>
      </div>
      <div className="create__actions">
        <Button color="secondary">Discard</Button>
        <Button>Save and Continue</Button>
      </div>
    </div>
  );
}

export default Create;
