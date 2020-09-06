
const getDaysAgo = (difference) => {
    // takes in difference between 2 dates in milliseconds and returns days ago
    const days = Math.floor(difference/(24*60*60*1000))
    const week = Math.floor(days/7)
    const months = Math.floor(days/30)
    const year = Math.floor(months/12)
    // console.log("Days = ", days + "days")
    if(year !== 0) {  

        return year + " years ago"
    }else if(months !== 0) {
        return months + " month ago"
    }else if(week !== 0) {
        return week + " month ago"
    }else if(days !== 0){ 
        return days + " month ago"
    }else if(days === 0){    
        return "Today"
    }
}
const getDate = (date) => {
    //  Takes in a string and returns a date in the format we want
    var month = ["January", "February", "March", "April", "May", "June", 
                            "July", "August", "September", "October", "November", "December"];
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    date = new Date(date)

    const Year = 1900 + date.getYear()
    const Month = month[date.getMonth()]
    const ddate = date.getDate()
    const day = days[date.getDay()]
    const FinalDate =  String(ddate) + " " +String(Month) + " " +String(Year) 
    const postedTime = date.getTime()
    const currentTime = new Date().getTime()
    const DaysAgo = getDaysAgo(currentTime-postedTime)
    // console.log("Days Ago = ", getDaysAgo(currentTime-postedTime))
    return [FinalDate, DaysAgo]
}


export {
    getDate, 
    getDaysAgo
}