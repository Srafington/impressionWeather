class adafruitIoService {

  static async getPM25Data() {
    const url = `https://io.adafruit.com/api/v2/sraf/feeds/enviro-sensors/data/chart?hours=120`;
    let processedData = JSON.parse(await sessionStorage.getItem('adafruit-pm25'));
    if (!processedData || processedData.dt + 900000 < Date.now()) {
      try {
        processedData = {
          dt: Date.now(),
          labels: [],
          data: []
        };
        const results = await fetch(url);
        const data = (await results.json());
        data.data.forEach(dataPoint => {
          const date = new Date(dataPoint[0]);
          processedData.labels.push(date.toLocaleDateString("en-CA", {weekday: "short"}));
          processedData.data.push(Number(dataPoint[1]));
        });
        sessionStorage.setItem('adafruit-pm25', JSON.stringify(processedData));
        return processedData;
      } catch (e) {
        console.log(e);
      }
    }
    return processedData;
  }

}

export default adafruitIoService;
