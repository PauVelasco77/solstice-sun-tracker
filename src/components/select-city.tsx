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
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6 text-center">
        <h2 className="text-foreground text-lg font-medium md:text-xl">
          Could not get your location. Please select a city:
        </h2>
        <div className="w-full">
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
    </div>
  );
};
