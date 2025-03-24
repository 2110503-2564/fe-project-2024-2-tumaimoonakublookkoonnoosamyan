interface MassageItem {
    _id: string,
    name: string,
    address: string,
    tel: string,
    picture: string,
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
    token:string;
    nameLastname: string;
    tel: string;
    shop: string;
    bookDate: string;
  }
