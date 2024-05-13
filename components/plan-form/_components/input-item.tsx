import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type inputItemType = {
  label: string;
  id: string;
  value: string | number;
  type: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  style?: string;
  disabled?: boolean;
  error?: string;
};

const InputItem = ({
  label,
  id,
  value,
  type,
  onChange,
  style,
  disabled,
  error,
}: inputItemType) => {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        className={style}
        type={type}
        disabled={disabled}
        value={value}
        onChange={onChange}
      />
      {error && <p className='text-xs text-red-500'>{error}</p>}
    </div>
  );
};

export default InputItem;

