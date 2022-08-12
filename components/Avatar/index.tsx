import Image from 'next/image';
import { buildImageUrl } from '../../lib/bucket';

interface Props {
  objectKey?: string;
  className?: string;
  height?: number;
  width?: number;
}

function Avatar({ objectKey, height = 50, width = 50, className }: Props) {
  return (
    <div
      className={`avatar ${className ?? ''}`}
      style={{ height: `${height}px`, width: `${width}px` }}
    >
      <Image
        src={objectKey ? buildImageUrl(objectKey) : '/avatar.jpeg'}
        alt="avatar"
        layout="fill"
        objectFit="cover"
      />
    </div>
  );
}
export default Avatar;
