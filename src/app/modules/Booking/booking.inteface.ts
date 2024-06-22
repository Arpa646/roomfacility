import {Types} from mongoose

export interface Booking {
    facility: Types.ObjectId;
    date: Date;
    startTime: string;
    endTime: string;
    user: Schema.Types.ObjectId;
    
  }