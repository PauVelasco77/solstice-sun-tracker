import { CITIES } from '@/data/cities';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface SelctCityProps {
  onValueChange: (value: string) => void;
}

export const SelectCity = ({ onValueChange }: SelctCityProps) => {
  return (
    <div className="mt-10 flex flex-col items-center">
      <h2>Could not get your location. Please select a city:</h2>
      <div className="mt-4">
        <Select onValueChange={onValueChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select your city" />
          </SelectTrigger>
          <SelectContent>
            {CITIES.map((city) => (
              <SelectItem key={city.name} value={city.name}>
                {city.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
