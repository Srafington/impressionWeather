
class dateService{

  static getDay(dt) {
    const day = new Date(dt);
    return day.toLocaleDateString('en-CA', {weekday: 'long'});
  }
  
}

export default dateService;
