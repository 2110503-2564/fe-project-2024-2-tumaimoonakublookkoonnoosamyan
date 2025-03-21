interface MassageItem {
    _id: string,
    name: string,
    address: string,
    district: string,
    province: string,
    postalcode: string,
    tel: string,
    picture: string,
    price: number,
    __v: number,
    id: string
  }
  
  interface MassageJson {
    success: boolean,
    count: number,
    pagination: Object,
    data: MassageItem[]
  }

  interface BookingItem {
    nameLastname: string;
    tel: string;
    venue: string;
    bookDate: string;
  }