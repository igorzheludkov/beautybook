export default function GetFormattedTime(time) {
    let num = time
    const hours = num / 60
    const rhours = Math.floor(hours)
    const minutes = (hours - rhours) * 60
    const rminutes = Math.round(minutes)

    return rminutes > 0 ? { hour: rhours, minute: rminutes } : { hour: rhours, minute: 0 }
   } 
   
