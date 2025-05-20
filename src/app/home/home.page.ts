import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Geolocation } from '@capacitor/geolocation';
import { LocationService } from '../location.service';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IonicModule, FormsModule],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss'
})
export class HomePage {
  name = '';

  constructor(private locationService: LocationService) {}

  async saveMyLocation() {
    if (!this.name) {
      alert('Por favor ingresa tu nombre');
      return;
    }

    try {
      let lat: number, lng: number;

      if (Capacitor.getPlatform() === 'web') {
        // Usar API nativa del navegador para web
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
          });
        });
        lat = position.coords.latitude;
        lng = position.coords.longitude;
      } else {
        // Usar Capacitor Geolocation para móvil
        const permission = await Geolocation.requestPermissions();
        if (permission.location !== 'granted') {
          alert('Permiso de ubicación no concedido');
          return;
        }
        const position = await Geolocation.getCurrentPosition();
        lat = position.coords.latitude;
        lng = position.coords.longitude;
      }

      await this.locationService.saveLocation(this.name, lat, lng);
      alert('Ubicación guardada correctamente.');
    } catch (err: any) {
      console.error('Error al obtener ubicación:', err);
      if (err.code === 1) {
        alert('Permiso denegado para obtener ubicación');
      } else if (err.code === 2) {
        alert('No se pudo determinar tu ubicación. Intenta nuevamente.');
      } else if (err.code === 3) {
        alert('Tiempo para obtener ubicación agotado');
      } else {
        alert('Error desconocido al obtener ubicación');
      }
    }
  }
}


