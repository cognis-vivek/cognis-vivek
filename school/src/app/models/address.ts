export class Address{
   userId: any;
   address1: any;
   address2: any;
   city: any;
   district: any;
   country: any;
   state: any;
   location: any;
   postalcode: any;

   constructor(
    userId: any,
    address1: any,
    address2: any,
    city: any,
    district: any,
    country: any,
    state: any,
    location: any,
    postalcode: any
   ){
    this.userId = userId;
    this.address1 = address1;
    this.address2 = address2;
    this.city = city;
    this.district = district;
    this.country = country;
    this.state = state;
    this.location = location;
    this.postalcode = postalcode;
   }

   // Getters 
   public getUserId(): any{
       return this.userId;
   }
   public getAddress1(): any{
       return this.address1;
   }

   public getAddress2(): any{
    return this.address2;
   }

   public getCity(): any{
       return this.city;
   }

   public getDistrict(): any{
       return this.district;
   }

   public getCountry(): any{
       return this.country;
   }

   public getState(): any{
       return this.state;
   }

   public getLocation(): any{
       return this.location;
   }

   public getPostalCode(): any{
       return this.postalcode;
   }
   
}