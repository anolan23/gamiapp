import Image from 'next/image';

interface Props {
  src?: string;
  className?: string;
  height?: number;
  width?: number;
}

function Avatar({
  src = '/avatar.jpeg',
  height = 50,
  width = 50,
  className,
}: Props) {
  return (
    <div
      className={`avatar ${className ?? ''}`}
      style={{ height: `${height}px`, width: `${width}px` }}
    >
      <Image src={src} alt="avatar" layout="fill" objectFit="cover" />
    </div>
  );
}
export default Avatar;
