import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DetailsCurrent, DetailsForecast } from 'src/app/models/forecastDetais';
import { WeatherService } from 'src/app/services/weather.service';


@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {


  public current:DetailsCurrent={
    name: '',
    coord: {lon:0,
            lat:0},
    main: {temp: 0},
    sys: {country: ''},
    weather:[{
              icon: '',
              description: ''
            }],
    wind:{deg: 0,
          speed:0
        }
  }

  public forecast:DetailsForecast={
    list: [{
            dt: 0,
            main: {temp: 0}
          }]
  }

constructor(private weatherService:WeatherService ) { }

//delcarations of variables
  cityName:string ='';
  icon:any;
//declarations of states after submitting
  isSubmited:boolean=false;
  error:boolean = false;


  // Options for google maps
  zoom = 12
  center!: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    zoomControl: true,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,
  }
  
  ngOnInit(): void { 
  }

//function for getting position of current city
  public loadMap(){
    navigator.geolocation.getCurrentPosition(() => {
      this.center = {
        lat: this.current.coord.lat,
        lng: this.current.coord.lon,
      }
    });
  }

  //functions for loading information about the weather
  public loadCurrent(cityName:string){
    this.weatherService.loadCurrentWeather(cityName).subscribe({
      next:(response)=>{
        this.current = response;
        console.log(response);
        this.icon = "https://openweathermap.org/img/wn/" + this.current.weather[0].icon + "@4x.png";
        this.isSubmited = true;
        this.loadMap();
          },
          error:(error)=>{
            this.error = true;
          }
          
        });
  }

  public loadForecast(cityName:string){
    this.weatherService.loadForecastWeather(cityName).subscribe({
      next:(response)=>{
        this.forecast = response;
        console.log(response);
        this.isSubmited = true;
          },
          error:(error)=>{
            this.error = true;
          }
        });
  }

  //form submitting function, to get input city name and pass it to loading functions
  onSubmit(form:NgForm){
    let cityName:string=form.value.cityName
    this.loadCurrent(cityName);
    this.loadForecast(cityName);
    this.isSubmited = true;
    this.error = false;
  }
}