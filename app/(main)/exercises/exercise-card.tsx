import { Button } from '@/components/ui/button';
import Link from 'next/link';

type PropsType = {
  name: string;
  link: string;
};

const ExerciseCard = ({ name, link }: PropsType) => {
  return (
    <Link href={`/exercises/${link}`}>
      <Button className='' size='lg'>
        {name}
      </Button>
    </Link>
  );
};

export default ExerciseCard;
