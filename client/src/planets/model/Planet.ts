export interface Planet {
    id: number;
    planetName:string;
    imageUrl: string;
    imageName: string;
    description: string;
    planetColor: string;
    planetRadiusKM: number;
    distInMillionsKM: { 
        fromSun: number, 
        fromEarth: number
    };

}