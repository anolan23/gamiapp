import Slider, { SliderProps } from 'rc-slider';
import 'rc-slider/assets/index.css';

interface Props extends SliderProps {}

function SliderComponent({ ...props }: Props) {
  return (
    <div className="slider">
      <Slider
        {...props}
        trackStyle={{ height: '10px', backgroundColor: '#3d98ff' }}
        railStyle={{ height: '10px', backgroundColor: '#e6e6e6' }}
        handleStyle={{
          height: '25px',
          width: '25px',
          marginTop: '-7.5px',
          borderColor: '#bfbfbf',
          opacity: 1,
        }}
      />
    </div>
  );
}

export default SliderComponent;
