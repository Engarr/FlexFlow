import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { poppins } from '@/lib/fonts';
import { cn } from '@/lib/utils';


type PropsType = {
  title: string;
  children: React.ReactNode;
  style?: string;
};

const AccordionWrapper = ({ children, title, style }: PropsType) => {
  return (
    <Accordion type='single' collapsible className='mb-2 '>
      <AccordionItem value='item-1'>
        <AccordionTrigger className='rounded-xl w-full lg:w-1/2 '>
          {title}
        </AccordionTrigger>
        <AccordionContent className={cn(`${poppins.className}`, style)}>
          {children}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default AccordionWrapper;
