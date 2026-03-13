import { Part } from '../types';
import { Tag, MapPin, DollarSign, Phone } from 'lucide-react';

interface PartCardProps {
  part: Part;
}

export default function PartCard({ part }: PartCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-900">{part.partName}</h3>
        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full font-medium">
          {part.category}
        </span>
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{part.description}</p>

      <div className="space-y-2">
        <div className="flex items-center text-gray-700">
          
          <span className="font-semibold text-green-700">£{part.price}</span>
        </div>

        <div className="flex items-center text-gray-600 text-sm">
          <Tag className="w-4 h-4 mr-2" />
          <span className="capitalize">{part.condition}</span>
        </div>

        <div className="flex items-center text-gray-600 text-sm">
          <MapPin className="w-4 h-4 mr-2" />
          <span>{part.location}</span>
        </div>

        <div className="flex items-center text-gray-600 text-sm pt-2 border-t">
          <Phone className="w-4 h-4 mr-2" />
          <span>{part.contactName}</span>
        </div>
      </div>
    </div>
  );
}
