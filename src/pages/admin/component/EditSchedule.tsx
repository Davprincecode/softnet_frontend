import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { IoIosArrowBack } from 'react-icons/io';
import ButtonPreloader from '../../../component/ButtonPreloader';

import { userAuth } from '../../context/AuthContext';
import Tooltip from './Tooltip';
import { tooltipConfig } from './tooltipConfig';
import ConfirmFreeBooking from './ConfirmFreeBooking';
import { FiPlus } from 'react-icons/fi';

type TimeUserSlot = {
  date: string;
  start_time: string;
  end_time: string;
};

type TimeSlot = {
  bookingId: string;
  date: string;
  startTime: string;
  endTime: string;
  timeInterval: string;
  bookingStatus: string;
};

interface scheduleIntern {
  scheduleToggle: (data : string) => void;
  toggleToDefault: () => void;
  relBookingId : string;
}

const durationMap: { [label: string]: number } = {
  '10min':10, '20min': 20, '30min': 30, '40min': 40, '50min' : 50, '1hr': 60, '1hr 30min': 90, '2hr': 120,
  '2hr 30min': 150, '3hr': 180, '4hr': 240, '5hr': 300,
  '6hr': 360, '7hr': 420, '8hr': 480, '9hr': 540, '10hr': 600,
  '11hr': 660, '12hr': 720, '13hr': 780, '14hr': 840, '15hr': 900,
  '16hr': 960, '17hr': 1020, '18hr': 1080, '19hr': 1140, '20hr': 1200,
  '21hr': 1260, '22hr': 1320, '23hr': 1380, '24hr': 1440,
};

const weekdayMap: Record<string, number> = {
  Sunday: 0, Monday: 1, Tuesday: 2, Wednesday: 3,
  Thursday: 4, Friday: 5, Saturday: 6,
};

const cloneDate = (date: Date) => new Date(date.getTime());
const addDays = (date: Date, days: number) => new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
const addMonths = (date: Date, months: number) => new Date(date.getFullYear(), date.getMonth() + months, date.getDate());
const addWeeks = (date: Date, weeks: number) => addDays(date, weeks * 7);
const addYears = (date: Date, years: number) => new Date(date.getFullYear() + years, date.getMonth(), date.getDate());
const isBetweenInclusive = (date: Date, start: Date, end: Date) => date >= start && date <= end;


const formatTime = (date: Date): string => {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12;
  hours = hours === 0 ? 12 : hours;

  const hh = String(hours).padStart(2, '0');
  const mm = String(minutes).padStart(2, '0');

  return `${hh}:${mm} ${ampm}`;
};


const formatOccurrence = (date: string, start: Date, end: Date): TimeUserSlot => {
  return {
    date,
    start_time: formatTime(start),
    end_time: formatTime(end),
  };
};
const getNthWeekdayOfMonth = (baseDate: Date, weekNumber: number, weekday: string): Date | null => {
  const targetDay = weekdayMap[weekday];
  const firstDay = new Date(baseDate.getFullYear(), baseDate.getMonth(), 1);
  let count = 0;

  for (let i = 0; i < 31; i++) {
    const current = addDays(firstDay, i);
    if (current.getMonth() !== baseDate.getMonth()) break;
    if (current.getDay() === targetDay) {
      count++;
      if (count === weekNumber) return current;
    }
  }

  return null;
};

type CoursePrice = {
  priceName?: string;
  coursePricePhysical?: number;
  coursePriceOnline?: number;
};

