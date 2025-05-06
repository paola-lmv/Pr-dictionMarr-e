import CalculHauteur from './calculHauteur.js'
import DateEnMiliSecondes from './dateEnMiliSecondes.js'
import FormatDate from './formatDate.js'
import React, { useEffect,useState } from 'react';
import { DataSet, Graph2d } from 'vis-timeline/standalone';

function VisualiserQ3({date}){
  console.log("Q3")
  const [dateDebut, setDateDebut] = useState(date);
  const [dateFin, setDateFin] = useState("");
  const [givenDate, setGivenDate] = useState("");
  const [formattedDate, setFormattedDate] = useState("");
    console.log("dateDebut",dateDebut)
    console.log("dateFin",dateFin)
    useEffect(() => {
      console.log("useeffect")
      const container = document.getElementById('visualizationQ3');
      container.innerHTML = '';
      let dateDebutMiliSec = DateEnMiliSecondes(dateDebut);
      let dateFintMiliSec;
      if (dateFin === "") {
        console.log("pas de date de fin")
        dateFintMiliSec = dateDebutMiliSec + 24 * 3600*1000;
      } else {
        console.log("dateFint bien def ",dateFin)
        dateFintMiliSec = DateEnMiliSecondes(dateFin);
      }
      let intervalleMiliSec = 6*60*1000;
      let nbPoints =  (dateFintMiliSec-dateDebutMiliSec)/intervalleMiliSec;
      console.log("nbPoints",nbPoints)
      let items = [];
  
      for (let i = 0; i < nbPoints; i++) {
        let dateMiliSec = dateDebutMiliSec + i * intervalleMiliSec;
        let dateObj = new Date(dateMiliSec);
        let valeur = CalculHauteur(dateMiliSec);
        
        let dateStr = dateObj.toISOString().replace("T", " ").substring(0, 19);;
        items.push({ x: dateStr, y: valeur });
      }
  
      let dataset = new DataSet(items);
      let options = {
        start: items[0].x,
        end: items[items.length - 1].x,
      };
      console.log("Q3 heure de debut",items[0].x ,dateDebutMiliSec)
      console.log("Q3 heure de fin",items[items.length - 1].x, dateFintMiliSec)
      console.log("Q3 items",items)
      const graph = new Graph2d(container, dataset, options);
      graph.on('rangechange', onChange);
  }, [dateDebut,dateFin]);
  function onChange (rangechange) { 
// j'utilise ici rangechange et non rangechanged car avec ce dernier mon 
// graph se renouvelai tout le tps mm lorque l'utilisateur ne le bougeait 
// pas ce qui l'induisait un décalage à force et on avait l'impressoin que l
// e graph avancait 
    console.log('onChange');
    console.log("rangechanged.start",FormatDate(rangechange.start))
    console.log("rangechanged.end",FormatDate(rangechange.end))
    setDateDebut(FormatDate(rangechange.start))
    setDateFin(FormatDate(rangechange.end))
  }
  const handleDateChange = (e) => {
    setGivenDate(e.target.value);
  };
  const handleSubmit = () => {
    console.log("handleSubmit")
    const dateRegex = /^([0-2][0-9]|3[01])\/([0][1-9]|1[0-2])\/\d{4} (\d{2}):(\d{2}):(\d{2})$/;
    
    if (dateRegex.test(givenDate)) {
      setFormattedDate(`Date valide: ${givenDate}`);
      setDateDebut(givenDate)
      setDateFin("")
    } else {
      setFormattedDate("Date invalide, veuillez respecter le format jj/mm/aaaa hh:mm:ss.");
    }
  };
  return (
    <div>
      <div>
      <label htmlFor="dateInput">Entrez une date (jj/mm/aaaa hh:mm:ss):</label>
      <input
        type="text"
        id="dateInput"
        value={givenDate}
        onChange={handleDateChange}
        placeholder="Ex: 06/05/2025 14:30:00"
      />
      <button onClick={handleSubmit}>Soumettre</button>
      <p>{formattedDate}</p>
    </div>
      <div id="visualizationQ3" style={{ width: '1000px' }}></div>
    </div>
  )
}

export default VisualiserQ3