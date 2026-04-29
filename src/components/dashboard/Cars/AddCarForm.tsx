import { Car } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { imageUrl } from "../../../redux/base/baseAPI";
import { useCreateCarMutation, useUpdateCarMutation } from "../../../redux/features/cars/carsApi";
import { MultipleImageUploader } from "../../Shared/MultipleImageUploader";
import { SingleImageUpload } from "../../Shared/SingleImageUpload";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";
import { useGetHostsQuery } from "../../../redux/features/host/hostApi";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import MapPickerModal from "./Mappickermodal";

interface AddCarFormProps {
  onSubmit?: (formData: FormData) => void;
  onCancel?: () => void;
  data?: any;
  open?: boolean;
}

const FACILITIES = [
  { label: "Air Conditioning", value: "Air Conditioning" },
  { label: "Bluetooth", value: "Bluetooth" },
  { label: "GPS Navigation", value: "GPS Navigation" },
  { label: "Reverse Camera", value: "Reverse Camera" },
  { label: "USB Charger", value: "USB Charger" },
  { label: "Sunroof", value: "Sunroof" },
  { label: "Parking Sensors", value: "Parking Sensors" },
  { label: "Cruise Control", value: "Cruise Control" },
];

const DAYS = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"];
const HOURS = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, "0")}:00`);

// Controlled form fields state
interface FormFields {
  brand: string;
  model: string;
  year: string;
  color: string;
  licensePlate: string;
  seatNumber: string;
  transmission: string;
  fuelType: string;
  mileage: string;
  dailyPrice: string;
  hourlyPrice: string;
  depositAmount: string;
  minimumTripDuration: string;
  city: string;
  assignedHosts: string;
  pickupLatitude: string;
  pickupLongitude: string;
  withDriver: string;
  shortDescription: string;
  about: string;

}

const defaultFields: FormFields = {
  brand: "",
  model: "",
  year: "",
  color: "",
  licensePlate: "",
  seatNumber: "",
  transmission: "",
  fuelType: "",
  mileage: "",
  dailyPrice: "",
  hourlyPrice: "",
  depositAmount: "",
  minimumTripDuration: "",
  city: "",
  assignedHosts: "",
  pickupLatitude: "",
  pickupLongitude: "",
  withDriver: "false",
  shortDescription: "",
  about: "",
};

export default function AddCarForm({ onCancel, data, open }: AddCarFormProps) {
  if (!open) return null;
  const [mapOpen, setMapOpen] = useState(false);

  const isEditMode = !!data?._id;
  const [fields, setFields] = useState<FormFields>(defaultFields);
  const [images, setImages] = useState<File[]>([]);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [selectedDays, setSelectedDays] = useState<string[]>(DAYS);
  const [selectedHours, setSelectedHours] = useState<string[]>(HOURS);
  const [image, setImage] = useState<File | null>(null);
  const [existCover, setExistCover] = useState("");
  const [existImages, setExistImages] = useState<string[]>([]);
  const [createCar] = useCreateCarMutation();
  const [updateCar] = useUpdateCarMutation();
  const { data: hostsData } = useGetHostsQuery({});

  
  // Populate form when editing
  useEffect(() => {
    if (data) {
      setFields({
        brand: data.brand || "",
        model: data.model || "",
        year: data.year?.toString() || "",
        color: data.color || "",
        licensePlate: data.licensePlate || "",
        seatNumber: data.seatNumber?.toString() || "",
        transmission: data.transmission || "",
        fuelType: data.fuelType || "",
        mileage: data.mileage || "",
        dailyPrice: data.dailyPrice?.toString() || "",
        hourlyPrice: data.hourlyPrice?.toString() || "",
        depositAmount: data.depositAmount?.toString() || "",
        minimumTripDuration: data.minimumTripDuration?.toString() || "",
        city: data.city || "",
        assignedHosts: data?.assignedHosts?._id?.toString() || "",
        pickupLatitude: data.pickupPoint?.coordinates?.[1]?.toString() || "",
        pickupLongitude: data.pickupPoint?.coordinates?.[0]?.toString() || "",
        withDriver: data.withDriver?.toString() || "false",
        shortDescription: data.shortDescription || "",
        about: data.about || "",
      });      

      if (data.coverImage) setExistCover(data.coverImage);
      if (data.images?.length) setExistImages(data.images);
      if (data.facilities?.length) {
        setSelectedFacilities(data.facilities.map((f: any) => f.value));
      }
      if (data.availableDays?.length) setSelectedDays(data.availableDays);
      if (data.availableHours?.length) setSelectedHours(data.availableHours);
    }
  }, [data]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const toggleFacility = (value: string) => {
    setSelectedFacilities((prev) =>
      prev.includes(value) ? prev.filter((f) => f !== value) : [...prev, value]
    );
  };

  const toggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const toggleAllDays = () => {
    setSelectedDays((prev) => (prev.length === DAYS.length ? [] : DAYS));
  };

  const toggleAllHours = () => {
    setSelectedHours((prev) => (prev.length === HOURS.length ? [] : HOURS));
  };

  // handle location confirm from map picker modal
  const handleLocationConfirm = ({ lat, lng }: { lat: number; lng: number }) => {
    setFields((prev: any) => ({
      ...prev,
      pickupLatitude: lat.toFixed(6),
      pickupLongitude: lng.toFixed(6),
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();

    if(!fields?.pickupLatitude || !fields?.pickupLongitude) {
      toast.error("Please select a pickup location on the map.");
      return;
    }
    const payload = {
      brand: fields.brand,
      model: fields.model,
      year: parseInt(fields.year),
      transmission: fields.transmission,
      fuelType: fields.fuelType,
      mileage: fields.mileage,
      seatNumber: parseInt(fields.seatNumber),
      depositAmount: parseFloat(fields.depositAmount),
      color: fields.color,
      assignedHosts: fields.assignedHosts,
      about: fields.about,
      shortDescription: fields.shortDescription,
      licensePlate: fields.licensePlate,
      dailyPrice: parseFloat(fields.dailyPrice),
      hourlyPrice: parseFloat(fields.hourlyPrice),
      minimumTripDuration: parseFloat(fields.minimumTripDuration),
      withDriver: fields.withDriver === "true",
      city: fields.city,
      pickupPoint: {
        type: "Point",
        coordinates: [parseFloat(fields.pickupLongitude), parseFloat(fields.pickupLatitude)],
      },
      availableDays: selectedDays,
      facilities: selectedFacilities.map((value) => {
        const facility = FACILITIES.find((f) => f.value === value);
        return { label: facility?.label || "", value };
      }),
      availableHours: selectedHours,
    };

    formData.append("data", JSON.stringify(payload));
    if (image) formData.append("coverImage", image);
    images.forEach((img) => formData.append("images", img));

    try {
      let response;
      if (isEditMode) {
        response = await updateCar({ id: data._id, formData })?.unwrap();
      } else {
        response = await createCar(formData)?.unwrap();
      }

      if (response?.success) {
        toast.success(response?.message);
        onCancel?.();
      }
    } catch (error: any) {      
       if (error?.data?.errorMessages && Array.isArray(error?.data?.errorMessages)) {
          error.data.errorMessages.forEach((err: { message: string }) => {
            toast.error(err.message, { id: "add-car" });
          });
        } else {
          toast.error(error?.data?.message || "Something went wrong!", {
            id: "add-car",
          });
        }
      }

    };


  const handleCancel = () => {
    setFields(defaultFields);
    setSelectedFacilities([]);
    setSelectedDays([]);
    setSelectedHours([]);
    setImage(null);
    setImages([]);
    setExistCover("");
    setExistImages([]);
    onCancel?.();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Cover Image */}
      <div className="flex items-center gap-6">
        <SingleImageUpload
          file={image}
          onChange={setImage}
          onRemove={() => { setImage(null); setExistCover(""); }}
          existingImage={existCover ? `${imageUrl}${existCover}` : ""}
          title="Cover Image"
          height={200}
          cover
        />
      </div>

      {/* Gallery Images */}
      <div className="flex items-center gap-6">
        <MultipleImageUploader
          files={images}
          onChange={setImages}
          onRemove={(index) => {
            if (index < existImages.length) {
              // Removing an existing image
              setExistImages((prev) => prev.filter((_, i) => i !== index));
            } else {
              // Removing a newly added file
              const newIndex = index - existImages.length;
              setImages((prev) => prev.filter((_, i) => i !== newIndex));
            }
          }}
          existingImages={existImages}
          title="Gallery Images"
          height={180}
          width="100%"
          maxImages={8}
        />
      </div>

      {/* Basic Information */}
      <div>
        <h3 className="text-sm font-semibold text-gray-800 uppercase mb-4">Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { id: "brand", placeholder: "Toyota" },
            { id: "model", placeholder: "Corolla" },
            { id: "year", placeholder: "2021", type: "number" },
            { id: "color", placeholder: "White" },
            { id: "licensePlate", placeholder: "WXY 1234 (Kuala Lumpur)", label: "License Plate" },
            { id: "seatNumber", placeholder: "5", type: "number", min: "0", max: "50", label: "Number of Seats" },
          ].map(({ id, placeholder, type = "text", min, max, label }) => (
            <div key={id} className="space-y-2">
              <Label htmlFor={id}>{label || id.charAt(0).toUpperCase() + id.slice(1)}</Label>
              <Input
                id={id}
                name={id}
                type={type}
                placeholder={placeholder}
                min={min}
                max={max}
                value={fields[id as keyof FormFields]}
                onChange={handleChange}
                className="bg-white h-11"
                required
              />
            </div>
          ))}
        </div>
      </div>

      {/* Technical Specifications */}
      <div>
        <h3 className="text-sm font-semibold text-gray-800 uppercase mb-4">Technical Specifications</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="transmission">Transmission</Label>
            <select
              id="transmission"
              name="transmission"
              value={fields.transmission}
              onChange={handleChange}
              className="w-full h-11 px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            >
              <option value="">Select transmission</option>
              <option value="AUTOMATIC">Automatic</option>
              <option value="MANUAL">Manual</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="fuelType">Fuel Type</Label>
            <select
              id="fuelType"
              name="fuelType"
              value={fields.fuelType}
              onChange={handleChange}
              className="w-full h-11 px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            >
              <option value="">Select fuel type</option>
              <option value="PETROL">Petrol</option>
              <option value="DIESEL">Diesel</option>
              <option value="ELECTRIC">Electric</option>
              <option value="HYBRID">Hybrid</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="mileage">Mileage</Label>
            <Input
              id="mileage"
              name="mileage"
              placeholder="18 km/l"
              value={fields.mileage}
              onChange={handleChange}
              className="bg-white h-11"
              required
            />
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div>
        <h3 className="text-sm font-semibold text-gray-800 uppercase mb-4">Pricing Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { id: "dailyPrice", placeholder: "2500", label: "Daily Price (RM)" },
            { id: "depositAmount", placeholder: "100", label: "Deposit Amount (RM)" },
          ].map(({ id, placeholder, label }) => (
            <div key={id} className="space-y-2">
              <Label htmlFor={id}>{label}</Label>
              <Input
                id={id}
                name={id}
                type="number"
                placeholder={placeholder}
                value={fields[id as keyof FormFields]}
                onChange={handleChange}
                className="bg-white h-11"
                required
              />
            </div>
          ))}
        </div>
      </div>

      {/* Location & Assignment */}
      <div>
        <h3 className="text-sm font-semibold text-gray-800 uppercase mb-4">Location & Assignment</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              name="city"
              placeholder="Kuala Lumpur"
              value={fields.city}
              onChange={handleChange}
              className="bg-white h-11"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="assignedHosts">Assign Hoster</Label>
            <Select
              key={fields.assignedHosts}
              value={fields.assignedHosts}
              onValueChange={(value) =>
                setFields((prev: any) => ({ ...prev, assignedHosts: value }))
              }
            >
              <SelectTrigger className="w-full h-11">
                <SelectValue placeholder="Select Hoster" />
              </SelectTrigger>

              <SelectContent>
                {hostsData?.data?.map((host: any) => (
                  <SelectItem key={host._id} value={host._id}>
                    <div className="flex items-center gap-2">
                      <img
                        src={host.profileImage ? imageUrl + host.profileImage : "/placeholder.png"}
                        alt={host.name}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      {host.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid col-span-2 grid-cols-3 items-end gap-3">
            {/* Pickup Latitude */}
            <div className="space-y-1">
              <Label>Pickup Latitude</Label>
              <Input
                value={fields.pickupLatitude}
                placeholder="23.8103"
                readOnly
                required
              />
            </div>

            {/* Pickup Longitude */}
            <div className="space-y-1">
              <Label>Pickup Longitude</Label>
              <Input
                value={fields.pickupLongitude}
                placeholder="90.4125"
                readOnly
                required
              />
            </div>

            <Button type="button" size="lg" className="py-5!" onClick={() => setMapOpen(true)}>
              Pick on Map
            </Button>
          </div>
        </div>
      </div>


      {/* Facilities */}
      <div>
        <h3 className="text-sm font-semibold text-gray-800 uppercase mb-4">Facilities</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {FACILITIES.map((facility) => (
            <label key={facility.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedFacilities.includes(facility.value)}
                onChange={() => toggleFacility(facility.value)}
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <span className="text-sm text-gray-700">{facility.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Available Days */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-800 uppercase">Available Days</h3>
          <button type="button" onClick={toggleAllDays} className="text-sm text-indigo-600 hover:text-indigo-700">
            {selectedDays.length === DAYS.length ? "Deselect All" : "Select All"}
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {DAYS.map((day) => (
            <label key={day} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedDays.includes(day)}
                onChange={() => toggleDay(day)}
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <span className="text-sm text-gray-700 capitalize">{day.toLowerCase()}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Available Hours */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-800 uppercase">Available Hours</h3>
          <button type="button" onClick={toggleAllHours} className="text-sm text-indigo-600 hover:text-indigo-700">
            {selectedHours.length === HOURS.length ? "Deselect All" : "Select All"}
          </button>
        </div>
        <div className="grid grid-cols-4 md:grid-cols-6 gap-3 max-h-48 overflow-y-auto p-2 border border-gray-200 rounded-md">
          {HOURS.map((hour) => (
            <label key={hour} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedHours.includes(hour)}
                onChange={() =>
                  setSelectedHours((prev) =>
                    prev.includes(hour) ? prev.filter((h) => h !== hour) : [...prev, hour]
                  )
                }
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <span className="text-sm text-gray-700">{hour}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Descriptions */}
      <div>
        <h3 className="text-sm font-semibold text-gray-800 uppercase mb-4">Descriptions</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="shortDescription">Short Description</Label>
            <Input
              id="shortDescription"
              name="shortDescription"
              placeholder="Clean, comfortable, fuel-efficient."
              value={fields.shortDescription}
              onChange={handleChange}
              className="bg-white h-11"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="about">Full Description</Label>
            <Textarea
              id="about"
              name="about"
              placeholder="A well-maintained family sedan with excellent comfort..."
              rows={6}
              value={fields.about}
              onChange={handleChange}
              className="bg-white resize-none"
              required
            />
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end gap-3 pt-6 border-t">
        <Button
          type="button"
          variant="secondary"
          size="lg"
          className="text-gray-700 bg-transparent border-2! border-gray-200! hover:bg-gray-50"
          onClick={() => handleCancel()}
        >
          Cancel
        </Button>
        <Button type="submit" size="lg">
          <Car className="w-4 h-4 mr-2" />
          {isEditMode ? "Update Car" : "Add Car"}
        </Button>
      </div>

      {/* The modal */}
      <MapPickerModal
        open={mapOpen}
        onClose={() => setMapOpen(false)}
        onConfirm={handleLocationConfirm}
        initialLat={parseFloat(fields.pickupLatitude) || 3.139}
        initialLng={parseFloat(fields.pickupLongitude) || 101.6869}
      // googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
      />
    </form>
  );
}