const EditSchedule = ({ scheduleToggle, toggleToDefault, relBookingId }: scheduleIntern) => {


 const { baseUrl, token } = userAuth();
   const [showPopup, setShowPopup] = useState(false);
   const [loading, setLoading] = useState(false);
   const [title, setTitle] = useState('');
   const [description, setDescription] = useState('');
   const [startDate, setStartDate] = useState('');
   const [endDate, setEndDate] = useState('');
   const [startTime, setStartTime] = useState('');
   const [endTime, setEndTime] = useState('');
   const [day, setDay] = useState(0);
   const [weekDay, setWeekday] = useState('');
   const [recurrence, setRecurrence] = useState('none');
   const [recurrenceDayOfMonth, setRecurrenceDayOfMonth] = useState<number | ''>('');
   const [recurrenceWeekNumber, setRecurrenceWeekNumber] = useState<number | ''>('');
   const [recurrenceWeekday, setRecurrenceWeekday] = useState('');
   const [selectedDays, setSelectedDays] = useState<string[]>([]);
   const [bufferTime, setBufferTime] = useState('');
   const [interval, setInterval] = useState<number | ''>('');
   const [bookingPerDay, setBookingPerDay] = useState<number | ''>('');
   const [maxTimeBeforeBooking, setMaxTimeBeforeBooking] = useState<number | ''>('');
   const [maxDayBeforeBooking, setMaxDayBeforeBooking] = useState<number | ''>('');
   const [price, setPrice] = useState<number | ''>(0);
 
   const [physicalDuration, setPhysicalDuration] = useState<number | ''>(0);
   const [onlineDuration, setOnlineDuration] = useState<number | ''>(0);
   const [physicalBufferTime, setPhysicalBufferTime] = useState('');
   const [onlineBufferTime, setOnlineBufferTime] = useState('');
   const [physicalMaxTime, setPhysicalMaxTime] = useState<number | ''>(0);
   const [onlineMaxTime, setOnlineMaxTime] = useState<number | ''>(0);
 
   const [bookingType, setBookingType] = useState<string>('');
   const [currency, setCurrency] = useState('NGN');
   const [errorSlots, setErrorSlots] = useState<TimeUserSlot[]>([]);
   const [timeSlots, setTimeSlots] = useState<TimeUserSlot[]>([]);
   const [timeSlotFromServer, setTimeSlotFromServer] = useState<TimeUserSlot[]>([]);
 
   const weeks = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
 
    const [coursePriceActive, setCoursePriceActive] = useState(false);
 
     const [coursePrices, setCoursePrices] = useState<CoursePrice[]>([
     {
       priceName : '',
       coursePricePhysical : 0,
       coursePriceOnline: 0
     }
     ]);
 
     const currencyFunction =(data : string) =>{
        if(data == "FREE"){
         setPrice(0)
        }
       setCurrency(data);
     }  

 useEffect(()=>{

    const fetchData = async () => {
        setLoading(true);
        try {
        const response = await fetch(`${baseUrl}/booking-by-price/${relBookingId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        redirect: "follow"
        });
        if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message);
        }
        const result = await response.json();   
        setTitle(result.data.bookingTitle);
        setDescription(result.data.bookingDescription);
        setBookingPerDay(result.data.bookingPerDay);
        setBufferTime(result.data.bufferTime);
        setCurrency(result.data.currency);
        setEndDate(result.data.endDate);
        setEndTime(result.data.endTime.split(":").slice(0, 2).join(":"));
        setStartDate(result.data.startDate);
        setStartTime(result.data.startTime.split(":").slice(0, 2).join(":"));
        setBookingType(result.data.bookingType);
        setInterval(result.data.interval);
        setMaxDayBeforeBooking(result.data.maxDayBeforeBooking);
        setMaxTimeBeforeBooking(result.data.maxTimeBeforeBooking);
        

        setRecurrence(result.data.recurrenceDayOfMonth);
        setPrice(result.data.price);

        setPhysicalDuration(result.data.physicalDuration);
        setPhysicalBufferTime(result.data.physicalBufferTime);
        setPhysicalMaxTime(result.data.physicalMaxTime);

        setOnlineDuration(result.data.onlineDuration);
        setOnlineBufferTime(result.data.onlineBufferTime);
        setOnlineMaxTime(result.data.onlineMaxTime);

        if(result.data.bookingPrices.length > 0){
          setCoursePriceActive(true);
          setCoursePrices(result.data.bookingPrices);
        }
        
        const date = new Date(result.data.startDate);
        setDay(date.getDate());
        setWeekday(date.toLocaleDateString('en-US', { weekday: 'long' }));

        if(result.data.recurrenceDays.length > 0 && result.data.recurrence !== "daily" &&  result.data.recurrence !== "none"){
          setSelectedDays(result.data.recurrenceDays); 
          setRecurrenceWeekday(result.data.recurrenceWeekDay);
        setRecurrenceWeekNumber(result.data.recurrenceWeekNumber); 
        }
        setRecurrence(result.data.recurrence);

        setLoading(false);

        } catch (error) {
        if (typeof error === "object" && error !== null && "message" in error && typeof error.message === "string") {
        // toast.error(error.message);
        } else {
        toast.error("An unknown error occurred.");
        }
        setLoading(false);
        } finally {
        setLoading(false);
        }
        }

    fetchData ();
  }, [])

  const toggleDay = (day: string) => {
    if(day !== "") {
    setSelectedDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
   }
  };

  const monthlyFunction = (data: string) => {
    if (data === 'day') {
      setRecurrenceDayOfMonth(day);
      setRecurrenceWeekNumber('');
      setRecurrenceWeekday('');
    } else {
      setRecurrenceWeekNumber(parseInt(data));
      setRecurrenceWeekday(weekDay);
      setRecurrenceDayOfMonth('');
    }
  };

 const dateFunction = (dateStr: string, data: string) => {
  const date = new Date(dateStr);

  if (data === "start") {
    setDay(date.getDate());
    setWeekday(date.toLocaleDateString('en-US', { weekday: 'long' })); 
    setStartDate(dateStr);

    // Optional: If endDate is already set, validate it
    if (endDate) {
      const end = new Date(endDate);
      if (end < date) {
        toast.error("End date must be greater than start date");
      }
    }
  }

  if (data === "end") {
    const start = new Date(startDate);
    if (startDate && date < start) {
      toast.error("End date must be greater than start date");
      return;
    }
    setEndDate(dateStr);
  }
  };


    const timeInputRef = useRef<HTMLInputElement>(null);
  const timeFunction = (timeStr: string, type: 'start' | 'end') => {
 
    
  if (type === 'start') {
    setStartTime(timeStr);

    if (endTime) {
      const startMin = timeToMinutes(timeStr);
      const endMin = timeToMinutes(endTime);
      if (endMin < startMin) {
        toast.error('End time must be greater than start time');
        setStartTime('');
      }
    }
  }

  if (type === 'end') {
    if (startTime) {
      const startMin = timeToMinutes(startTime);
      const endMin = timeToMinutes(timeStr);
      if (endMin < startMin) {
        toast.error('End time must be greater than start time');
        return;
      }
    }
    setEndTime(timeStr);
  }
};

  const recurrenceFunction = (data: string) => {
    if (data !== 'monthly') {
      setRecurrenceDayOfMonth('');
      setRecurrenceWeekNumber('');
      setRecurrenceWeekday('');
    }
    if (data !== 'weekly' && data !== 'biweekly') {
      setSelectedDays([]);
      toggleDay(weekDay);
    }
    setRecurrence(data);   
  };


  const formatDateLocal = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // month is 0-indexed
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

 const generateRecurringDates = (
  startDate: string,
  endDate: string,
  recurrence: string,
  selectedDays: string[],
  recurrenceDayOfMonth?: number,
  recurrenceWeekNumber?: number,
  recurrenceWeekday?: string
): string[] => {

  if (!startDate || !endDate) return [];
  const start = new Date(startDate);
  const end = new Date(endDate);
  let dates: string[] = [];

  switch (recurrence) {
    case 'daily':
      for (let date = cloneDate(start); date <= end; date = addDays(date, 1)) {
        dates.push(formatDateLocal(date));
      }
      break;

    case 'weekly':
    case 'biweekly':
     const dayIndexes = selectedDays.map(day => weekdayMap[day]).filter(i => i !== undefined);
        let date = cloneDate(start);
        date.setDate(date.getDate() - date.getDay() + 1); // Monday
        const weekStep = recurrence === 'biweekly' ? 2 : 1;

        while (date <= end) {
          for (const dayIndex of dayIndexes) {
            const occurrence = addDays(date, dayIndex);
            if (isBetweenInclusive(occurrence, start, end)) {
              dates.push(occurrence.toISOString().split('T')[0]);
            }
          }
          date = addWeeks(date, weekStep);
        }
        break;
     

    case 'monthly':
      if (recurrenceDayOfMonth) {
        for (let date = cloneDate(start); date <= end; date = addMonths(date, 1)) {
          const targetDate = new Date(date.getFullYear(), date.getMonth(), recurrenceDayOfMonth);
          if (targetDate <= end) {
            dates.push(formatDateLocal(targetDate));
          }
        }
      } else if (recurrenceWeekNumber && recurrenceWeekday) {
        for (let date = cloneDate(start); date <= end; date = addMonths(date, 1)) {
          const targetDate = getNthWeekdayOfMonth(date, recurrenceWeekNumber, recurrenceWeekday);
          if (targetDate && targetDate <= end) {
            dates.push(formatDateLocal(targetDate));
          }
        }
      }
      break;

    case 'yearly':
      for (let date = cloneDate(start); date <= end; date = addYears(date, 1)) {
        dates.push(formatDateLocal(date));
      }
      break;

    default:
      dates.push(formatDateLocal(start));
      break;
  }

  return dates;
};

const timeToMinutes = (time: string): number => {
  const [rawTime, period] = time.split(' ');
  const [hh, mm] = rawTime.split(':').map(Number);

  let hours = hh;
  if (period === 'PM' && hh !== 12) hours += 12;
  if (period === 'AM' && hh === 12) hours = 0;

  return hours * 60 + mm;
};


const isOverlap = (slotA: TimeUserSlot, slotB: TimeUserSlot): boolean => {
  if (slotA.date !== slotB.date) return false;

  const startA = timeToMinutes(slotA.start_time);
  const endA = timeToMinutes(slotA.end_time);
  const startB = timeToMinutes(slotB.start_time);
  const endB = timeToMinutes(slotB.end_time);

  return startA < endB && startB < endA;
};


const generateTimeSlots = (
  dateStr: string,
  startTime: string = '00:00',
  endTime: string = '23:59',
  interval?: number,
  buffer?: number,
  timeSlotFromServer: TimeUserSlot[] = []
): { valid: TimeUserSlot[]; errors: TimeUserSlot[] } => {
  const slots: TimeUserSlot[] = [];
  const errors: TimeUserSlot[] = [];

  const [startHour, startMinute] = startTime.split(':').map(Number);
  const [endHour, endMinute] = endTime.split(':').map(Number);

  const date = new Date(dateStr);
  const start = new Date(date);
  start.setHours(startHour, startMinute, 0, 0);

  const end = new Date(date);
  end.setHours(endHour, endMinute, 0, 0);

  if (!interval) {
    const slot = formatOccurrence(dateStr, start, end);

    const conflicts = timeSlotFromServer.filter(existing => isOverlap(slot, existing));    
    if (conflicts.length > 0) {
      errors.push(...conflicts); 
    }
    return { valid: slots, errors };
  }

  let current = new Date(start);

  while (true) {
    const slotStart = new Date(current);
    const slotEnd = new Date(current);
    slotEnd.setMinutes(slotEnd.getMinutes() + interval);

    if (slotEnd > end) break;

    const newSlot = formatOccurrence(dateStr, slotStart, slotEnd);
      const conflicts = timeSlotFromServer.filter(existing => isOverlap(newSlot, existing));
    if (conflicts.length > 0) {
      errors.push(
        ...conflicts
      );
    }

    current.setMinutes(current.getMinutes() + interval + (buffer ?? 0));
  }

  return { valid: slots, errors };
};

  useEffect(() => {
    const allDates = generateRecurringDates(
      startDate,
      endDate,
      recurrence,
      selectedDays,
      recurrenceDayOfMonth as number,
      recurrenceWeekNumber as number,
      recurrenceWeekday
    );

    let allValid: TimeUserSlot[] = [];
    let allErrors: TimeUserSlot[] = [];

    for (const date of allDates) {
      const { valid, errors } = generateTimeSlots(
        date,
        startTime,
        endTime,
        interval as number,
        bufferTime ? parseInt(bufferTime) : 0,
        timeSlotFromServer
      );
      allValid.push(...valid);
      allErrors.push(...errors);
    }
    setTimeSlots(allValid);
    setErrorSlots(allErrors);
  }, [
    startDate,
    endDate,
    recurrence,
    selectedDays,
    recurrenceDayOfMonth,
    recurrenceWeekNumber,
    recurrenceWeekday,
    startTime,
    endTime,
    interval,
    bufferTime,
    timeSlotFromServer
  ]);

  useEffect(()=>{
        const fetchExitsingDate = async () => {
        setLoading(true);
        try {
        const response = await fetch(`${baseUrl}/bookings/${startDate}/${endDate}/${startTime}/${endTime}/${relBookingId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        redirect: "follow"
        });

        if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message);
        }
        const result = await response.json();   
        setTimeSlotFromServer(result.data);
        setLoading(false);
        } catch (error) {
        if (typeof error === "object" && error !== null && "message" in error && typeof error.message === "string") {
        // toast.error(error.message);
        } else {
        toast.error("An unknown error occurred.");
        }
        setLoading(false);
        } finally {
        setLoading(false);
        }
        }
        if(startDate && endDate && startTime && endTime){ 
        fetchExitsingDate();
        }
  },[startDate, endDate, startTime, endTime])
  // ...keep your fetchExistingDate and handleProduct logic here...

