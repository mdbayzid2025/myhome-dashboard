/// <reference types="@types/google.maps" />
import { useState, useEffect, useRef, useCallback } from "react";
import { Dialog, DialogContent } from "../../ui/dialog";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { X, MapPin, Search, Locate, Loader2 } from "lucide-react";
import { loadGoogleMapsPlaces } from "../../../lib/loadGoogleMapsPlaces";

interface LatLng {
  lat: number;
  lng: number;
}

interface MapPickerModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (coords: LatLng) => void;
  initialLat?: number;
  initialLng?: number;
}

export default function MapPickerModal({
  open,
  onClose,
  onConfirm,
  initialLat = 23.8103, // Dhaka default
  initialLng = 90.4125,
}: MapPickerModalProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapRefInstance = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [selected, setSelected] = useState<LatLng>({
    lat: initialLat,
    lng: initialLng,
  });

  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(true);
  const [geoLoading, setGeoLoading] = useState(false);

  // ✅ Reverse Geocode (lat,lng → address)
  const reverseGeocode = useCallback((latlng: LatLng) => {
    const geocoder = new google.maps.Geocoder();

    geocoder.geocode({ location: latlng }, (results, status) => {
      if (status === "OK" && results?.[0]) {
        setAddress(results[0].formatted_address);
      } else {
        setAddress(`${latlng.lat}, ${latlng.lng}`);
      }
    });
  }, []);

  // ✅ Place Marker
  const placeMarker = useCallback(
    (latlng: LatLng) => {
      if (!mapRefInstance.current || !markerRef.current) return;

      markerRef.current.setPosition(latlng);
      mapRefInstance.current.panTo(latlng);

      setSelected(latlng);
      reverseGeocode(latlng);
    },
    [reverseGeocode]
  );

  // ✅ Init Map
  useEffect(() => {
    if (!open) return;

    setLoading(true);

    loadGoogleMapsPlaces().then(() => {
      if (!mapRef.current) return;

      const center = { lat: initialLat, lng: initialLng };

      const map = new google.maps.Map(mapRef.current, {
        center,
        zoom: 14,
      });

      const marker = new google.maps.Marker({
        position: center,
        map,
        draggable: true,
      });

      // ✅ Map click
      map.addListener("click", (e: google.maps.MapMouseEvent) => {
        if (!e.latLng) return;

        const latlng = {
          lat: e.latLng.lat(),
          lng: e.latLng.lng(),
        };

        placeMarker(latlng);
      });

      // ✅ Marker drag
      marker.addListener("dragend", () => {
        const pos = marker.getPosition();
        if (!pos) return;

        const latlng = {
          lat: pos.lat(),
          lng: pos.lng(),
        };

        placeMarker(latlng);
      });

      // ✅ Autocomplete
      if (inputRef.current) {
        const autocomplete = new google.maps.places.Autocomplete(
          inputRef.current
        );

        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();

          if (!place.geometry?.location) return;

          const latlng = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          };

          map.panTo(latlng);
          map.setZoom(15);

          marker.setPosition(latlng);

          setSelected(latlng);
          setAddress(place.formatted_address || "");
        });

        autocompleteRef.current = autocomplete;
      }

      mapRefInstance.current = map;
      markerRef.current = marker;

      reverseGeocode(center);
      setSelected(center);
      setLoading(false);
    });
  }, [open]);

  // ✅ Current Location
  const handleMyLocation = () => {
    if (!navigator.geolocation) return;

    setGeoLoading(true);

    navigator.geolocation.getCurrentPosition((pos) => {
      const latlng = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      };

      placeMarker(latlng);
      mapRefInstance.current?.setZoom(16);

      setGeoLoading(false);
    });
  };

  const handleConfirm = () => {
    console.log("FINAL LAT LNG:", selected);
    onConfirm(selected); // ✅ main output
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-[700px] p-0">
        {/* Header */}
        <div className="flex justify-between p-4 border-b">
          <div className="flex gap-2 items-center">
            <MapPin />
            <span>Select Location</span>
          </div>
          <Button variant="ghost" onClick={onClose}>
            <X />
          </Button>
        </div>

        {/* Search */}
        <div className="p-3">
          <div className="relative">
            <Search className="absolute left-2 top-2" size={18} />
            <Input ref={inputRef} className="pl-8" placeholder="Search place..." />
          </div>
        </div>

        {/* Map */}
        <div className="relative h-[400px]">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="animate-spin" />
            </div>
          )}

          <div ref={mapRef} className="w-full h-full" />

          <button
            onClick={handleMyLocation}
            className="absolute bottom-3 right-3 bg-white p-2 rounded-full shadow"
          >
            {geoLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <Locate />
            )}
          </button>
        </div>

        {/* Lat Lng */}
        <div className="p-3 bg-gray-50">
          <div className="flex gap-2">
            <div className="flex-1">
              <Label>Latitude</Label>
              <Input value={selected.lat} readOnly />
            </div>
            <div className="flex-1">
              <Label>Longitude</Label>
              <Input value={selected.lng} readOnly />
            </div>
          </div>

          {address && <p className="text-xs mt-2">{address}</p>}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 p-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleConfirm}>
            Confirm Location
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}