import Image from 'next/image';

interface Props {
  src?: string;
  className?: string;
}

function Avatar({ src = '/avatar.jpeg', className }: Props) {
  return (
    <div className={`avatar ${className ?? ''}`}>
      <Image src={src} alt="avatar" layout="fill" objectFit="cover" />
    </div>
  );
}
export default Avatar;