const bookingCount = title.replace(/\s/g, '').length;

const handleBookingDescriptionCount = (e: { target: { value: any; }; }) => {
            const input = e.target.value;
            const nonSpaceCount = input.replace(/\s/g, '').length;
            if (nonSpaceCount <= 300) {
            setTitle(input);
            }
        };

    const confirmFree = () => {
        setShowPopup(true);
      }

      const validateProductForm = () => {
        if (!title.trim()) {
          toast.error("Title is required");
          return false;
        }
        if (!startDate.trim()) {
          toast.error("Start date is required");
          return false;
        }
        if(errorSlots.length > 0){
           toast.error("Time overlaped existing booking");
           return false;
        }
        if (!endDate.trim()) {
          toast.error("end date is required");
          return false;
        }
        if (!startTime.trim()) {
          toast.error("Start time is required");
          return false;
        }
        if (!endTime.trim()) {
          toast.error("End time is required");
          return false;
        }
        if (!currency.trim()) {
          toast.error("Currency is required");
          return false;
        }
       
        if(!coursePriceActive){
              if(!interval || isNaN(interval)){
                    toast.error("Valid interval is required");
                  return false;
              }
              if (!bookingType.trim()) {
                  toast.error("Booking type is required");
                    return false;
              }
              
            if (!price || isNaN(price)) {
              if(currency !== "FREE"){
                  toast.error("Valid price  is required");
                  return false;
                }
              }
         }
    
        if(coursePriceActive){
          
         for (let i = 0; i < coursePrices.length; i++) {
             const p = coursePrices[i];
             if (!p.priceName) {
               toast.error(`Category ${i + 1} name required`);
               return false;
             }
              if (!p.coursePriceOnline || isNaN(p.coursePriceOnline)) {
               toast.error(`Online category ${i + 1} needs a valid price`);
               return false;
             }
             if (!p.coursePricePhysical || isNaN(p.coursePricePhysical)) {
               toast.error(`Physical category ${i + 1} needs a valid price`);
               return false;
             }
           }
    
        }
    
        if (recurrence == "weekly" || recurrence == "biweekly") {
          if(selectedDays.length < 1){
               toast.error("Select a day");
             return false;
          }
        }
    
      if (recurrence == "monthly") {
      const isDayMode = recurrenceDayOfMonth !== '';
      const isWeekMode = recurrenceWeekNumber !== '' && recurrenceWeekday !== '';
    
      if (!isDayMode && !isWeekMode) {
        toast.error("Please select either a day of the month or a week + weekday pattern");
        return false;
      }
    
      if (isDayMode && (recurrenceDayOfMonth < 1 || recurrenceDayOfMonth > 31)) {
        toast.error("Day of the month must be between 1 and 31");
        return false;
      }
    
      if (isWeekMode && (recurrenceWeekNumber < 1 || recurrenceWeekNumber > 5)) {
        toast.error("Week number must be between 1 and 5");
        return false;
      }
       }
    
    
     return true;
    
      }

    const handleProduct =  async() => {
          if(!validateProductForm()){
          return;
          }      

          setLoading(true);
          const formdata = new FormData();
          formdata.append("bookingTitle", title);
          formdata.append("bookingDescription",  description);
          formdata.append("startDate",  startDate);
          formdata.append("endDate",   endDate);
          formdata.append("startTime",  startTime);
          formdata.append("endTime",  endTime);
          formdata.append("currency",  currency);
          formdata.append("bookingType",  bookingType);
          formdata.append("price",  price?.toString() ?? "");
          //  formdata.append('currency', currency);
          formdata.append("recurrence",  recurrence);
          // formdata.append("recurrenceDays", JSON.stringify(selectedDays));

          // formdata.append('bufferTime', bufferTime?.toString() ?? "");
          // formdata.append('interval', interval?.toString() ?? "");
          // formdata.append('bookingPerDay', bookingPerDay?.toString() ?? "");

          // formdata.append('maxTimeBeforeBooking', maxTimeBeforeBooking?.toString() ?? "");
          // formdata.append('maxDayBeforeBooking', maxDayBeforeBooking?.toString() ?? "");

          // formdata.append("recurrenceDayOfMonth",  recurrenceDayOfMonth?.toString() ?? "");
          // formdata.append("recurrenceWeekNumber",  recurrenceWeekNumber?.toString() ?? "");
          // formdata.append("recurrenceWeekday",  recurrenceWeekday);
         

          formdata.append('bookingPrices', coursePriceActive  ? "1" : "0");
          formdata.append('physicalDuration', physicalDuration?.toString() ?? "");
          formdata.append('onlineDuration', onlineDuration?.toString() ?? "");
          formdata.append('physicalBufferTime', physicalBufferTime?.toString() ?? "");
          formdata.append('onlineBufferTime', onlineBufferTime?.toString() ?? "");
          formdata.append('physicalMaxTime', physicalMaxTime?.toString() ?? "");
          formdata.append('onlineMaxTime', onlineMaxTime?.toString() ?? "");

           if (bufferTime != null) {
          formdata.append('bufferTime', bufferTime.toString());
          }
            if (interval != null) {
          formdata.append('interval', interval.toString());
            }
              if (bookingPerDay != null) {
          formdata.append('bookingPerDay', bookingPerDay.toString());
              }
            if (maxTimeBeforeBooking != null) {
          formdata.append('maxTimeBeforeBooking', maxTimeBeforeBooking.toString());
            }
            if (maxDayBeforeBooking != null) {
          formdata.append('maxDayBeforeBooking', maxDayBeforeBooking.toString());
            }
        if (recurrenceDayOfMonth != null) {
          formdata.append("recurrenceDayOfMonth",  recurrenceDayOfMonth.toString());
        }
            if (recurrenceWeekNumber != null) {
          formdata.append("recurrenceWeekNumber",  recurrenceWeekNumber.toString());
            }
            if (recurrenceWeekday != null) {
          formdata.append("recurrenceWeekday",  recurrenceWeekday);
            }
          
          if(selectedDays && selectedDays.length > 0){ 
              selectedDays.forEach((selectDay, index) => {
                  formdata.append(`recurrenceDays[${index}]`, selectDay);  
              });
        }

          if(coursePriceActive){
          coursePrices.forEach((price, index) => {
          formdata.append(`coursePrices[${index}][priceName]`, price.priceName ?? "");

          formdata.append(`coursePrices[${index}][coursePricePhysical]`, price.coursePricePhysical?.toString() ?? "" );
          formdata.append(`coursePrices[${index}][coursePriceOnline]`, price.coursePriceOnline?.toString() ?? "");
          });
          }
        const myHeaders = new Headers();
        myHeaders.append("Authorization", token);
        const requestOptions: RequestInit = {
            method: "POST",
            headers: myHeaders,
            body: formdata,
            redirect: "follow"
        };
        try {
            const response = await fetch(`${baseUrl}/booking/${relBookingId}`, requestOptions);
            const results = await response.text();    
            if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message);
            }
            const result = await response.json();  
            setLoading(false); 
            toast.success("Booking Updated");
            location.reload();       
        } catch (error) {
                      setLoading(false);
                      if (typeof error === "object" && error !== null && "message" in error && typeof error.message === "string") {
                      toast.error(error.message);
                      } else {
                      toast.error('An unknown error occurred.');
                      }
            setLoading(false); 
        }
      
    }


    const [value, onChange] = useState('10:00');

    const handlePriceToggle = () =>{
        setCurrency('');
        setCoursePriceActive(!coursePriceActive); 
        setCoursePrices([{
            priceName : '',
            coursePricePhysical : 0,
            coursePriceOnline: 0
        }]);

        setBookingType('');
        setPrice(0);
        setInterval('');

    };

    const addCoursePrice = () => {
          setCoursePrices(prev => [
            ...prev,
            {
              priceName: "",
              coursePricePhysical: 0,
              coursePriceOnline: 0,
            }
          ]);
    };

    const handleCoursePriceChange = <K extends keyof CoursePrice>(
      index: number,
      field: K,
      value: CoursePrice[K]
    ) => {
      const updated = [...coursePrices];
      updated[index][field] = value;
      setCoursePrices(updated);
    };
