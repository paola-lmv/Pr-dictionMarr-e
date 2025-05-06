import CalculHauteur from './calculHauteur.js'
import DateEnMiliSecondes from './dateEnMiliSecondes.js'
import React, { useEffect,useRef } from 'react';
import { DataSet, Graph2d } from 'vis-timeline/standalone';

function VisualiserQ2({dateDebut}){

    useEffect(() => {
      let container = document.getElementById('visualizationQ2');
      container.innerHTML = '';
      let dateDebutMiliSec = DateEnMiliSecondes(dateDebut);
      let intervalleMiliSec = 6 * 60*1000;
      let nbPoints =  60*24 / 6;
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
      console.log("Q2 items",items)
      new Graph2d(container, dataset, options);
  }, [dateDebut]);

  return (
    <div>
      <div id="visualizationQ2" style={{ width: '1000px' }}></div>
    </div>
  )
}

export default VisualiserQ2