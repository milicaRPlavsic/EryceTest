export interface Planet {
    id: number;
    planetName:string;
    imageUrl: string;
    imageName: string;
    description: string;
    planetColor: string;
    planetRadiusKM: string;
    distInMillionsKM: { 
        fromSun: string, 
        fromEarth: string
    };

}