// data: string 
    const formatDuration = (minutes : number | ""): string => { 

      // const minutes = parseInt(data);
      if (minutes === "") return "";
      const hrs = Math.floor(minutes / 60); 
      const mins = minutes % 60; 
      if(mins  == 0){
             return `${hrs}hr`; 
      }else{
          return `${hrs}hr ${mins}min`; 
      }
     
    };
    
  return (
    <div className='course-container'>

       <div className="admin-shop-header">
                      <div className="admin-header-form flex-center gap-10 justification-between">
                        <div className="back-con flex-center gap-10" onClick={() => scheduleToggle("default")}>
                          <div className="back-left-arrow" >
                            <IoIosArrowBack />
                          </div>
                          <p>back</p>
                        </div>
                        {/* <IoSettingsOutline className="setting-icon"  onClick={backFunction}/> */}
                      </div>
              </div>

         <h2 className='add-product-titles'>Edit Booking</h2>
          <div className="admin-input">
            <label>Title</label>
            <input type="text" value={title} placeholder='Enter Booking Title' onChange={(e) => setTitle(e.target.value)}/>
          </div>
        <div className="product-form-top flex justification-between">
                    <div className="admin-prd-form">
        
                    <div className="admin-input">
                      <div className="input-header-flex flex-center justification-between">
                            <label >Booking Decription</label>
                            <div className="input-header">{bookingCount}/300 character</div>
                      </div>
                    
                      <textarea className='bookingDescription'  cols={30} rows={10}  value={description}
                          onChange={handleBookingDescriptionCount} placeholder='Enter Booking Description'>
                      </textarea>
                    </div>
        
                    <div className="admin-input">
                    <label>Start Date</label>
                    <input
                    name="startDate"
                    type="date"
                    value={startDate}
                    onChange={(e) => dateFunction(e.target.value, "start")}
                    readOnly
                    />
                    </div>
        
                    <div className="admin-input">
                    <label>End Date</label>
                    <input
                    name="endDate"
                    type="date"
                    value={endDate}
                    onChange={(e) => dateFunction(e.target.value, "end")}
                    readOnly
                    />
                    </div>
        
                    <div className="admin-input">
                    <label>Start Time</label>
                         
                      <input
                        name="startTime"
                        type="time"
                        value={startTime}
                        onChange={(e) => timeFunction(e.target.value, 'start')}
                        readOnly
                      />
                    </div>
        
                    <div className="admin-input">
                      <label>End Time</label>
                      <input
                        name="endTime"
                        type="time"
                        value={endTime}
                        onChange={(e) => timeFunction(e.target.value, 'end')}
                        readOnly
                      />
                    </div>
        
                   {
                    !coursePriceActive && (
                      <div className="admin-input">
                          <label>Booking Type</label>
                          <select value={bookingType}  onChange={(e) => setBookingType(e.target.value)}>
                                <option value=""></option>
                                <option value="physical">Physical</option>
                                <option value="online">Online</option>
                          </select>
                      </div>
                    )
                   } 
        
                     <div className="admin-input">
                    <label>Repeat</label>
                    <input type="text" value={recurrence} readOnly/>
                    {/* <select
                    name="recurrence"
                    value={recurrence}
                    onChange={(e) => recurrenceFunction(e.target.value)}
                    
                    >
                    <option value="none">Do Not Repeat</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="biweekly">Biweekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                    </select> */}
                    </div>
        
                   
         {
                        <>
                        
        
        
                      {/* ==================================================================================== */}
        
                    {
                    (recurrence === "weekly" ||  recurrence === "biweekly") && (
                    <div className='weekDaysCon'>
                    <div className='weekTitle'>Select Recurrence Days:</div>
        
                    <div className="weekDays">
                    {weeks.map((day) => (
                    <label key={day} style={{ display: 'block', marginBottom: '8px' }}>
                    <input
                    type="checkbox"
                    checked={selectedDays.includes(day)}
                    onChange={() => toggleDay(day)}
                    />
                    {day}
                    </label>
                    ))}
                    </div>
                    <div style={{ marginTop: '16px' }}>
                    <strong>Selected Days:</strong> {selectedDays.join(', ') || 'None'}
                    </div>
                    </div>
                    )
                    }
        
                    {/* =================================================================================================== */}
                    
                    {
                    recurrence === "monthly" && (
                    <>
                    <div className="admin-input">
                    <label>Day of Month</label>
                    <select name="" onChange={(e) => monthlyFunction(e.target.value)}>
                    <option value=""></option>
                    <option value="day">{day} of every Month</option>
                    <option value="1">First {weekDay} of every Month</option>
                    <option value="2">Second {weekDay} of every Month</option>
                    <option value="3">Third {weekDay} of every Month</option>
                    <option value="4">Fourth {weekDay} of every Month</option>
                    <option value="5">Fifth {weekDay} of every Month</option>
                    </select>
                    </div>
                    </>        
                    )
                    }
        
                   {/* ========================================================== */}
        
                   <div className="radio-flex">
                        <p><span> {coursePriceActive ? "Turn off" : "Add" } Multi-Prices</span> </p>
                        <div className="radio-group">
                                <label className="toggle-switch">
                                <input
                                type="checkbox"
                                checked={coursePriceActive}
                                onChange={() => handlePriceToggle()}
                                />
                                <span className="slider"></span>
                                </label>
                            </div> 
                        </div>
        
                        {
                        coursePriceActive && (
                              <div className='prd-wrapper'>
                            <div className="admin-prd-form">
                                <div className="admin-flex-input flex-center gap-10">
                                  <div className="admin-input">
                                  <label>Currency</label>
                                      <select
                                      value={currency}
                                      onChange={(e) => setCurrency(e.target.value)}
                                      >
                                      {/* <option value="FREE">FREE</option> */}
                                      <option value=""></option>
                                      <option value="NGN">NGN</option>
                                      <option value="USD">USD</option>
                                      <option value="GHS">GHS</option>
                                      <option value="ZAR">ZAR</option>
                                      <option value="KES">KES</option>
                                      <option value="XOF">XOF</option>
                                      </select>
                                  </div>
                                </div>
                            </div>
                            
        
                            {coursePrices.map((coursePrice, index) => (
        
                                <div className="admin-prd-form" key={index}>
        
                                <div className="admin-flex-input flex-center gap-10">
                                  <div className="admin-input">
                                  <label>Title</label>
                                  <input
                                    type="text"
                                    placeholder="Enter Title"
                                    value={coursePrice.priceName ?? ""} 
                                    onChange={(e) =>
                                    handleCoursePriceChange(
                                        index,
                                        "priceName",
                                        e.target.value
                                    )}
                                  />
                                  </div>
        
        
                                </div>
        
                                <div className="admin-flex-input flex-center gap-10">
                                        <div className="admin-input">
                                        <label>Type</label>
                                        <input
                                          className='read-only'
                                          type="text"
                                          value="Physical"
                                          readOnly
                                        />
                                        </div>
                                         {
                                          index == 0 ? (
                                        <div className="admin-input">
                                          <label>Select Duration</label>
                                          <select value={physicalDuration} onChange={(e) => setPhysicalDuration(parseInt(e.target.value))}>
                                          <option value="">Select Duration</option>
                                          {Object.entries(durationMap).map(([label, value]) => (
                                          <option key={value} value={value}>
                                          {label}
                                          </option>
                                          ))}
                                          </select>
                                       </div>
                                          ) : (
                                            <div className="admin-input">
                                            <label>Select Duration</label>
                                            <input type="text" value={formatDuration(physicalDuration)} readOnly/>
                                            </div>
                                          )
                                         }
                                        
        
                                        <div className="admin-input">
                                        <label>Price</label>
                                        <input
                                          type="number"
                                            value={coursePrice.coursePricePhysical ?? 0} onChange={(e) =>
                                            handleCoursePriceChange(
                                            index,
                                            "coursePricePhysical",
                                            Number(e.target.value) as CoursePrice["coursePricePhysical"]
                                            )
                                            }
                                        />
                                        </div>
                                </div>
        
                                <div className="admin-flex-input flex-center gap-10">
                                        <div className="admin-input">
                                        <label>Type</label>
                                        <input
                                          className='read-only'
                                          type="text"
                                          value="Online"
                                          readOnly
                                        />
                                        </div>
                                         {
                                          index == 0 ? (
                                              <div className="admin-input">
                                                  <label>Select Duration</label>
                                                <select value={onlineDuration} onChange={(e) => setOnlineDuration(parseInt(e.target.value))}>
                                                <option value="">Select Duration</option>
                                                {Object.entries(durationMap).map(([label, value]) => (
                                                <option key={value} value={value}>
                                                {label}
                                                </option>
                                                ))}
                                                </select>
                                            </div>
                                          ) : (
                                              <div className="admin-input">
                                                  <label>Select Duration</label>
                                                  <input type="text"  value={formatDuration(onlineDuration)} readOnly/>
                                            </div>
                                          )
                                         }
                                         
        
                                        <div className="admin-input">
                                        <label>Price</label>
                                        <input
                                          type="number"
                                            value={coursePrice.coursePriceOnline ?? 0} onChange={(e) =>
                                            handleCoursePriceChange(
                                            index,
                                            "coursePriceOnline",
                                            Number(e.target.value) as CoursePrice["coursePriceOnline"]
                                            )
                                            }
                                        />
                                        </div>
                                </div>
        
                                
                                </div>
                            ))
                            }
                              
                              <div className="add-more-con flex align-center" onClick={addCoursePrice}>
                                    <div className="add-more-course" >
                                  add new price category
                              </div>
                              <div className="plus">
                                  <FiPlus />
                              </div>
                              </div>
                            </div>
                        )
                        }
                        </>
                    }
                    {
                      coursePriceActive == false && (
                        <div className="flex-center gap-10">
                        <div className="admin-input input-short">
                        <label>Currency</label>
                        <select
                        value={currency}
                        onChange={(e) => currencyFunction(e.target.value)}
                        >
                        <option value=""></option>
                        <option value="FREE">FREE</option>
                        <option value="NGN">NGN</option>
                        <option value="USD">USD</option>
                        <option value="GHS">GHS</option>
                        <option value="ZAR">ZAR</option>
                        <option value="KES">KES</option>
                        <option value="XOF">XOF</option>
                        </select>
                        </div>
                          
                          {
                            currency == "FREE" ? (
                              <></>
                            )  : (
                              <div className="admin-input course-input">
                                <label>price</label>
                                <input
                                  name="coursePrice"
                                  type="number"
                                  min="0"
                                  placeholder="Enter course price"
                                  value={price}
                                  onChange={(e) => setPrice(parseInt(e.target.value))}
                                />
                             </div>
                            )
                          }
                          
                    </div>
                      )
                    }
                    
        
                    <div className="admin-input-con">
        
                       <h2 className="admin-prod-titles">BOOKING SETTINGS</h2>
                         
                         {
                          !coursePriceActive && (
                            <div className="admin-input">
                                <Tooltip
                                label={tooltipConfig.bookingDuration.label}
                                tooltipText={tooltipConfig.bookingDuration.text}
                              />
                              <select value={interval} onChange={(e) => setInterval(parseInt(e.target.value))}>
                              <option value=""></option>
                              {Object.entries(durationMap).map(([label, value]) => (
                              <option key={value} value={value}>
                              {label}
                              </option>
                              ))}
                              </select>
                            </div>
                          )
                         }
                        
        
                        <div className="admin-input">
                            <Tooltip
                            label={tooltipConfig.bookingsPerDay.label}
                            tooltipText={tooltipConfig.bookingsPerDay.text}
                          />
                          {
                            coursePriceActive ? (
                              <div className="admin-flex-input flex-center gap-10">
                              <div className="admin-input">
                                <label>Physical</label>
                              <select value={physicalMaxTime} onChange={(e) => setPhysicalMaxTime(parseInt(e.target.value))}>
                                <option value=""></option>
                                    {[...Array(60)].map((_, i) => {
                                    const day = i + 1;
                                    return (
                                    <option key={day} value={day}>
                                    {day} 
                                    </option>
                                    );
                                    })}
                              </select>
                              </div>
        
                              <div className="admin-input">
                                <label>Online</label>
                              
                                <select value={onlineMaxTime} onChange={(e) => setOnlineMaxTime(parseInt(e.target.value))}>
                                    <option value=""></option>
                                    {[...Array(60)].map((_, i) => {
                                    const day = i + 1;
                                    return (
                                    <option key={day} value={day}>
                                    {day}
                                    </option>
                                    );
                                    })}
                                </select>
                              </div>
                          </div>
        
                            ) : (
                            
                          <select value={bookingPerDay}  onChange={(e) => setBookingPerDay(parseInt(e.target.value))}>
                                <option value=""></option>
                                {[...Array(60)].map((_, i) => {
                                const day = i + 1;
                                return (
                                <option key={day} value={day}>
                                {day}
                                </option>
                                );
                                })}
                        </select>
                            )
                          }
                         
                        </div>
        
                        <div className="admin-input">
                          <Tooltip
                          label={tooltipConfig.bufferTime.label}
                          tooltipText={tooltipConfig.bufferTime.text}
                        />
                           
                           {
                            coursePriceActive ? (
                                <div className="admin-flex-input flex-center gap-10">
                                  <div className="admin-input">
                                    <label>Physical</label>
                                    <select value={physicalBufferTime} onChange={(e) => setPhysicalBufferTime(e.target.value)}>
                                      <option value=""></option>
                                      {Object.entries(durationMap).map(([label, value]) => (
                                      <option key={value} value={value}>
                                      {label}
                                      </option>
                                      ))}
                                    </select>
                                  </div>
                                  
                                  <div className="admin-input">
                                    <label>Online</label>
                                  <select value={onlineBufferTime} onChange={(e) => setOnlineBufferTime(e.target.value)}>
                                      <option value=""></option>
                                      {Object.entries(durationMap).map(([label, value]) => (
                                      <option key={value} value={value}>
                                      {label}
                                      </option>
                                      ))}
                                    </select>
                                  </div>
                                </div>
        
                            ) : (
                                <select value={bufferTime} onChange={(e) => setBufferTime(e.target.value)}>
                                <option value=""></option>
                                {Object.entries(durationMap).map(([label, value]) => (
                                <option key={value} value={value}>
                                {label}
                                </option>
                                ))}
                                </select>
                            )
                          }
        
                          
                        </div>
        
                        <div className="admin-input">
                            <Tooltip
                             label={tooltipConfig.minimumBookingNotice.label} 
                             tooltipText={tooltipConfig.minimumBookingNotice.text} 
                            />
        
                          <select value={maxTimeBeforeBooking}
                          onChange={(e) => setMaxTimeBeforeBooking(parseInt(e.target.value))}>
        
        
                          {/* <option value=""></option>
                          {Object.entries(durationMap).map(([label, value]) => (
                          <option key={value} value={value}>
                          {label}
                          </option>
                          ))} */}
        
                          <option value=""></option>
                          {[...Array(60)].map((_, i) => {
                          const day = i + 1;
                          return (
                          <option key={day} value={day}>
                          {day} {day === 1 ? 'day' : 'days'}
                          </option>
                          );
                          })}
        
        
                          </select>
                        </div>
        
                        <div className="admin-input">
                           <Tooltip 
                              label={tooltipConfig.maximumBookingWindow.label} 
                              tooltipText={tooltipConfig.maximumBookingWindow.text} 
                            />
                          <select 
                          value={maxDayBeforeBooking}
                          onChange={(e) => setMaxDayBeforeBooking(parseInt(e.target.value))}
                          >
                          <option value=""></option>
                          {[...Array(120)].map((_, i) => {
                          const day = i + 1;
                          return (
                          <option key={day} value={day}>
                          {day} {day === 1 ? 'day' : 'days'}
                          </option>
                          );
                          })}
                          </select>
                        </div>
        
                    </div>
        
                    {/* ========================================================= */}
                    {
                      errorSlots.length > 0 && (
                            <div className="error-con">
                                <h4>Time slot overlaps with an existing booking.</h4>
                                <div className="error-details flex-center">
                                {errorSlots.map((item, index )=>(
                                <p key={index}>{item.date} <br/> {item.start_time} - {item.end_time}</p>
                                ))}
                                </div>
                          </div>
                      )
                    }
                     
        
                    {/* =============================== error end ================================= */}
        
                    {
                    loading ? (
                    <div className="admin-input">
                    <div className='inActive'><ButtonPreloader/></div>
                    </div>
                    ) : (
                       currency !== "FREE" ? (
                        <div className="admin-input">
                          <div className="btn" onClick={handleProduct}>Submit</div>
                        </div> 
                    ) : (
                      <div className="admin-input inActive">
                        <div className="btn inActive" onClick={confirmFree}>Submit</div>
                      </div> 
                    )
        
                    )}
        
                    </div>
                </div>
        
              <ConfirmFreeBooking
                  isOpen={showPopup}
                  loading={loading}
                  onCancel={() => setShowPopup(false)}
                  onDelete={handleProduct}
                />
    </div>
  )
}

export default EditSchedule