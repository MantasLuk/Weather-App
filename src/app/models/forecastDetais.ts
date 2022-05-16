export interface DetailsCurrent {
    name:string,
    coord: {lon:number,
            lat:number},
    main: {temp: number},
    sys:{country:string},
    weather:{icon:string,
            description:string}[],
    wind:{deg:number,
        speed:number}

}

export interface DetailsForecast {
    list: {
        dt: number,
        main: {temp: number}            
    }[]

}
