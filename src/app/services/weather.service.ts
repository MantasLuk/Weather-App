import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DetailsCurrent, DetailsForecast } from '../models/forecastDetais';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private APIkey:string ='0da871a4d5baef25083beade78885f75';

  constructor(private http:HttpClient) {}

  //getting main information about rurrent weather
  public loadCurrentWeather(cityName:string){
    return this.http.get<DetailsCurrent>(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${this.APIkey}&units=metric`)
  }

  //getting information about forecast weather
  public loadForecastWeather(cityName:string){
    return this.http.get<DetailsForecast>(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&cnt=10&appid=${this.APIkey}&units=metric`)
  }




}




