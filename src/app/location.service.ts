import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class LocationService {
  constructor(private firestore: Firestore) {}

  async saveLocation(name: string, lat: number, lng: number): Promise<void> {
    const link = `https://www.google.com/maps?q=${lat},${lng}`;
    const ref = collection(this.firestore, 'EGuachamin_Deber_GPS');
    await addDoc(ref, { name, link, lat, lng, timestamp: new Date() });
  }
}
