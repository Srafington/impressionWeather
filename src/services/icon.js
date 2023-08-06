
class iconService{

  getFAIcon(iconCode) {
    switch(iconCode){
      case '02d': return 'fas fa-cloud';
      default: return 'fas fa-circle-question';
    }
  }
  
}

export default iconService;
